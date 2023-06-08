import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NotificationComponent } from './notification/notification.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    NotificationComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    HeaderComponent,
    FooterComponent,
    NotificationComponent
  ]
})
export class SharedModule { }
