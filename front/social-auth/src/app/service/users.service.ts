import { Injectable } from '@angular/core';
import {ApiService} from './api.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private api: ApiService) { }

  getLoggedUsers(): Observable<any> {
    return this.api.get('users/logged_users');
  }
}
