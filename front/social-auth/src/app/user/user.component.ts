import { Component, OnInit } from '@angular/core';
import {ActionCableServiceService} from '../service/action-cable-service.service';
import {UsersService} from '../service/users.service';
import * as moment from 'moment';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  public users = [];
  public socketSubscription = this.actionCable.subscribeToUserSocket();
  constructor(private actionCable: ActionCableServiceService
              , private userService: UsersService) {}

  ngOnInit() {
    // subscribe to UserChannel
    this.socketSubscription.subscribe(data => {
      if (data.action === 'login') {
        const user =  data.user;
        user.sign_in_at = moment(user.sign_in_at).fromNow();
        this.users.push(user);
      } else {
        this.users = this.users.filter( user => user.email !== data.email);
      }
    });
    // get online users
    this.userService.getLoggedUsers().subscribe(res => {
      // get logged in users
      this.users = res.map( values => {
        const { user, sign_in_at} = values;
        const {name, email, image} = user;
        return {
          name,
          email,
          image,
          sign_in_at: moment(sign_in_at).fromNow()
        };
      });
    });
  }
}
