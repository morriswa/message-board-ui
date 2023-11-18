import { Component } from '@angular/core';
import {MessageBoardClientService} from "../../../service/message-board-client.service";
import {ActivatedRoute} from "@angular/router";
import {Observable, switchMap} from "rxjs";

@Component({
  selector: 'app-community-feed',
  templateUrl: './community-feed.component.html',
  styleUrls: ['./community-feed.component.scss']
})
export class CommunityFeedComponent {
  posts$:Observable<any>;

  loading = true;
  constructor(activeRoute: ActivatedRoute, private service: MessageBoardClientService) {
    const communityLocator = activeRoute.pathFromRoot[1].snapshot.params['communityId']

    this.posts$ = this.service.getCommunityInfo(communityLocator)
    .pipe(
      switchMap((result:any)=> {
        return this.service.getFeedForCommunity(result.communityId);
      })
    );

    this.posts$.subscribe({
      next: () => this.loading = false
    })
  }
}
