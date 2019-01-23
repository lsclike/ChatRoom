import { Injectable } from '@angular/core';
import {ApiService} from './api.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private apiSerive: ApiService) { }

  getAllcomments(): Observable<any> {
    return this.apiSerive.get('comments/');
  }

  postMessage(body): Observable<any> {
    return this.apiSerive.post('users/write_message', body);
  }
}
