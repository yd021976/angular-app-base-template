import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of, Subject, Subscriber, throwError } from 'rxjs';
import { LoginServiceModel, LoginServiceResponseModel, LoginCredentialsModel } from 'src/app/models/login.model';
import { UserModel } from 'src/app/models/user.model';

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
   * 
   * @param credentials 
   */
  public login(credentials?: LoginCredentialsModel): Observable<LoginServiceModel> {
    if (!credentials) {
      const token = localStorage.getItem('token');
      if (!token) {
        return this.authInfos$; // Silently do nothing if no token in local storage
      } else {
        const headers: HttpHeaders = new HttpHeaders().append('Authorization', `Bearer ${token}`)
        return this.httpClient.get<LoginServiceResponseModel>(this.SERVER + this.LOGIN_JWT_URL, { headers: headers })
          .pipe(catchError(this.autoLoginErrorHandler.bind(this))) /** this will reset authInfos observable and NOT throws error */
          .pipe(map((response) => {
            /** a NULL response indicates an error occurs (token expired or no token stored or token is "revoked") */
            if (response !== null) return this.handleLoginResponse(response);
            return this.AUTHINFOS_INIT;
          }))
      }
    } else {
      return this.httpClient.post<LoginServiceResponseModel>(this.SERVER + this.LOGIN_URL, credentials)
        .pipe(catchError(this.httpErrorHandler.bind(this)))
        .pipe(map((response) => { 
          return this.handleLoginResponse(response);
        }))
    }
  }

  /**
   * Logout user
   */
  public logout() {
    const token = localStorage.getItem('token');

    /** if no token, assume user is logged out */
    if (!token) {
      this.handleLogoutResponse(null);
      return;
    }

    const httpheaders: HttpHeaders = new HttpHeaders().append('Authorization', `Bearer ${token}`)

    this.httpClient.post(
      this.SERVER + this.LOGOUT_URL,
      {}, /** no body params */
      {
        headers: httpheaders
      })
      .pipe(catchError(this.httpErrorHandler.bind(this))) /** if error occured, assume user is logged out */
      .subscribe((logout) => {
        this.handleLogoutResponse(logout)
      })
  }

  /**
   * Success login actions
   * 
   * @param loginResponse 
   */
  private handleLoginResponse(loginResponse: LoginServiceResponseModel) {
    /** push new user state */
    const newUserState = Object.assign<{}, LoginServiceModel>({}, {
      isError: false,
      errorMsg: '',
      isAuth: true,
      token: loginResponse.token,
      user: loginResponse.user
    })
    this.authInfos$.next(newUserState)

    /** store token in local storage */
    localStorage.setItem('token', newUserState.token);

    return newUserState;
  }

  /**
   * 
   * @param logoutResponse 
   */
  private handleLogoutResponse(logoutResponse: any) {
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
  }

  /**
   * 
   * @param error 
   * @returns 
   */
  protected httpErrorHandler(error: any) {
    /** push new user state */
    const newUserState = Object.assign<{}, LoginServiceModel>({}, {
      isError: true,
      errorMsg: this.buildErrorMsg(error),
      isAuth: false,
      token: '',
    })
    this.authInfos$.next(newUserState)

    /** store token in local storage */
    localStorage.removeItem('token');

    /** throw error */
    return throwError(() => {
      return "Something wrong happened...";
    });
  }

  /**
   * 
   * @param error 
   */
  protected autoLoginErrorHandler(error: any, caught: Observable<any>) {
    /** push new user state */
    const newUserState = Object.assign<{}, LoginServiceModel>({}, {
      isError: false,
      errorMsg: '',
      isAuth: false,
      token: '',
      user: undefined
    })
    this.authInfos$.next(newUserState)

    /** store token in local storage */
    localStorage.removeItem('token');

    /** throw error */
    return of(null);
  }
  /**
   * Format error message
   * 
   * @param error 
   * @returns 
   */
  private buildErrorMsg(error: any) {
    return error.error.error ? `${error.error.error} : ${error.error.message}` : `${error.error.message}`
  }

}
