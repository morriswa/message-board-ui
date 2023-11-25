import {Component} from '@angular/core';
import {MessageBoardClientService} from "../../../service/message-board-client.service";
import {ActivatedRoute} from "@angular/router";
import {switchMap} from "rxjs";
import {ValidatorFactory} from "../../../service/validator.factory";
import {Comment, PostCommentResponse} from "../../../interface/posts";

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss']
})
export class PostDetailsComponent {

  communityInfo?:any;
  membershipInfo?:any;
  post?:PostCommentResponse;
  comments:Comment[]=[];
  commentForm: any;

  constructor(active: ActivatedRoute,
              private client: MessageBoardClientService,
              validators: ValidatorFactory) {
    this.commentForm = validators.getPostDescriptionForm();

    const postId = active.snapshot.params['postId'];

    const communityLocator = active.pathFromRoot[1].snapshot.params['communityId'];

    client.getCommunityInfo(communityLocator)
      .pipe(
        switchMap((result: any) => {
          this.communityInfo = result;
          return client.getMembership(this.communityInfo.communityId)
        }),
        switchMap((result: any) => {
          this.membershipInfo = result;
          return client.getPostDetails(postId);
        })
      ).subscribe({
      next: res => {
        this.post = res;
        this.comments = res.comments;
      }
    });
  }

  refreshComments() {
    this.client.getComments(this.post!.postId)
      .subscribe({
        next: (value:Comment[]) => this.comments = value
      });
  }

  postVoteUpdated($event: number) {
    this.post!.vote = $event
  }

  votingEnabled(): boolean {
    return this.membershipInfo!.exists||this.membershipInfo!.userId===this.communityInfo!.ownerId
  }

  postComment() {
    this.client.leaveComment(this.post!.postId, this.commentForm.value)
      .subscribe({
      next: ()=>{
        this.commentForm.reset();
        this.refreshComments();
      }
    })
  }

  commentVoteUpdated($event: number, i: number) {
    this.comments[i].vote = $event;
  }
}
