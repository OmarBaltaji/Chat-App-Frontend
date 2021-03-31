import { Injectable } from '@angular/core';
import { SocketsService } from './sockets.service';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  token!:any;

  constructor(private _sockets: SocketsService) { }

  fetchCurrentUserInfo() {
    // this._sockets.setUpWithToken(this.token);
  }
}
