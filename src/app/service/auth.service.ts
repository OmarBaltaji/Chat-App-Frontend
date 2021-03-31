import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = "http://localhost:8000/api";
  accessToken!:string;
  headers = new HttpHeaders();

  constructor(private http: HttpClient, private cookieService: CookieService) { 
    this.accessToken = cookieService.get('access_token');
    this.headers = this.headers.append('Authorization', `Bearer ${this.accessToken}`);
    this.headers = this.headers.append('Content-Type', 'application/json');
    this.headers = this.headers.append('Accept', 'application/json');
  }

  login(email:string, password:string, remember_me:boolean) {
    return this.http.post(this.apiUrl + '/login', {
      email: email,
      password: password,
      remember_me: remember_me,
    });
  }

  logout() {
    return this.http.get(this.apiUrl + '/logout', { headers: this.headers });
  }
}
