import { Component, OnInit } from '@angular/core';
import {ActionCableServiceService} from '../service/action-cable-service.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  public users = [];
  public socketSubscription = this.actionCable.subscribeToUserSocket();
  constructor(private actionCable: ActionCableServiceService) { }

  ngOnInit() {
    // connect to websockets
    this.socketSubscription.subscribe(data => {

    });
  }
}
