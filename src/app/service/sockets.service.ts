import { Injectable } from '@angular/core';
import Echo from 'laravel-echo';

@Injectable({
  providedIn: 'root'
})
export class SocketsService {
  echo!: Echo;

  constructor() { }

  setUpWithToken(token:any) {
    if(!token) {
      this.echo.disconnect();
      return
    }

    // this.listen();
  }

  listen() {

  }
}
