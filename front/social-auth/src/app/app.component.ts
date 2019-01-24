import {Component, OnInit} from '@angular/core';
import {AuthService, GoogleLoginProvider, SocialUser} from 'angularx-social-login';
import {ApiService} from './service/api.service';
import {ActionCableServiceService} from './service/action-cable-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ChatRoom';
  user: SocialUser;
  constructor(private authService: AuthService,
              private apiService: ApiService,
              private actionCable: ActionCableServiceService) { }
  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
    });
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(
      userData => this.apiService.post('users/auth', {id_token: userData.idToken})
        .subscribe(data => { if (data['notice']) {
          this.user = null;
          alert('user has been logged');
        } else {
          this.user['user_id'] = data['user']['user_id'];
          this.actionCable.getUserSub().perform('login', data);
        }
        })
    ).catch(error => console.log(error));
  }

  signOut(): void {
    this.apiService.post('users/sign_out', {email: this.user.email})
      .subscribe(data => this.actionCable.getUserSub().perform('sign_out', data));
    this.authService.signOut();
  }
}
