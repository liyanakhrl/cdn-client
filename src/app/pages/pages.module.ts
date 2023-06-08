import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';
import { AccountComponent } from './account/account.component';
import { AuthComponent } from './auth/auth.component';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AuthService } from '../auth/auth.service';
import { HttpService } from '../core/http.service';
import { ErrorHandlerService } from '../core/error-handler.service';
import { SkillsetComponent } from './skillset/skillset.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    DashboardComponent,
    UserComponent,
    AccountComponent,
    AuthComponent,
    PagesComponent,
    SkillsetComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule
  ],
  providers:[AuthService,HttpService,ErrorHandlerService]
})
export class PagesModule { }
