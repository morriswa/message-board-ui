import { Component } from '@angular/core';
import {MessageBoardClientService} from "../../../service/message-board-client.service";
import {ActivatedRoute} from "@angular/router";
import {switchMap} from "rxjs";

@Component({
  selector: 'app-community-feed',
  templateUrl: './community-feed.component.html',
  styleUrls: ['./community-feed.component.scss']
})
export class CommunityFeedComponent {
  loading = true
  communityInfo?:any;
  membershipInfo?:any;
  posts?: any;

  constructor(activeRoute: ActivatedRoute, service: MessageBoardClientService) {
    const communityLocator = activeRoute.pathFromRoot[1].snapshot.params['communityId']

    service.getCommunityInfo(communityLocator)
      .pipe(
        switchMap((result:any)=> {
          this.communityInfo = result;
          return service.getFeedForCommunity(this.communityInfo.communityId);
        }),
        switchMap((result:any)=>{
          this.posts = result;
          return service.getMembership(this.communityInfo.communityId)
        })
      ).subscribe({
      next: (res:any) =>{
        this.membershipInfo = res;
        this.loading = false
      }
    })
  }

  postVoteUpdated($event: number, i: number) {
    this.posts[i].vote = $event
  }

  votingEnabled(): boolean {
    return this.membershipInfo!.exists||this.membershipInfo!.userId===this.communityInfo!.ownerId
  }
}
