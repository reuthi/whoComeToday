
 import { Injectable, Inject } from '@angular/core';
 import {Observable, Subject} from 'rxjs/Rx';

 import * as io from 'socket.io-client';


@Injectable()
export class KidDashService {

      private url = 'http://localhost:3003';
      
      public socket$: any;    
      public connected$:any;
      public reportedKidIds$: any;

        public sendkidReport$ = new Subject();


  constructor(@Inject('io') io) {
        
        this.socket$ = Observable.of(io(this.url))

        const connect$ = this.socket$
            .switchMap(socket => Observable.fromEvent(socket, 'connection'))
            .do((ev)=> console.log('CONNECTED'));

        const disconnect$ = this.socket$
            .switchMap(socket => Observable.fromEvent(socket, 'disconnect'))
            .do((ev)=> console.log('DISCONNECTED'));

        this.connected$ = Observable.merge (
            connect$.mapTo(true),
            disconnect$.mapTo(false)
            .do((ev)=> console.log(ev))
        );

        this.sendkidReport$.withLatestFrom(this.socket$, (kidId, socket: SocketIOClient.Socket)=>{
            return {kidId, socket};
        })
        .subscribe(({kidId, socket})=>{
        console.log('Emitting kidId: ', kidId);
        socket.emit('kid report', kidId);
        })

        this.reportedKidIds$ = this.socket$
            .switchMap(socket => Observable.fromEvent(socket, 'kid report'))

}
}
