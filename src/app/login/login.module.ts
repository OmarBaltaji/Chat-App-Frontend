import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './login.component';

import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { GuestGuardService } from '../service/guest-guard.service';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    canActivate: [GuestGuardService], // Accessable only for guests
  }
];

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
  ]
})
export class LoginModule { }
