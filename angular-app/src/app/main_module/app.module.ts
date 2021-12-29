import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LoginModule } from '../modules/login/login.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/main_app/app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ContentsComponent } from './components/contents/contents.component';

import { TabMenuModule } from 'primeng/tabmenu';
import { HomeComponent } from './components/home/home.component';

import {ActiveItemWorkaroundDirective} from '../directives/primeng-tabmenu-fix.directive';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ContentsComponent,
    HomeComponent,
    ActiveItemWorkaroundDirective,
  ],
  imports: [
    BrowserModule,
    TabMenuModule,
    AppRoutingModule,
    LoginModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
