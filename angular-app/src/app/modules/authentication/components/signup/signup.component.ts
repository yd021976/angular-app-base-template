import { Component, OnInit } from '@angular/core';
import { LoginCredentialsModel } from 'src/app/modules/authentication/models/authentication.model';
import { AuthenticationComponentController } from '../../controllers/authentication-component-controller.service';

@Component({
  selector: 'authentication-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  constructor(public ctrl: AuthenticationComponentController) { }

  ngOnInit(): void {
  }

  /**
   * 
   * @param credentials 
   */
  public submitForm(credentials: LoginCredentialsModel) {
    this.ctrl.signup(credentials);
  }
}
