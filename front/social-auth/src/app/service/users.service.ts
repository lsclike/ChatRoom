import { Injectable } from '@angular/core';
import {ApiService} from './api.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private api: ApiService) { }
  // get online users from backEnd
  getLoggedUsers(): Observable<any> {
    return this.api.get('users/logged_users');
  }
}
