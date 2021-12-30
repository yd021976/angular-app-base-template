import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';

import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { LoginService } from 'src/app/services/Login/login.service';
import { LoginController } from './components/login/login.controller';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        component: LoginComponent,
        path: 'login'
      }
    ]),
    PasswordModule,
    InputTextModule,
    ButtonModule,
  ],
  providers: [
    LoginController,
    LoginService
  ]
})
export class LoginModule { }
