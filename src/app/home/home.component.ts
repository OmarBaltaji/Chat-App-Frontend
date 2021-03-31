import { Component, OnInit } from '@angular/core';
import Echo from 'laravel-echo';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  userDetails!: any;
  matches!: any; 

  constructor(private userService: UserService) { 
   
  }

  ngOnInit(): void {
    this.getMatchesList();
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

}
