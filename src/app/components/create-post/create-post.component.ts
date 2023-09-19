import {Component, EventEmitter, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MessageBoardClientService} from "../../service/message-board-client.service";
import {FormControl, Validators} from "@angular/forms";
import {UserMenuComponent} from "../user-menu/user-menu.component";
import {Utils} from "../../Utils";
import {UploadImageRequest} from "../../interface/upload-image-request";

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent{
  communityLocator: any;
  communityInfo: any;
  loading: boolean = true;

  pendingImageUpload?: UploadImageRequest;

  resetEventEmitter: EventEmitter<any> = new EventEmitter<any>();


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

  constructor(private activeRoute: ActivatedRoute,
              private router: Router,
              private messageBoardService: MessageBoardClientService) {
    try {
      this.communityLocator = activeRoute.snapshot.params['communityId'];
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

  public uploadPostImage($event:UploadImageRequest) {
    this.pendingImageUpload=$event
  }

  savePostAndUpload() {
    if (!this.pendingImageUpload) return

    this.messageBoardService.createImagePostToCommunity(
      this.communityInfo.communityId,
          this.postCaptionForm.getRawValue()!,
          this.postDescriptionForm.getRawValue()!,
          this.pendingImageUpload)
      .subscribe({
            next: ()=> {
              this.resetEventEmitter.emit();
              this.router.navigate(['community/'+this.communityLocator])
            },
            error: err=>{
              this.resetEventEmitter.emit();
              console.error(err);
            }
    });
  }

}
