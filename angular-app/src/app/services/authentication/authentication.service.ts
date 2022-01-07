import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of, throwError } from 'rxjs';
import { AuthenticationServiceModel, AuthenticationServiceResponseModel, LoginCredentialsModel } from 'src/app/models/login.model';
import { AuthenticationRequest } from './authentication.request';
import { TAUTHENTICATION_CONFIG, TAUTHENTICATION_REQUEST } from './authentication.types';

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
  private loginRequests: AuthenticationRequest;

  /** Auth infos initial object state */
  private readonly AUTHINFOS_INIT: AuthenticationServiceModel = {
    errorMsg: '',
    isAuth: false,
    isError: false,
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
    this.loginRequests = new AuthenticationRequest(this.config, this.httpClient);
  }


  /**
   * Attempts to autologin with browser localstorage stored token
   */
  public autoLogin(): Observable<AuthenticationServiceModel> {
    const req = this.loginRequests.prepareAutologinRequest();

    return req.request.pipe(
      catchError(this.httpErrorHandler.bind(this, req)),
      map((response) => {
        return response !== null ? this.handleLoginSuccessResponse(response) : this.handleLogoutSuccessResponse();
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
        if (response) {
          return this.handleLoginSuccessResponse(response);
        } else {
          return this.handleLogoutSuccessResponse(); // If response was NULL, assume no login was done, so we logout
        }
      })
    );
  }


  /**
   * 
   */
  public signup(credentials: LoginCredentialsModel) {

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
        map((logout) => {
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
  private handleLogoutSuccessResponse() {
    /** push new user state */
    const newUserState = Object.assign<{}, AuthenticationServiceModel>({}, {
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
  protected httpErrorHandler(request: TAUTHENTICATION_REQUEST, error: any) {
    /** compute error states */
    const message = this.buildErrorMsg(error);
    const isErr = request.type === 'login' ? true : false; /** App UI errors only for 'login', all errors show up in browser console */
    const errMsg = request.type === 'login' ? message : ''; /** App UI errors only for 'login', all errors show up in browser console */

    /** push new user state */
    const newUserState = Object.assign<{}, AuthenticationServiceModel>({}, {
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
