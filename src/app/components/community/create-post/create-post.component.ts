import {Component, EventEmitter} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MessageBoardClientService} from "../../../service/message-board-client.service";
import {FormControl, Validators} from "@angular/forms";
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
  currentDraft?:string;
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

  public uploadPostImage($event:any) {
    this.pendingImageUpload=$event
  }

  savePostAndUpload() {
    if (!this.pendingImageUpload) return

    this.messageBoardService.createPostDraft(
      this.communityInfo.communityId,
          this.postCaptionForm.getRawValue()!,
          this.postDescriptionForm.getRawValue()!)
      .pipe(
        switchMap(draftId => {
          this.currentDraft = draftId;
          return this.messageBoardService.addContentToDraft(this.currentDraft!, this.pendingImageUpload);
        }),
        switchMap(() => this.messageBoardService.postDraft(this.currentDraft!))
      )
      .subscribe({
            next: ()=> {
              this.clearImageUploadEmitter.emit();
              this.router.navigate(['/community',this.communityInfo.communityLocator])
              this.currentDraft = undefined
            },
            error: err=>{
              this.clearImageUploadEmitter.emit();
              console.error(err);
              this.currentDraft = undefined
            }
    });
  }

}
