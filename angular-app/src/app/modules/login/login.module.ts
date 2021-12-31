// Angular modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Module components
import { LoginComponent } from './components/login/login.component';

// Module providers
import { LoginService } from 'src/app/services/Login/login.service';
import { LoginController } from './components/login/login.controller';

// PrimeNG modules
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
// End of imports


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forChild([
      {
        component: LoginComponent,
        path: 'login'
      }
    ]),
    FormsModule,
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
