import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MessageBoardClientService} from "../../service/message-board-client.service";
import {switchMap, tap} from "rxjs";
import {CommunityMembership, CommunityResponse} from "../../interface/community";

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.scss']
})
export class CommunityComponent {
  community?:CommunityResponse;
  userInfo?:CommunityMembership;

  userIsCommunityMember = false;
  isCommunityOwner = false;

  constructor(activeRoute: ActivatedRoute,
              private router: Router,
              private messageBoardService: MessageBoardClientService) {
    try {
      const communityName = activeRoute.snapshot.params['communityId'];

      this.messageBoardService.getCommunityInfo(communityName)
        .pipe(
          switchMap((result:CommunityResponse) =>{
           this.community = result;
           return this.messageBoardService.getMembership(this.community.communityId)
          })
        ).subscribe({
          next:result=>{
            this.userInfo = result;
            this.isCommunityOwner = this.userInfo.userId === this.community!.ownerId;
            this.userIsCommunityMember = this.userInfo.exists;
          },
          error: ()=>this.router.navigate(['/registerUser'])
        });
    } catch {}
  }

  joinCommunity() {
    this.messageBoardService.joinCommunity(this.community!.communityId)
      .subscribe(()=>
        this.router.navigate(['/'], {skipLocationChange: true})
          .then(()=>this.router.navigate(['/community', this.community!.communityLocator])));
  }

  leaveCommunity() {
    this.messageBoardService.leaveCommunity(this.community!.communityId)
      .subscribe(()=>
        this.router.navigate(['/'], {skipLocationChange: true})
          .then(()=>this.router.navigate(['/community', this.community!.communityLocator])));
  }

}
