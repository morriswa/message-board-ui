import { Component } from '@angular/core';
import {MessageBoardClientService} from "../../../service/message-board-client.service";
import {PostResponse} from "../../../interface/posts";
import {CurrentCommunityService} from "../current-community.service";

@Component({
  selector: 'app-community-feed',
  templateUrl: './community-feed.component.html',
  styleUrls: ['./community-feed.component.scss']
})
export class CommunityFeedComponent {

  posts?: PostResponse[];

  constructor(service: MessageBoardClientService,
              public currentCommunity: CurrentCommunityService) {
    service.getFeedForCommunity(this.currentCommunity.id)
      .subscribe({
      next: (res:any) =>{
        this.posts = res;
      }
    })
  }

  postVoteUpdated($event: number, i: number) {
    this.posts![i].vote = $event
  }

  votingEnabled(): boolean {
    return this.currentCommunity.isCommunityOwner||this.currentCommunity.isCommunityMember
  }
}
