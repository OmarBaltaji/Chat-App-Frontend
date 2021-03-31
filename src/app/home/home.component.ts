import { Component, OnInit } from '@angular/core';

import { AuthService } from '../service/auth.service';
import { UserService } from '../service/user.service';
import { CookieService } from 'ngx-cookie-service';
import { ChatService } from '../service/chat.service';

import { Router } from '@angular/router';
import { AnonymousSubject } from 'rxjs/internal/Subject';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  userDetails!: any;
  matches!: any; 
  peerClicked:boolean = false;
  peer!: any;
  messages!: any;

  constructor(
    private authService: AuthService, private cookieService: CookieService, 
    private router: Router, private userService: UserService, private chatService: ChatService) { 
   
  }

  ngOnInit(): void {
    this.getMatchesList();
    this.getUserDetails();
  }
  
  getMatchesList() {
    this.userService.getMatchesList().subscribe((res:any) => {
      this.matches = res;
      console.log(this.matches)
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

  selectPeer(peer:any) {
    this.peerClicked = true;
    this.peer = peer;

    this.chatService.getChatHistory(peer.id).subscribe((res:any) => {
      console.log(res);
      this.messages = res;
    });
  }

  messageSender(message:any) {
    if(message.sender_id == this.userDetails.id) {
      return 'sender-message'
    }
    return 'receiver-message'
  }
}
