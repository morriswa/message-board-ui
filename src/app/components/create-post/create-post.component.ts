import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MessageBoardClientService} from "../../service/message-board-client.service";
import {FormControl, Validators} from "@angular/forms";
import {UserMenuComponent} from "../user-menu/user-menu.component";
import {Utils} from "../../Utils";

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent{
  public communityLocator: any;
  public communityInfo: any;
  public loading: boolean = true;

  postCaptionForm = new FormControl('',
    [
      Validators.required,
      Validators.maxLength(100),
      Validators.minLength(10),
    ])

  postDescriptionForm = new FormControl('',
    [
      Validators.maxLength(1000),
    ])
  pendingImageUpload: any;

  constructor(private activeRoute: ActivatedRoute,
              private router: Router,
              private messageBoardService: MessageBoardClientService) {
    try {
      this.communityLocator = activeRoute.snapshot.params['communityId'];

      // console.log(this.communityLocator)

      this.messageBoardService.getCommunityInfo(this.communityLocator)
        .subscribe({
          next: payload=>{
            console.log(payload)
            this.communityInfo = payload;
            this.loading = false;
            this.messageBoardService.joinCommunity(this.communityInfo.communityId!).subscribe();
          },
          error: ()=>router.navigate(['/'])
        })


    } catch {}


  }

  public uploadPostImage($event:any) {
    this.pendingImageUpload=$event
  }


  savePostAndUpload() {
    this.messageBoardService.createImagePostToCommunity(
      this.communityInfo.communityId,
          this.postCaptionForm.getRawValue()!,
          this.postDescriptionForm.getRawValue()!,
          this.pendingImageUpload)
      .subscribe({
            next: ()=>{
              this.router.navigate(['community/'+this.communityLocator])
            },
            error: err=>{
              console.error(err);
              // this.fileInput.reset();
            }
    });
  }

}
