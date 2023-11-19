import {Component, Input} from '@angular/core';
import {Router} from "@angular/router";
import {CommunityComponent} from "../community/community.component";

@Component({
  selector: 'app-post-feed',
  templateUrl: './post-feed.component.html',
  styleUrls: ['./post-feed.component.scss']
})
export class PostFeedComponent {
  @Input() posts!:any[];
  @Input() membership:any;


  postVoteUpdated($event: number, i: number) {
    this.posts[i].vote = $event
  }
}
