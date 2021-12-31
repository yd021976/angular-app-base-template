import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Subject, throwError } from 'rxjs';
import { UserLoginModel } from 'src/app/models/login.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private readonly SERVER: string = "http://localhost:3000"
  private readonly LOGIN_URL: string = "/authentication/auth/login"
  private readonly LOGOUT_URL: string = "/authentication/logout"

  public isError: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)

  constructor(protected httpCclient: HttpClient) {
  }

  public login(credentials: UserLoginModel) {
    this.httpCclient.post(this.SERVER + this.LOGIN_URL, credentials)
      .pipe(catchError(this.httpErrorHandler))
      .subscribe((response) => {
        this.isError.next(!this.isError.value)
      });

  }

  protected httpErrorHandler(error: any) {
    return throwError(() => {
      return "Something wrong happened...";
    });
  }

  public logout() {
    this.isError.next(false)
  }
}
