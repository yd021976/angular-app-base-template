import { Component, OnInit } from '@angular/core';
import { LoginCredentialsModel } from 'src/app/models/login.model';
import { LoginController } from './login.controller';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public credentials: LoginCredentialsModel = { email: '', password: '' }
  constructor(public ctrl: LoginController) { }

  ngOnInit(): void {
  }
}
