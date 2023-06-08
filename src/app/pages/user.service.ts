import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  notificationMessage: string = '';
  notificationDescription: string = '';
  notificationVariant: string = '';
  constructor() { }
 // to do. Call HttpService here instead of in the component

}
