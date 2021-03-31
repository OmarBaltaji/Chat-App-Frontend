import { Component, OnInit } from '@angular/core';
import Echo from 'laravel-echo';
import { SocketsService } from '../service/sockets.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  private echo!: Echo;
  private laravelEchoChannel!:any;

  constructor(private socketService: SocketsService) { 
   
  }

  ngOnInit(): void {
    this.socketService.listen();
  }

}
