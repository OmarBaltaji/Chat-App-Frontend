import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl: string = 'http://localhost:8000/api';
  accessToken!:string;
  headers = new HttpHeaders();

  constructor(private http: HttpClient, private cookieService: CookieService) { 
    this.accessToken = cookieService.get('access_token');
    this.headers = this.headers.append('Authorization', `Bearer ${this.accessToken}`);
    this.headers = this.headers.append('Content-Type', 'application/json');
    this.headers = this.headers.append('Accept', 'application/json');
  }

  getMatchesList() {
    return this.http.get(this.apiUrl + '/matcheslist', { headers: this.headers });
  }

  getAuthUserDetails() {
    return this.http.get(this.apiUrl + '/user', { headers: this.headers });
  }
}
