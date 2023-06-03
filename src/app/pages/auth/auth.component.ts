import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { HttpService } from 'src/app/core/http.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit{
  loginForm!: FormGroup;
  registerForm!: FormGroup;

  constructor(private fb: FormBuilder,  public authService : AuthService, public httpService: HttpService, public httpCLient:HttpClient) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onLoginSubmit() {
    if (this.loginForm.valid) {
      const username = this.loginForm.value.username;
      const password = this.loginForm.value.password;
      console.log('Login form submitted:', username, password);
      // Add your login logic here
    }
  }

  onRegisterSubmit() {
    if (this.registerForm.valid) {
      const username = this.registerForm.value.username;
      const email = this.registerForm.value.email;
      const password = this.registerForm.value.password;
      // this.httpService.get('/freelancer').subscribe(i=>{
      //   console.log('data',i)
      // })
      // this.httpCLient.get('http://localhost:3000/api/freelancer').subscribe(i=>{
      //   console.log(i)
      // })
      // console.log('Register form submitted:', username, email, password);
      // Add your register logic here
    }
  }
}
