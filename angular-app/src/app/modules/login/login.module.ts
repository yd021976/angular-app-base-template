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
import { LoginController } from './controllers/login.controller';

// PrimeNG modules
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { LogoutComponent } from './components/logout/logout.component';
// End of imports


@NgModule({
  declarations: [
    LoginComponent,
    LoginPageComponent,
    LogoutComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forChild([
      {
        path: 'login',
        component: LoginPageComponent,
      }
    ]),
    FormsModule,
    PasswordModule,
    InputTextModule,
    ButtonModule,
    MessagesModule, MessageModule
  ],
  providers: [
    LoginController,
    LoginService
  ],
  exports: [RouterModule]
})
export class LoginModule { }
