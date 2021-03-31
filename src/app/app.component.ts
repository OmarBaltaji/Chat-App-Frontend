import { Component, OnInit } from '@angular/core';
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
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'chat-app-frontend';

  ngOnInit(): void {
    this.websockets();
  }

  websockets() {
    const echo = new Echo({
      broadcaster: 'pusher',
      cluster: 'eu',
      key: 'abec56c2e8501ee519a8',
      wsHost: window.location.hostname,
      wsPort: 6001,
      disableStats: true,
      enabledTransports: ['ws'],
    });
    
    echo.channel('chat').listen('MessageSent', (e:any) => {
      console.log(e);
    })
  }
}
