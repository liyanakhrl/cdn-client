import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { BehaviorSubject, tap } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class AuthService {
  private token!: string;
  public isLoggedIn!: BehaviorSubject<any>;
  public username!: BehaviorSubject<string>;
  baseURL = environment.apiUrl;

  constructor(public http:HttpClient) {}
  isAuthenticated(): boolean {
    return !!this.token;
  }

  setToken(token: string): void {
    this.token = token;
  }

  hasToken() {
    return this.token !== null && this.token !== '';
  }

  getToken(): string {
    return this.token;
  }

  clearToken(): void {
    this.token = '';
  }

  login(username: string, password: string): Observable<any> {
    const credentials = { username, password };
    return this.http.post(`${this.baseURL}/auth/login`, credentials)
      .pipe(
        tap((response: any) => {
          // Save the JWT token in local storage or other storage mechanism
          // this.username.next(username);
          const token = response.access_token;
       //   this.isLoggedIn.next(true)
          localStorage.setItem('username', username);
          localStorage.setItem('token', token);
        })
      );
  }

  logout(): void {
    // Clear the token
    this.clearToken();
    // Clear the stored token from local storage
    localStorage.removeItem('token');
    localStorage.removeItem('username')
    // Update the logged-in status
//    this.isLoggedIn.next(null);
  }
}
