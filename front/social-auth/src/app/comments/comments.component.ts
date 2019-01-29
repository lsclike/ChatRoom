import { Component, OnInit } from '@angular/core';
import {AuthService, SocialUser} from 'angularx-social-login';
import {CommentsService} from '../service/comments.service';
import { FormBuilder, FormGroup, Validators , ReactiveFormsModule} from '@angular/forms';
import {ActionCableServiceService} from '../service/action-cable-service.service';
import * as moment from 'moment';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  user: SocialUser;
  comments = [];
  messageForm: FormGroup;
  public commentSocket = this.actionCable.subscribeToCommentSocket();
  constructor(private authService: AuthService,
              private commentsService: CommentsService,
              private formbuilder: FormBuilder,
              private actionCable: ActionCableServiceService) {}
  ngOnInit() {
    // Message from and validation
    this.messageForm = this.formbuilder.group({
      message: ['', [Validators.required]]
    });
    // Verify current user
    this.authService.authState.subscribe((user) => {
      this.user = user;
    });
    // getting all comments from comments Service
    this.commentsService.getAllcomments()
      .subscribe(res => this.comments = res.map(
        values => {
          const {message, created_at, user} = values;
          return {
            message,
            created_at: moment(created_at).fromNow(),
            image: user.image,
            userName: user.name
          };
        }
      ));
    // getting new comments from CommentsChannel
    this.commentSocket.subscribe(data => {
      data.created_at = moment(data.created_at).fromNow();
      this.comments.push(data);
    });
  }
  // pass data to CommentsChannel
  submitMessage(): void {
    this.actionCable.getCommentSub().perform('send_message'
                                              , {email: this.user['email'],
                                                 message: this.messageForm.value });

  }

}
