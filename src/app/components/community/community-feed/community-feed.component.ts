import { Component } from '@angular/core';
import {MessageBoardClientService} from "../../../service/message-board-client.service";
import {ActivatedRoute} from "@angular/router";
import {Observable, retry, switchMap} from "rxjs";

@Component({
  selector: 'app-community-feed',
  templateUrl: './community-feed.component.html',
  styleUrls: ['./community-feed.component.scss']
})
export class CommunityFeedComponent {
  posts$:Observable<any>;

  loading = true;
  communityInfo:any;
  membershipInfo:any;
  constructor(activeRoute: ActivatedRoute, private service: MessageBoardClientService) {
    const communityLocator = activeRoute.pathFromRoot[1].snapshot.params['communityId']

    this.posts$ = this.service.getCommunityInfo(communityLocator)
    .pipe(
      switchMap((result:any)=> {
        this.communityInfo = result;
        return this.service.getFeedForCommunity(this.communityInfo.communityId);
      })
    );

    this.posts$
      .pipe(switchMap((res:any)=>this.service.getMembership(this.communityInfo.communityId)))
      .subscribe({
      next: (res:any) =>{
        this.membershipInfo = res;
        this.loading = false;
      }
    })
  }
}
