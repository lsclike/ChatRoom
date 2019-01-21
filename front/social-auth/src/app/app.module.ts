import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SocialLoginModule, AuthServiceConfig, GoogleLoginProvider } from 'angularx-social-login';
import { getAuthServiceConfigs } from './socialLoginConfig';
import {  MatTableModule,
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatPaginatorModule,
  MatSortModule,
  MatProgressSpinnerModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './service/api.service';
import { UserComponent } from './user/user.component';
import { CommentsComponent } from './comments/comments.component';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    UserComponent,
    CommentsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocialLoginModule,
    MatTableModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    HttpClientModule,
  ],
  providers: [{
    provide: AuthServiceConfig,
    useFactory: getAuthServiceConfigs},
    ApiService
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
