import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SocialLoginModule, AuthServiceConfig, GoogleLoginProvider } from 'angularx-social-login';
import { getAuthServiceConfigs } from './socialLoginConfig';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
        MatTableModule,
        MatInputModule,
        MatCardModule,
        MatButtonModule,
        MatPaginatorModule,
        MatSortModule,
        MatToolbarModule,
        MatProgressSpinnerModule,
        MatFormFieldModule,
  } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './service/api.service';
import { UserComponent } from './user/user.component';
import { CommentsComponent } from './comments/comments.component';
import {ActionCableServiceService} from './service/action-cable-service.service';
import {UsersService} from './service/users.service';
import {CommentsService} from './service/comments.service';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    CommentsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocialLoginModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatPaginatorModule,
    MatSortModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    MatFormFieldModule,
    ReactiveFormsModule
  ],
  providers: [{
    provide: AuthServiceConfig,
    useFactory: getAuthServiceConfigs},
    ApiService,
    ActionCableServiceService,
    UsersService,
    CommentsService
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
