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
  posts:any
  constructor(activeRoute: ActivatedRoute, private service: MessageBoardClientService) {
    let communityLocator = activeRoute.pathFromRoot[1].snapshot.params['communityId']

    this.service.getCommunityInfo(communityLocator)
    .pipe(
      switchMap((result:any)=> {
        return this.service.getFeedForCommunity(result.communityId);
      })
    )
      .subscribe({
        next: result => {
          this.posts = result;
        }, error: err => console.error(err)
      })
  }
}
