import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Subject, throwError } from 'rxjs';
import { LoginServiceModel, LoginServiceResponseModel, LoginCredentialsModel } from 'src/app/models/login.model';
import { UserModel } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private readonly SERVER: string = "http://localhost:3000"
  private readonly LOGIN_URL: string = "/authentication/auth/login"
  private readonly LOGIN_JWT_URL: string = "/authentication/auth/validateJWT"
  private readonly LOGOUT_URL: string = "/authentication/logout"
  private readonly SIGNUP_URL: string = "/authentication/signup"

  private user: LoginServiceModel = {
    errorMsg: '',
    isAuth: false,
    isError: false,
    token: '',
  }
  public authInfos: BehaviorSubject<LoginServiceModel>


  /**
   * 
   * @param httpClient 
   */
  constructor(protected httpClient: HttpClient) {
    this.authInfos = new BehaviorSubject<LoginServiceModel>(this.user);
  }

  /**
   * 
   * @param credentials 
   */
  public login(credentials?: LoginCredentialsModel) {
    if (!credentials) {
      const token = localStorage.getItem('token');
      if (!token) {
        return; // Silently do nothing if no token in local storage
      } else {
        const headers: HttpHeaders = new HttpHeaders().append('Authorization', `Bearer ${token}`)
        this.httpClient.get<LoginServiceResponseModel>(this.SERVER + this.LOGIN_JWT_URL, { headers: headers })
          .pipe(catchError(this.httpErrorHandler.bind(this)))
          .subscribe((response) => {
            this.handleLoginResponse(response);
          })
      }
    } else {
      this.httpClient.post<LoginServiceResponseModel>(this.SERVER + this.LOGIN_URL, credentials)
        .pipe(catchError(this.httpErrorHandler.bind(this)))
        .subscribe((response) => {
          this.handleLoginResponse(response);
        });
    }
  }

  /**
   * 
   * @param error 
   * @returns 
   */
  protected httpErrorHandler(error: any) {
    this.handleLoginError(error);
    return throwError(() => {
      return "Something wrong happened...";
    });
  }

  /**
   * Logout user
   */
  public logout() {

  }

  /**
   * 
   * @param error 
   */
  private handleLoginError(error: any) {
    /** push new user state */
    const newUserState = Object.assign<{}, LoginServiceModel>({}, {
      isError: true,
      errorMsg: this.buildErrorMsg(error),
      isAuth: false,
      token: '',
    })
    this.authInfos.next(newUserState)

    /** store token in local storage */
    localStorage.removeItem('token');
  }
  private buildErrorMsg(error: any) {
    return error.error.error ? `${error.error.error} : ${error.error.message}` : `${error.error.message}`
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
    this.authInfos.next(newUserState)

    /** store token in local storage */
    localStorage.setItem('token', newUserState.token);
  }

}
