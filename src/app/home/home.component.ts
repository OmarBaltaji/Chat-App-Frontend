import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

import { AuthService } from '../service/auth.service';
import { UserService } from '../service/user.service';
import { CookieService } from 'ngx-cookie-service';
import { ChatService } from '../service/chat.service';

import { Router } from '@angular/router';

import Echo from 'laravel-echo';

declare var require: any
(window as any).global = window;

window.Pusher = require('pusher-js');

declare global {

  interface Window {
    Pusher: any;
  }
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  userDetails!: {id: number, name: string};
  matches!: any; 
  peerClicked:boolean = false;
  peer!: {id: number, name: string };
  messages!: any;
  messageToSend!: any;

  constructor(
    private authService: AuthService, private cookieService: CookieService, 
    private router: Router, private userService: UserService, private chatService: ChatService) { }

  ngOnInit(): void {
    this.getMatchesList();
    this.getUserDetails();
    this.listenToMessage();
    // console.log(this.messages);
  }
  
  getMatchesList() {
    this.userService.getMatchesList().subscribe((res:any) => {
      this.matches = res;
    });   
  }

  getUserDetails() {
    this.userService.getAuthUserDetails().subscribe((res:any) => {
      this.userDetails = res;
    });
  }

  logout(): void { // Logout user and revoke token
    this.authService.logout().subscribe((res) => {
      this.cookieService.delete('access_token', '/');
      this.router.navigateByUrl('/login');
    });
  }

  selectPeer(peer:{ id: number, name: string }) {
    this.peerClicked = true;
    this.peer = peer;

    this.chatService.getChatHistory(peer.id).subscribe((res:any) => { // Get chat history between users
      this.messages = res;
    });
  }

  messageByUser(message:any) { // See to whom the message belongs to
    if(message.sender_id == this.userDetails.id) {
      return 'sender-message'
    } else if(this.userDetails.id == message.receiver_id) {
      return 'receiver-message'
    } else {
      return
    }
  }

  listenToMessage() {
    const echo = new Echo({ // Configure Laravel Echo on the frontend
      broadcaster: 'pusher',
      cluster: 'eu',
      key: 'abec56c2e8501ee519a8',
      wsHost: window.location.hostname,
      wsPort: 6001,
      disableStats: true,
      enabledTransports: ['ws'],
    });
    
    echo.channel('chat').listen('MessageSent', (e:any) => {
      console.log(this.userDetails.id);
      console.log(this.peer.id);
      this.messages.push(
          {
            content: e.message,
            sender_id: this.userDetails.id,
            receiver_id: this.peer.id,
          }
        );
    })
  }

  onChangeMessage(event:any) {
    this.messageToSend = {
      content: event.target.value,
    }
  }

  sendMessage(id:number) {
    this.chatService.sendMessage(this.messageToSend, id).subscribe((res:any) => {
    })
  }
}
