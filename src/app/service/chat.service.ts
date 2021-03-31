import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  apiUrl = "http://localhost:8000/api";
  accessToken!:string;
  headers = new HttpHeaders();

  constructor(private http: HttpClient, private cookieService: CookieService) { 
    this.accessToken = cookieService.get('access_token');
    this.headers = this.headers.append('Authorization', `Bearer ${this.accessToken}`);
    this.headers = this.headers.append('Content-Type', 'application/json');
    this.headers = this.headers.append('Accept', 'application/json');
  }

  getChatHistory(id:number) {
    return this.http.get(this.apiUrl + `/message/${id}}`, { headers: this.headers });
  }

  sendMessage(id:number) {
    return this.http.post(this.apiUrl + `/message/${id}`, { headers: this.headers });
  }
}
