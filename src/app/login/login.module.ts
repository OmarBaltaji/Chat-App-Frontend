import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { Routes } from '@angular/router';
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
    CommonModule
  ]
})
export class LoginModule { }
