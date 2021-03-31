import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router'

// declare global {
//   interface Window { io: any; }
//   interface Window { Echo: any; }
// }

// declare var require: any

// window.io = require('socket.io-client');

// window.io = window.io || require('socket.io-client');
// window.Echo = window.Echo || {};

// window.Echo = new Echo({
//   broadcaster: 'socket.io',
//   host: window.location.hostname + ':6001'
// })

// window.Echo.channel('chat').listen('MessageSent', (data:any) => {
//     console.log('From laravel echo: ', data);
//   });

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
