import {Component} from '@angular/core';
import {MessageBoardClientService} from "../../service/message-board-client.service";


@Component({
  selector: 'app-post-feed',
  templateUrl: './post-feed.component.html',
  styleUrls: ['./post-feed.component.scss']
})
export class PostFeedComponent {

  posts?: any[];

  constructor(service: MessageBoardClientService) {

    service.getRecentPosts()
      .subscribe({
        next: (res:any) =>{
          this.posts = res;
        }
      });
  }
}
