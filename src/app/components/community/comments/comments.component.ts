import {Component, Input, OnInit} from '@angular/core';
import {MessageBoardClientService} from "../../../service/message-board-client.service";
import {Comment} from "../../../interface/posts";
import {FormControl} from "@angular/forms";
import {ValidatorFactory} from "../../../service/validator.factory";
import { CurrentCommunityService } from '../current-community.service';
import { date } from 'src/app/Functions';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {

date=date;

  @Input() postId!: number;
  @Input() parentId?: number;

  commentForm:FormControl;

  protected comments?: Comment[];

  constructor(
      validators: ValidatorFactory,
      private client: MessageBoardClientService, 
      public currentCommunity: CurrentCommunityService) {
    this.commentForm = validators.getPostDescriptionForm();
  }

  ngOnInit(): void {
    if (!this.parentId) this.refreshComments();
    }

  refreshComments() {
    if (this.parentId)
    this.client.getComments(this.postId, this.parentId)
      .subscribe({
        next: (value:Comment[]) => this.comments = value
      });

    else
      this.client.getComments(this.postId)
        .subscribe({
          next: (value:Comment[]) => this.comments = value
        });
  }

  postComment() {
    if (this.parentId)

      this.client.leaveComment(this.postId, this.commentForm.value, this.parentId)
      .subscribe({
        next: ()=>{
          this.commentForm.reset();
          this.refreshComments();
        }
      });

    else

      this.client.leaveComment(this.postId, this.commentForm.value)
        .subscribe({
          next: ()=>{
            this.commentForm.reset();
            this.refreshComments();
          }
        });
  }

  commentVoteUpdated($event: number, i: number) {
    this.comments![i].vote = $event;
  }

  removeComment(commentId: number) {
    this.client.removeComment(commentId, this.postId)
    .subscribe({
      next: ()=>this.comments = this.comments?.filter((comment:any)=>commentId!==comment.commentId)
    }); 
  }

  reportComment(commentId: number) {
    this.client.reportComment(commentId)
    .subscribe();
  }
}
