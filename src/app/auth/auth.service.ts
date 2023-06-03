import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
  private token!: string;

  constructor() {}

  isAuthenticated(): boolean {
    return !!this.token;
  }

  setToken(token: string): void {
    this.token = token;
  }

  getToken(): string {
    return this.token;
  }

  clearToken(): void {
    this.token = '';
  }
}
