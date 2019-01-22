import {Injectable, OnInit} from '@angular/core';
import * as ActionCable from 'actioncable';
import { ReplaySubject } from 'rxjs';
import {environment} from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ActionCableServiceService {
  public userSub: ActionCable.Channel;
  public receivedUserData: ReplaySubject<any> = new ReplaySubject(1);
  constructor() {
    this.Init();
  }

  Init(): void {
    const cable = ActionCable.createConsumer(`ws:${environment.webSocketUrl}`);
    this.userSub = cable.subscriptions.create('UsersChannel', {
      connected: () => {
        console.log('connected to users channel');
      },
      disconnected: () => {
        console.log('disconnected from users channel');
      },
      received: (data) => {
        this.receivedUserData.next(data);
      }
    });
  }
  getUserSub(): ActionCable.Channel {
    return this.userSub;
  }

  subscribeToUserSocket(): ReplaySubject<any> {
    return this.receivedUserData;
  }
}
