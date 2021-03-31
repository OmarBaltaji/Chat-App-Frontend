import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  apiUrl = "http://localhost:8000/api";

  constructor(private http: HttpClient) { }

  register(name:string, email:string, password:string, p_confirm:string, initial:string) {

    return this.http.post(this.apiUrl + '/register', {
      name: name,
      email: email,
      password: password,
      password_confirmation: p_confirm,
      initial: initial,
    });
  }
}
