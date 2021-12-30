import { Component, OnInit } from '@angular/core';
import { LoginController } from './login.controller';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public ctrl: LoginController) { }

  ngOnInit(): void {
  }
}
