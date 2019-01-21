import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public base = 'http://localhost:3001';

  constructor(private http: HttpClient) {}
  get(url) {
    return this.http.get(`${this.base}/${url}`);
  }
  post(url, body) {
    return this.http.post(`${this.base}/${url}`, body);
  }
}
