import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public isError: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)

  constructor() {
  }

  public login() {
    // simply invert value
    this.isError.next(!this.isError.value)
  }
  public logout() {
    this.isError.next(false)
  }
}
