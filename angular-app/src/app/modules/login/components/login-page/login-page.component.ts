import { Component, OnInit } from '@angular/core';
import { LoginController } from '../../controllers/login.controller';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  constructor(public ctrl:LoginController) { }

  ngOnInit(): void {
  }

}
