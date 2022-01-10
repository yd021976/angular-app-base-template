import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthenticationComponentController } from '../../controllers/authentication-component-controller.service';

@Component({
  selector: 'authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit, OnDestroy {
  public isSignup: boolean = false;
  protected authSub: Subscription | null = null;

  /**
   * 
   * @param ctrl 
   */
  constructor(public ctrl: AuthenticationComponentController) { }

  /**
   * 
   */
  ngOnInit(): void {
    /**
     * After successfull signup, disable signup request mode
     */
    this.authSub = this.ctrl.authService.authInfos$.subscribe((auth) => {
      if (auth.isAuth && this.isSignup) {
        this.isSignup = false;
      }
    })
  }

  /**
   * 
   */
  ngOnDestroy(): void {
    if (this.authSub) this.authSub.unsubscribe();
  }

  /**
   * 
   */
  toggleSignup() {
    this.isSignup = !this.isSignup;
  }

}
