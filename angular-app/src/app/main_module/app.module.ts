/** Angular imports */
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/** Libraries imports */
import { map } from 'rxjs';

/** PrimeNG modules */
import { TabMenuModule } from 'primeng/tabmenu';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';

/** Feature modules */
import { AuthenticationModule } from '../modules/authentication/authentication.module';
import { UserModule } from '../modules/user/user.module';

/** Routing modules */
import { AppRoutingModule } from './app-routing.module';

/** Module components */
import { HomeComponent } from './components/home/home.component';
import { AppComponent } from './components/main_app/app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ContentsComponent } from './components/contents/contents.component';
import { UserMenuComponent } from './components/user-menu/user-menu.component';

/** module directives */
import { ActiveItemWorkaroundDirective } from '../directives/primeng-tabmenu-fix.directive';

/** Components controllers & services */
import { UserMenuControllerService } from './components/user-menu/user-menu-controller.service';
import { AuthenticationService } from '../modules/authentication/services/authentication/authentication.service';

/*********************************************************************************************************************************************************************************************************
 *                                                                        end of imports
 ********************************************************************************************************************************************************************************************************/

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ContentsComponent,
    HomeComponent,
    UserMenuComponent,
    ActiveItemWorkaroundDirective,
  ],
  imports: [
    /** Angular modules */
    BrowserModule,
    BrowserAnimationsModule,

    /** primeNG modules */
    TabMenuModule,
    MenuModule,
    ButtonModule,
    ToolbarModule,

    /** Feature modules */
    AuthenticationModule,
    UserModule,

    /** Main routing module */
    AppRoutingModule, /** SHOULD be the last one because of route order "child routes" should never be matched (@see https://angular.io/guide/router#route-order) */
  ],
  providers: [
    /** module services */
    AuthenticationService,

    /** components controllers */
    {
      provide: UserMenuControllerService,
      useClass: UserMenuControllerService,
      multi: false,
      deps: [AuthenticationService]
    },


    /**
     *              APP INITIALIZERS
    */
    /** Try to auto login aginst stored token at app startup */
    {
      provide: APP_INITIALIZER,
      useFactory: initLogin,
      multi: true,
      deps: [AuthenticationService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

function initLogin(loginService: AuthenticationService) {
  return () => {
    return loginService.autoLogin()
      .pipe(
        map((auth) => {
          return auth
        }),
      );
  }
}
