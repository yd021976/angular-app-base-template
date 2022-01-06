import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of, throwError } from 'rxjs';
import { LoginServiceModel, LoginServiceResponseModel, LoginCredentialsModel } from 'src/app/models/login.model';

/** 
 * internal types
 */
type TLOGIN_REQUEST = Observable<LoginServiceResponseModel>
type TLOGIN_TYPE = 'autologin' | 'login' | 'logout';

type TREQUEST = {
  type: TLOGIN_TYPE,
  request: TLOGIN_REQUEST,
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private readonly SERVER: string = "http://localhost:3000"
  private readonly LOGIN_URL: string = "/authentication/auth/login"
  private readonly LOGIN_JWT_URL: string = "/authentication/auth/validateJWT"
  private readonly LOGOUT_URL: string = "/authentication/auth/logout"
  private readonly SIGNUP_URL: string = "/authentication/auth/signup"

  /** Auth infos initial object state */
  private readonly AUTHINFOS_INIT: LoginServiceModel = {
    errorMsg: '',
    isAuth: false,
    isError: false,
    token: '',
  }

  public authInfos$: BehaviorSubject<LoginServiceModel>

  /**
   * 
   * @param httpClient 
   */
  constructor(protected httpClient: HttpClient) {
    this.authInfos$ = new BehaviorSubject<LoginServiceModel>(this.AUTHINFOS_INIT);
  }

  /**
   * Perform login request
   * - If no credentials, will try to use a stored token.
   * - If none of credentials and token provided, silently reset authentication infos to default with no errors 
   * 
   * @param credentials User credentials
   * @returns New login state as `Observable`
   * @throws Error if request login type is `login`
   */
  public login(credentials?: LoginCredentialsModel): Observable<LoginServiceModel> {
    const req = this.prepareLoginRequest(credentials);

    return req.request.pipe(
      catchError(this.httpErrorHandler.bind(this, req)),
      map((response) => {
        if (response) {
          return this.handleLoginSuccessResponse(response);
        } else {
          return this.handleLogoutSuccessResponse(null); // If response was NULL, assume no login was done, so we logout
        }
      })
    );
  }


  /**
   * Perform logout request
   */
  public logout(): Observable<LoginServiceModel> {
    const req = this.prepareLogoutRequest()

    return req.request
      .pipe(
        catchError(
          this.httpErrorHandler.bind(this, req)), /** if error occured, assume user is logged out */
        map((logout) => {
          return this.handleLogoutSuccessResponse(logout)
        }))
  }

  /**
   * Construct request and parameters for login request. If no credentials provided, will use token stored in browser localstorage
   * 
   * @param credentials The user login/password to login
   * @returns An `observable` of type `LoginServiceResponseModel`
   * @throws An `Observable` of type `never`
   */
  private prepareLoginRequest(credentials?: LoginCredentialsModel): TREQUEST {
    const token = localStorage.getItem('token');
    const method: string = credentials ? 'POST' : 'GET';
    const url: string = credentials ? this.SERVER + this.LOGIN_URL : this.SERVER + this.LOGIN_JWT_URL;

    let headers = new HttpHeaders(), params: any = {}, logintype: TLOGIN_TYPE, errorResponseRequest = undefined;

    if (credentials) {
      params['body'] = credentials;
      logintype = 'login';
    } else {
      logintype = 'autologin';
      /** if no credentials provided and token is empty, generate an observable request that throws an error */
      if (!token) {
        errorResponseRequest = throwError(() => {
          return new Error('autologin failed');
        });
      } else {
        headers = headers.append('Authorization', `Bearer ${token}`);
        params['headers'] = headers;
      }
    }

    /** Return the observable httpclient request to execute */
    const req: TLOGIN_REQUEST = errorResponseRequest === undefined ? (this.httpClient.request<LoginServiceResponseModel>(method, url, { ...params }) as any) : errorResponseRequest;
    return {
      type: logintype,
      request: req as TLOGIN_REQUEST,
    }
  }

  /**
   * 
   * @returns 
   */
  private prepareLogoutRequest(): TREQUEST {
    let req: TLOGIN_REQUEST;
    const method = 'POST';
    const url = this.SERVER + this.LOGOUT_URL;

    const token = localStorage.getItem('token');
    const httpheaders: HttpHeaders = new HttpHeaders().append('Authorization', `Bearer ${token}`);

    /** if no token is available, just throw an Observable error */
    if (!token) {
      req = throwError(() => { });
    }
    else {
      req = this.httpClient.request<LoginServiceResponseModel>(method, url, { headers: httpheaders });
    }

    return <TREQUEST>{
      type: 'logout',
      request: req,
    };
  }


  /**
   * Compute and push `this.authInfos$`new state.
   * **NOTE:**
   * - In case `loginResponse`param is `null` (i.e. A silent error was handled) we simply set `this.authInfos` to defaults
   * 
   * @param loginResponse If sets to `null`, reset `this.authInfos$`to defaults value (i.e. Not logged in, no errors)
   */
  private handleLoginSuccessResponse(loginResponse: LoginServiceResponseModel) {
    /** push new user state */
    const newUserState = Object.assign<{}, LoginServiceModel>({}, {
      isError: false,
      errorMsg: '',
      isAuth: true,
      token: loginResponse.token,
      user: loginResponse.user,
    })
    this.authInfos$.next(newUserState)

    /** store token in local storage */
    localStorage.setItem('token', newUserState.token);

    return newUserState;
  }

  /**
   * Perform logout success actions
   * 
   * @param logoutResponse 
   */
  private handleLogoutSuccessResponse(logoutResponse: any) {
    /** push new user state */
    const newUserState = Object.assign<{}, LoginServiceModel>({}, {
      isError: false,
      errorMsg: '',
      isAuth: false,
      token: '',
      user: undefined
    })
    this.authInfos$.next(newUserState)

    /** remove token in local storage */
    localStorage.removeItem('token');

    return newUserState;
  }

  /**
   * Handle http login request error
   * 
   * @param error 
   * @returns 
   * @throws Error Observable in case of 'login' request type. Null Observable in other cases
   */
  protected httpErrorHandler(request: TREQUEST, error: any) {
    /** compute error states */
    const message = this.buildErrorMsg(error);
    const isErr = request.type === 'login' ? true : false; /** App UI errors only for 'login', all errors show up in browser console */
    const errMsg = request.type === 'login' ? message : ''; /** App UI errors only for 'login', all errors show up in browser console */

    /** push new user state */
    const newUserState = Object.assign<{}, LoginServiceModel>({}, {
      isError: isErr,
      errorMsg: errMsg,
      isAuth: false,
      token: '',
    })
    this.authInfos$.next(newUserState);

    /** store token in local storage */
    localStorage.removeItem('token');

    /** compute return of method */
    const throwFn = () => { return `Login error when attempts to ${request.type}\nError was ${message}`; }
    // const throwFn = () => { return `Login error`; }

    /** throw error only in login case, else return a null Observable */
    return request.type === 'login' ? throwError(throwFn) : of(null);
  }

  /**
   * Format error message
   * 
   * @param httpErrorResponse 
   * @returns 
   */
  private buildErrorMsg(httpErrorResponse: any) {
    if (httpErrorResponse instanceof Error) {
      return httpErrorResponse.message;
    } else {
      return `${httpErrorResponse.error.message}`
    }
  }

}
