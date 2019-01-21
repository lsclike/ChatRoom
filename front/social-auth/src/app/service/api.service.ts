import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public base = environment.apiUrl;

  constructor(private http: HttpClient) {}
  get(url) {
    return this.http.get(`${this.base}/${url}`);
  }
  post(url, body) {
    return this.http.post(`${this.base}/${url}`, body);
  }
}
