import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from '../service/register.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  errors: boolean = false;
  submitted: boolean = false;
  feedback:string = '';

  constructor(
    fb: FormBuilder,
    private router: Router,
    private registerService: RegisterService,
  ) { 
    this.registerForm = fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', 
        [
        Validators.required, 
        Validators.minLength(6), 
        ],
      ],
      password_confirm: ['', Validators.required],
    });
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get name() {
    return this.registerForm.get('name');
  }

  get password_confirm() {
    return this.registerForm.get('password_confirm');
  }

  ngOnInit(): void {
  }

  register(): void {
    this.submitted = true;
    let name_split = this.registerForm.controls.name.value.split(' ');
    let initial = name_split[0][0] + ' ' + name_split[1][0]; // Get the user's name initials

    this.registerService.register(
      this.registerForm.controls.name.value, this.registerForm.controls.email.value, 
      this.registerForm.controls.password.value, this.registerForm.controls.password_confirm.value, initial
      ).subscribe((res:any) => {
      this.submitted = false;
      this.feedback = 'Account created successfully. You will be redirected to login';
      setInterval(() => {
        this.router.navigateByUrl('/login');
      }, 3000);
    }, (err: any) => {
      this.submitted = false;
      this.errors = true;
    });
  }

}
