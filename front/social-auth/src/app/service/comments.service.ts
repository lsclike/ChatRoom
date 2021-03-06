import { Injectable } from '@angular/core';
import {ApiService} from './api.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private apiSerive: ApiService) { }
  // get all existing comments from back end
  getAllcomments(): Observable<any> {
    return this.apiSerive.get('comments/');
  }
}
