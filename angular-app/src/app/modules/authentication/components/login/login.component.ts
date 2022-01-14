import { Component, OnInit } from '@angular/core';
import { credentialsModel } from 'src/app/modules/authentication/models/authentication.model';
import { AuthenticationComponentController } from '../../controllers/authentication-component-controller.service';

@Component({
  selector: 'authentication-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public credentials: credentialsModel = { email: '', password: '' }
  /**
   * 
   * @param ctrl 
   */
  constructor(public ctrl: AuthenticationComponentController) { }

  ngOnInit(): void {
  }

  /**
   * 
   * @param credentials 
   */
  public submitForm(credentials: credentialsModel) {
    this.ctrl.login(credentials);
  }
}
