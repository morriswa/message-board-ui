import { Component } from '@angular/core';
import {MessageBoardClientService} from "../../../service/message-board-client.service";
import {PostResponse} from "../../../interface/posts";
import {CurrentCommunityService} from "../current-community.service";
import {date} from 'src/app/Functions';

@Component({
  selector: 'app-community-feed',
  templateUrl: './community-feed.component.html',
  styleUrls: ['./community-feed.component.scss']
})
export class CommunityFeedComponent {
  date=date;

  posts?: PostResponse[];

  constructor(private service: MessageBoardClientService,
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

  removePost(postId:number) {
    this.service.removePost(postId)
    .subscribe({
      next: ()=>this.posts = this.posts?.filter((post:any)=>postId!==post.postId)
    });
  }

  reportPost(postId: number) {
    this.service.reportPost(postId)
    .subscribe();
  }
    
    
}
