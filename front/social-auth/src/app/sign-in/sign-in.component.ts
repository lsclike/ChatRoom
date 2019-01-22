import { Component, OnInit } from '@angular/core';
import {AuthService, GoogleLoginProvider, SocialUser} from 'angularx-social-login';
import {ApiService} from '../service/api.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  user: SocialUser;
  constructor(private authService: AuthService, private apiService: ApiService) { }

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
    });
  }
  testApi(): void {
    this.apiService.get('auth/hello').subscribe(res => console.log(res));
  }
  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(
      userData => this.apiService.post('users/request', {id_token: userData.idToken}).subscribe()
    );
  }

  signOut(): void {
    this.authService.signOut();
  }


}
