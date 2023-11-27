import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MessageBoardClientService} from "../../service/message-board-client.service";
import {switchMap} from "rxjs";
import {CommunityResponse} from "../../interface/community";
import {CurrentCommunityService} from "./current-community.service";

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.scss']
})
export class CommunityComponent {

  constructor(activeRoute: ActivatedRoute,
              private router: Router,
              private messageBoardService: MessageBoardClientService,
              public currentCommunity: CurrentCommunityService) {

    const communityName: string = activeRoute.snapshot.params['communityId'];

    currentCommunity.reset();

    this.messageBoardService.getCommunityInfo(communityName)
      .pipe(
        switchMap((result:CommunityResponse) =>{
         this.currentCommunity.init({community: result});
         return this.messageBoardService.getMembership(result.communityId)
        })
      ).subscribe({
        next:result=>{
          this.currentCommunity.init({membership: result});
        },
        error: ()=>this.router.navigate(['/'])
      });
  }

  joinCommunity() {
    this.messageBoardService.joinCommunity(this.currentCommunity.id)
      .subscribe(()=>
        this.router.navigate(['/'], {skipLocationChange: true})
          .then(()=>this.router.navigate(['/community', this.currentCommunity.locator])));
  }

  leaveCommunity() {
    this.messageBoardService.leaveCommunity(this.currentCommunity.id)
      .subscribe(()=>
        this.router.navigate(['/'], {skipLocationChange: true})
          .then(()=>this.router.navigate(['/community', this.currentCommunity.locator])));
  }

}
