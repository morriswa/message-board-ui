import {Component} from '@angular/core';
import {MessageBoardClientService} from "../../service/message-board-client.service";
import {PostCommunityResponse} from "../../interface/posts";


@Component({
  selector: 'app-post-feed',
  templateUrl: './post-feed.component.html',
  styleUrls: ['./post-feed.component.scss']
})
export class PostFeedComponent {

  posts?: PostCommunityResponse[];

  constructor(service: MessageBoardClientService) {

    service.getRecentPosts()
      .subscribe({
        next: res =>{
          this.posts = res;
        }
      });
  }
}
