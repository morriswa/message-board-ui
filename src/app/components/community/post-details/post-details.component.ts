import {Component} from '@angular/core';
import {MessageBoardClientService} from "../../../service/message-board-client.service";
import {ActivatedRoute} from "@angular/router";
import {PostCommentResponse} from "../../../interface/posts";
import {CurrentCommunityService} from "../current-community.service";

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss']
})
export class PostDetailsComponent {

  post?:PostCommentResponse;

  constructor(active: ActivatedRoute,
              client: MessageBoardClientService,
              private currentCommunity: CurrentCommunityService) {

    const postId = active.snapshot.params['postId'];

    client.getPostDetails(postId)
      .subscribe({
      next: res => {
        this.post = res;
      }
    });
  }

  postVoteUpdated($event: number) {
    this.post!.vote = $event
  }

  votingEnabled(): boolean {
    return this.currentCommunity.isCommunityOwner||this.currentCommunity.isCommunityMember;
  }

}
