import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MessageBoardClientService} from "../../service/message-board-client.service";
import {FormControl, Validators} from "@angular/forms";
import {map, mergeAll, mergeMap, Observable, of, switchMap} from "rxjs";

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.scss']
})
export class CommunityComponent {

  // loading = true;
  communityInfo:any;
  community$:Observable<any> = of ({});
  userInfo:any;

  static communityRefForm = new FormControl('',
    [
      Validators.maxLength(30),
      Validators.minLength(3),
      Validators.pattern("^[a-z][a-z0-9-]*[a-z0-9]$")
    ]);

  static communityDisplayNameForm = new FormControl('',
    [
      Validators.maxLength(100),
      Validators.minLength(3),
    ]);

  userIsCommunityMember = false;
  isCommunityOwner = false;

  constructor(private activeRoute: ActivatedRoute,
              private router: Router,
              private messageBoardService: MessageBoardClientService) {
    try {
      const communityName = activeRoute.snapshot.params['communityId'];

      this.community$ = this.messageBoardService.getCommunityInfo(communityName)
        .pipe(
          map((result:any) => {
            this.communityInfo = result;
            return result
          }));

      this.community$.pipe(
        switchMap(()=> {
          return this.messageBoardService.getMembership(this.communityInfo.communityId);
        }))
        .subscribe({
          next:result=>{
            this.userInfo = result;
            // this.loading = false
            this.isCommunityOwner = this.userInfo.userId === this.communityInfo.ownerId;
            this.userIsCommunityMember = result.exists
          },
          error: ()=>this.router.navigate(['/'])
        });
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
        this.userInfo = result;
        this.isCommunityOwner = this.userInfo.userId === this.communityInfo.ownerId;
      }
    })
  }
}
