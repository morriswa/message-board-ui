import { Component } from '@angular/core';
import {MessageBoardClientService} from "../../../service/message-board-client.service";
import {ActivatedRoute} from "@angular/router";
import {switchMap} from "rxjs";
import {CommunityMembership, CommunityResponse} from "../../../interface/community";
import {PostResponse} from "../../../interface/posts";

@Component({
  selector: 'app-community-feed',
  templateUrl: './community-feed.component.html',
  styleUrls: ['./community-feed.component.scss']
})
export class CommunityFeedComponent {
  communityInfo?:CommunityResponse;
  membershipInfo?:CommunityMembership;
  posts?: PostResponse[];

  constructor(activeRoute: ActivatedRoute, service: MessageBoardClientService) {
    const communityLocator = activeRoute.pathFromRoot[1].snapshot.params['communityId']

    service.getCommunityInfo(communityLocator)
      .pipe(
        switchMap(result=> {
          this.communityInfo = result;
          return service.getFeedForCommunity(this.communityInfo.communityId);
        }),
        switchMap(result=>{
          this.posts = result;
          return service.getMembership(this.communityInfo!.communityId)
        })
      ).subscribe({
      next: (res:any) =>{
        this.membershipInfo = res;
      }
    })
  }

  postVoteUpdated($event: number, i: number) {
    this.posts![i].vote = $event
  }

  votingEnabled(): boolean {
    return this.membershipInfo!.exists||this.membershipInfo!.userId===this.communityInfo!.ownerId
  }
}
