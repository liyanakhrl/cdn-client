import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';
import { AccountComponent } from './account/account.component';
import { AuthComponent } from './auth/auth.component';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';



@NgModule({
  declarations: [
    DashboardComponent,
    UserComponent,
    AccountComponent,
    AuthComponent,
    PagesComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule
  ]
})
export class PagesModule { }
