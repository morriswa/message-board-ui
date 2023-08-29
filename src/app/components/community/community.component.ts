import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MessageBoardClientService} from "../../service/message-board-client.service";
import {UserMenuComponent} from "../user-menu/user-menu.component";

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.scss']
})
export class CommunityComponent {

  loading = true;

  communityName?:string;
  communityInfo:any;
  communityFeed:any[]=[];
  constructor(private activeRoute: ActivatedRoute,
              private router: Router,
              private messageBoardService: MessageBoardClientService) {
    try {
      this.communityName=activeRoute.snapshot.params['communityId'];

      this.messageBoardService.getCommunityInfo(this.communityName!)
        .subscribe({
          next: payload=>{
            console.log(payload)
            this.communityInfo = payload;
            this.messageBoardService.getFeedForCommunity(this.communityInfo.communityId!)
              .subscribe((result:any)=>{
                this.communityFeed = result.payload
                this.loading = false
              }
          )
          },
          error: ()=>router.navigate(['/'])
        })

    } catch {}
  }





}
