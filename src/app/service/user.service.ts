import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl: string = 'http://localhost:8000/api';

  constructor(private http: HttpClient) { }

  getMatchesList() {
    return this.http.get(this.apiUrl + '/matcheslist');
  }

  getAuthUserDetails() {
    return this.http.get(this.apiUrl + '/user');
  }
}
