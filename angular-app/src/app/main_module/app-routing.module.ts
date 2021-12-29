import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../modules/login/components/login/login.component';
import { AboutComponent } from './components/about/about.component';

const routes: Routes = [
  {
    component:AboutComponent,
    path:'Home'
  },
  {
    component:LoginComponent,
    path:'Login'
  },
  {
    component:AboutComponent,
    path:'infos'
  },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
