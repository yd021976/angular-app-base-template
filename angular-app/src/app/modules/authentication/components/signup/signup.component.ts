import { Component, OnInit } from '@angular/core';
import { LoginCredentialsModel } from 'src/app/modules/authentication/models/authentication.model';
import { AuthenticationController } from '../../controllers/authentication.controller';

@Component({
  selector: 'authentication-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  public credentials: LoginCredentialsModel = { email: '', password: '' }
  constructor(public ctrl: AuthenticationController) { }

  ngOnInit(): void {
  }

}
