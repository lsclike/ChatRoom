import {Injectable, OnInit} from '@angular/core';
import * as ActionCable from 'actioncable';
import { ReplaySubject } from 'rxjs';
import {environment} from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ActionCableServiceService {
  public userSub: ActionCable.Channel;
  public commentSub: ActionCable.Channel;
  public receivedUserData: ReplaySubject<any> = new ReplaySubject(2);
  public receivedCommentData: ReplaySubject<any> = new ReplaySubject(2);
  constructor() {
    this.Init();
  }

  Init(): void {
    // getting cable connection with back end server
    const cable = ActionCable.createConsumer(`ws:${environment.webSocketUrl}`);
    // Subscribing UsersChannel
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
    // Subscribing CommentsChannel
    this.commentSub = cable.subscriptions.create('CommentsChannel', {
      connected: () => {
        console.log('connected to comments channel');
      },
      disconnected: () => {
        console.log('disconnected from comments channel');
      },
      received: (data) => {
        this.receivedCommentData.next(data);
      }}) ;
  }
  getUserSub(): ActionCable.Channel {
    return this.userSub;
  }
  subscribeToUserSocket(): ReplaySubject<any> {
    return this.receivedUserData;
  }
  getCommentSub(): ActionCable.Channel {
    return this.commentSub;
  }
  subscribeToCommentSocket(): ReplaySubject<any> {
    return this.receivedCommentData;
  }
}
