import {Component, Input, OnInit} from '@angular/core';
import {MessageBoardClientService} from "../../../service/message-board-client.service";
import {Comment} from "../../../interface/posts";
import {FormControl} from "@angular/forms";
import {ValidatorFactory} from "../../../service/validator.factory";

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  @Input() postId!: number;
  @Input() parentId?: number;
  @Input() votingEnabled!: boolean;


  commentForm:FormControl;

  protected comments?: Comment[];

  constructor(private client: MessageBoardClientService, validators: ValidatorFactory) {
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

  // votingEnabled(): boolean {
  //   return this.membershipInfo!.exists||this.membershipInfo!.userId===this.communityInfo!.ownerId
  // }

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
}
