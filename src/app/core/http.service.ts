import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorHandlerService } from './error-handler.service';
import { environment } from 'environments/environment';

@Injectable()
export class HttpService {
  constructor(private http: HttpClient, private errorHandler: ErrorHandlerService) {}
  baseURL = environment.apiUrl;
  get(url: string): Observable<any> {
    return this.http
      .get(`${this.baseURL}${url}`)
      .pipe(catchError((error: HttpErrorResponse) => this.errorHandler.handleError(error)));
  }

  post(url: string, data: any): Observable<any> {
    return this.http
      .post(`${this.baseURL}${url}`, data)
      .pipe(catchError((error: HttpErrorResponse) => this.errorHandler.handleError(error)));
  }

  put(url: string, data :any): Observable<any> {
    return this.http
      .put(`${this.baseURL}${url}`,data)
      .pipe(catchError((error: HttpErrorResponse) => this.errorHandler.handleError(error)));
  }

  delete(url: string, data :any): Observable<any> {
    return this.http
      .delete(`${this.baseURL}${url}/${data}`)
      .pipe(catchError((error: HttpErrorResponse) => this.errorHandler.handleError(error)));
  }

  // Add other HTTP methods as per your requirements
}
