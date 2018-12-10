import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  messages: Subject<any>

  constructor(private wsService: WebsocketService) {
    /* this.messages = <Subject<any>>wsService
      .connect().map((response: any): any => {
        return response;
      }) */
   }
  
  // Our simplified interface for sending
  // messages back to our socket.io server
  sendMsg(msg) {
    this.messages.next(msg);
  }


}
