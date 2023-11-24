import {Component, Input} from '@angular/core';
import {MessageBoardClientService} from "../../../service/message-board-client.service";
import {ActivatedRoute} from "@angular/router";
import {switchMap} from "rxjs";
import {ValidatorFactory} from "../../../service/validator.factory";

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss']
})
export class PostDetailsComponent {

  communityInfo?:any;
  membershipInfo?:any;
  post?:any;
  comments:any[]=[];
  commentForm: any;

  constructor(active: ActivatedRoute,
              client: MessageBoardClientService,
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
      next: (res: any) => {
        this.post = res.post;
        this.comments = res.comments;
        console.log(this.comments)
      }
    });
  }

  postVoteUpdated($event: number) {
    this.post.vote = $event
  }

  votingEnabled(): boolean {
    return this.membershipInfo!.exists||this.membershipInfo!.userId===this.communityInfo!.ownerId
  }

  postComment() {
    this.commentForm.reset();
  }

  commentVoteUpdated($event: number, i: number) {
    this.comments[i].vote = $event;
  }
}
