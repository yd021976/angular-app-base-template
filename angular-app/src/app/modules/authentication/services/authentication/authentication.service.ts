import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of, throwError } from 'rxjs';
import { AuthenticationErrorModel, AuthenticationServiceModel, AuthenticationServiceResponseModel, LoginCredentialsModel } from 'src/app/modules/authentication/models/authentication.model';
import { AuthenticationRequestUtils } from './authentication-request.utils';
import { TAUTHENTICATION_CONFIG, TAUTHENTICATION_REQUEST } from '../../models/authentication.types';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private readonly SERVER: string = "http://localhost:3000"
  private readonly LOGIN_URL: string = "/authentication/auth/login"
  private readonly LOGIN_JWT_URL: string = "/authentication/auth/validateJWT"
  private readonly LOGOUT_URL: string = "/authentication/auth/logout"
  private readonly SIGNUP_URL: string = "/authentication/auth/signup"

  private config: TAUTHENTICATION_CONFIG;
  private loginRequests: AuthenticationRequestUtils;

  /** Auth infos initial object state */
  private readonly AUTHINFOS_INIT: AuthenticationServiceModel = {
    error: {
      message: '',
      isError: false,
    },
    isAuth: false,
    token: '',
  }

  public authInfos$: BehaviorSubject<AuthenticationServiceModel>

  /**
   * 
   * @param httpClient 
   */
  constructor(protected httpClient: HttpClient) {
    this.authInfos$ = new BehaviorSubject<AuthenticationServiceModel>(this.AUTHINFOS_INIT);
    this.config = {
      server: this.SERVER,
      auto_login_url: this.LOGIN_JWT_URL,
      login_url: this.LOGIN_URL,
      logout_url: this.LOGOUT_URL,
      signup_url: this.SIGNUP_URL
    }
    this.loginRequests = new AuthenticationRequestUtils(this.config, this.httpClient);
  }


  /**
   * Attempts to autologin with browser localstorage stored token
   */
  public autoLogin(): Observable<AuthenticationServiceModel> {
    const req = this.loginRequests.prepareAutologinRequest();

    return req.request.pipe(
      catchError(this.httpErrorHandler.bind(this, req)),
      map((response) => {
        return this.handleLoginSuccessResponse(response);
      }));
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
  public login(credentials: LoginCredentialsModel): Observable<AuthenticationServiceModel> {
    const req = this.loginRequests.prepareLoginRequest(credentials);

    return req.request.pipe(
      catchError(this.httpErrorHandler.bind(this, req)),
      map((response) => {
        return this.handleLoginSuccessResponse(response);
      })
    );
  }


  /**
   * 
   */
  public signup(credentials: LoginCredentialsModel): Observable<AuthenticationServiceModel> {
    const req = this.loginRequests.prepareSignupRequest(credentials);
    return req.request.pipe(
      catchError(this.httpErrorHandler.bind(this, req)),
      map((response) => {
        return this.handleLoginSuccessResponse(response);
      })
    )
  }

  /**
   * Perform logout request
   * 
   * @returns 
   */
  public logout(): Observable<AuthenticationServiceModel> {
    const req = this.loginRequests.prepareLogoutRequest()

    return req.request
      .pipe(
        catchError(
          this.httpErrorHandler.bind(this, req)), /** if error occured, assume user is logged out */
        map(() => {
          return this.handleLogoutSuccessResponse();
        }))
  }

  /**
   * Compute and push `this.authInfos$`new state.
   * **NOTE:**
   * - In case `loginResponse`param is `null` (i.e. A silent error was handled) we simply set `this.authInfos` to defaults
   * 
   * @param loginResponse If sets to `null`, reset `this.authInfos$`to defaults value (i.e. Not logged in, no errors)
   */
  private handleLoginSuccessResponse(loginResponse: AuthenticationServiceResponseModel) {
    /** push new user state */
    const newUserState = Object.assign<{}, AuthenticationServiceModel>({}, {
      error: {
        isError: false,
        message: '',
        source: undefined,
      },
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
  private handleLogoutSuccessResponse() {
    /** push new user state */
    const newUserState = Object.assign<{}, AuthenticationServiceModel>({}, {
      error: {
        source: undefined,
        isError: false,
        message: '',
      },
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
  protected httpErrorHandler(request: TAUTHENTICATION_REQUEST, error: any) {
    /** compute error states */
    const message = this.buildErrorMsg(error);
    const isErr = request.type === 'login' ? true : false; /** App UI errors only for 'login', all errors show up in browser console */
    const errMsg = request.type === 'login' ? message : ''; /** App UI errors only for 'login', all errors show up in browser console */

    /** push new user state */
    const newUserState = Object.assign<{}, AuthenticationServiceModel>({}, {
      error: {
        source: error,
        isError: isErr,
        message: errMsg,
      },
      isAuth: false,
      token: '',
    })
    this.authInfos$.next(newUserState);

    /** store token in local storage */
    localStorage.removeItem('token');

    /** compute return of method */
    const throwFn = () => { return `Login error when attempts to ${request.type}\nError was ${message}`; }

    /** throw error only in login case, else return a null Observable */
    return request.type === 'login' ? throwError(throwFn) : of();
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

  private getError(err: any, request: TAUTHENTICATION_REQUEST): AuthenticationErrorModel {
    const message = this.buildErrorMsg(err);
    const isErr = (request.type === 'login' || request.type === 'signup') ? true : false;
    const errMsg = (request.type === 'login' || request.type === 'signup') ? message : ''; /** App UI errors only for 'login', all errors show up in browser console */

    return {
      isError: isErr,
      message: errMsg,
      source: err
    }
  }
}
