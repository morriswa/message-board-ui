import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MessageBoardClientService} from "../../service/message-board-client.service";
import {FormControl, Validators} from "@angular/forms";
import {switchMap} from "rxjs";

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.scss']
})
export class CommunityComponent{

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
  userIsCommunityMember = false;
  isCommunityOwner = false;

  constructor(private activeRoute: ActivatedRoute,
              private router: Router,
              private messageBoardService: MessageBoardClientService) {
    try {
      this.communityName=activeRoute.snapshot.params['communityId'];

      this.messageBoardService.getCommunityInfo(this.communityName!)
        .pipe(
          switchMap((result:any) => {
            this.communityInfo = result;
            return this.messageBoardService.getUserProfile();
          }),
          switchMap( (result:any)=> {
            this.userInfo = result
            // router.routerState.

            this.isCommunityOwner = this.userInfo.userId === this.communityInfo.ownerId;
            return this.messageBoardService.getMembership(this.communityInfo.communityId);
          }))
        .subscribe({
          next:result=>{
            this.loading = false
            this.userIsCommunityMember = result.exists
          },


          error: ()=>router.navigate(['/'])
        })

    } catch {}
  }

  joinCommunity() {
    this.messageBoardService.joinCommunity(this.communityInfo.communityId)
      .subscribe(()=>this.reloadCommunityStatus());

  }

  leaveCommunity() {
    this.messageBoardService.leaveCommunity(this.communityInfo.communityId)
      .subscribe(()=>this.reloadCommunityStatus());
  }

  reloadCommunityStatus() {
    this.messageBoardService.getMembership(this.communityInfo.communityId).subscribe({
      next:result=>{
        this.userIsCommunityMember = result.exists
      }
    })
  }

}
