import {Component, EventEmitter, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MessageBoardClientService} from "../../../service/message-board-client.service";
import {FormControl, Validators} from "@angular/forms";
import {UserMenuComponent} from "../../user-menu/user-menu.component";
import {Utils} from "../../../Utils";
import {UploadImageRequest} from "../../../interface/upload-image-request";
import {switchMap} from "rxjs";

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent{
  communityInfo: any;
  loading: boolean = true;

  pendingImageUpload?: UploadImageRequest;

  clearImageUploadEmitter: EventEmitter<any> = new EventEmitter<any>();


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

      const communityLocator = activeRoute.pathFromRoot[1].snapshot.params['communityId']

      this.messageBoardService.getCommunityInfo(communityLocator)
        .subscribe({
          next: (result: any)=>{
            this.communityInfo = result;
            this.loading = false;
          },
          error: ()=>router.navigate(['/'])
        });
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
              this.clearImageUploadEmitter.emit();
              this.router.navigate(['/community',this.communityInfo.communityLocator])
            },
            error: err=>{
              this.clearImageUploadEmitter.emit();
              console.error(err);
            }
    });
  }

}
