import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  errors: boolean = false;
  submitted: boolean = false;

  constructor(
    fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private cookieService: CookieService,
  ) { 
    this.loginForm = fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', 
      [
        Validators.required, 
        Validators.minLength(6), 
      ]
    ],
    remember: [false],
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  get remember() {
    return this.loginForm.get('remember');
  }

  ngOnInit(): void {
  }

  login(): void {
    console.log(this.loginForm.controls.remember.value);
    this.submitted = true;

    this.authService.login(
      this.loginForm.controls.email.value, 
      this.loginForm.controls.password.value, 
      this.loginForm.controls.remember.value
      ).subscribe((res:any) => {
        this.submitted = false;
        let expiry = new Date(res.expires_at);
        this.cookieService.set('access_token', res.access_token, {path: '/', sameSite:'Lax', expires: expiry});
        this.router.navigateByUrl('/');
        window.location.reload();
      }, (err: Error) => {
        this.submitted = false;
        this.errors = true;
      });
  }

}
