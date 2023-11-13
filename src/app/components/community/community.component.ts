import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MessageBoardClientService} from "../../service/message-board-client.service";
import {UserMenuComponent} from "../user-menu/user-menu.component";
import {FormControl, Validators} from "@angular/forms";
import {switchMap} from "rxjs";
import {PostFeedComponent} from "../post-feed/post-feed.component";

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.scss']
})
export class CommunityComponent {

  loading = true;

  communityName?:string;
  communityInfo:any;
  userInfo:any;

  static communityRefForm = new FormControl('',
    [
      Validators.maxLength(30),
      Validators.minLength(3),
      Validators.pattern("^[a-z][a-z0-9-]*[a-z0-9]$")
    ])

  static communityDisplayNameForm = new FormControl('',
    [
      Validators.maxLength(100),
      Validators.minLength(3),
    ])

  constructor(activeRoute: ActivatedRoute,
              router: Router,
              private messageBoardService: MessageBoardClientService) {
    try {
      this.communityName=activeRoute.snapshot.params['communityId'];

      this.messageBoardService.getCommunityInfo(this.communityName!)
        .pipe(
          switchMap((result:any) => {
            this.communityInfo = result;
            return this.messageBoardService.getUserProfile();
          }))
        .subscribe({
          next: (result:any)=> {
              this.userInfo = result
              // router.routerState.
              this.loading = false
            // router.
              // @ts-ignore
            // router.navigateByUrl(['/community',this.communityName],{ state: {posts: this.communityFeed}})
            // router.routerState.
            //   PostFeedComponent.arguments.communityInfo = this.communityInfo
            },
          error: ()=>router.navigate(['/'])
        })

    } catch {}
  }

}
