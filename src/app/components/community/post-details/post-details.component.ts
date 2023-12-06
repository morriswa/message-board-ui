import {Component} from '@angular/core';
import {MessageBoardClientService} from "../../../service/message-board-client.service";
import {ActivatedRoute, Router} from "@angular/router";
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
              private router: Router,
              private client: MessageBoardClientService,
              public currentCommunity: CurrentCommunityService) {

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

  removePost(postId: number) {
    this.client.removePost(postId).subscribe({
      next: ()=>this.router.navigate(['/community',this.currentCommunity.locator])
    });
  }

  reportPost(postId: number) {
    this.client.reportPost(postId).subscribe({
      next: ()=>this.router.navigate(['/community',this.currentCommunity.locator])
    });
  }
}
