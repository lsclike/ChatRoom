import {Component, OnInit} from '@angular/core';
import {AuthService, GoogleLoginProvider, SocialUser} from 'angularx-social-login';
import {ApiService} from './service/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'ChatRoom';
  user: SocialUser;
  constructor(private authService: AuthService, private apiService: ApiService) { }
  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
    });
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(
      userData => this.apiService.post('auth/request', {id_token: userData.idToken}).subscribe()
    );
  }

  signOut(): void {
    this.authService.signOut();
  }
}
