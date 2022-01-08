import { Component, OnInit } from '@angular/core';
import { LoginCredentialsModel } from 'src/app/modules/authentication/models/authentication.model';
import { AuthenticationController } from '../../controllers/authentication.controller';

@Component({
  selector: 'authentication-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public credentials: LoginCredentialsModel = { email: '', password: '' }
  constructor(public ctrl: AuthenticationController) { }

  ngOnInit(): void {
  }
}
