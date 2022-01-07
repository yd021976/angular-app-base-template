// Angular modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Module components
import { LoginComponent } from './components/login/login.component';

// Module providers
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { AuthenticationController } from './controllers/authentication.controller';

// PrimeNG modules
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { LogoutComponent } from './components/logout/logout.component';
import { SignupComponent } from './components/signup/signup.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
// End of imports


@NgModule({
  declarations: [
    LoginComponent,
    AuthenticationComponent,
    LogoutComponent,
    SignupComponent,
    UserProfileComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forChild([
      {
        path: 'authentication',
        component: AuthenticationComponent,
      }
    ]),
    FormsModule,
    PasswordModule,
    InputTextModule,
    ButtonModule,
    MessagesModule, MessageModule
  ],
  providers: [
    AuthenticationController,
    AuthenticationService
  ],
  exports: [RouterModule]
})
export class AuthenticationModule { }
