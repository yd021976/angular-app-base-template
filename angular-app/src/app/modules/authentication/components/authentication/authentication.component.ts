import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthenticationComponentController } from '../../controllers/authentication-component-controller.service';

@Component({
  selector: 'authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss'],
  encapsulation: ViewEncapsulation.None
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
    // Clear current errors
    this.ctrl.clearErrors();

    // toggle signup/login form display
    this.isSignup = !this.isSignup;
  }

}
