import { Component, OnInit } from '@angular/core';
import {AuthService, SocialUser} from 'angularx-social-login';
import {ApiService} from '../service/api.service';
import {CommentsService} from '../service/comments.service';
import { FormBuilder, FormGroup, Validators , ReactiveFormsModule} from '@angular/forms';
import {ActionCableServiceService} from '../service/action-cable-service.service';

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
    this.messageForm = this.formbuilder.group({
      message: ['', [Validators.required]]
    });
    this.authService.authState.subscribe((user) => {
      this.user = user;
    });
    this.commentsService.getAllcomments()
      .subscribe(res => this.comments = res.map(
        values => { const{message, created_at, user_id} = values;
                    return { message, created_at, user_id}; }

      ));
    this.commentSocket.subscribe(data => this.comments.push(data));
  }
  submitMessage(): void {
    this.commentsService.postMessage({email: this.user.email, message: this.messageForm.value})
      .subscribe( data =>
        this.actionCable.getCommentSub()
        .perform('send_message', {message: data.message}));
  }

}
