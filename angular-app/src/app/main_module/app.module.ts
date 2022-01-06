/** Angular imports */
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/** Feature modules */
import { LoginModule } from '../modules/login/login.module';

/** Routing modules */
import { AppRoutingModule } from './app-routing.module';


/** PrimeNG modules */
import { TabMenuModule } from 'primeng/tabmenu';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';

/** module components */
import { HomeComponent } from './components/home/home.component';
import { AppComponent } from './components/main_app/app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ContentsComponent } from './components/contents/contents.component';
import { UserMenuComponent } from './components/user-menu/user-menu.component';

/** module directives */
import { ActiveItemWorkaroundDirective } from '../directives/primeng-tabmenu-fix.directive';

/** components controllers */
import { UserMenuController } from './components/user-menu/user-menu.controller';
import { LoginService } from '../services/Login/login.service';
import { map, Observable, tap } from 'rxjs';
// end of imports


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
    LoginModule,
    /** Routing modules */
    AppRoutingModule, /** SHOULD be the last one because of route order "child routes" should never be matched (@see https://angular.io/guide/router#route-order) */
  ],
  providers: [
    /** module services */
    LoginService,

    /** components controllers */
    {
      provide: UserMenuController,
      useClass: UserMenuController,
      multi: false,
      deps: [LoginService]
    },


    /**
     *              APP INITIALIZERS
    */
    /** Try to auto login aginst stored token at app startup */
    {
      provide: APP_INITIALIZER,
      useFactory: initLogin,
      multi: true,
      deps: [LoginService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

function initLogin(loginService: LoginService) {
  return () => {
    return loginService.login()
      .pipe(
        map((auth) => {
          return auth
        }),
      );
  }
}
