import {Component, EventEmitter} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MessageBoardClientService} from "../../../service/message-board-client.service";
import {FormControl, Validators} from "@angular/forms";
import {UploadImageRequest} from "../../../interface/upload-image-request";
import {of, switchMap, tap} from "rxjs";

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent{
  communityInfo: any;
  loading: boolean = true;
  currentDraftId?:string;
  pendingImageUpload?: UploadImageRequest;

  clearImageUploadEmitter: EventEmitter<any> = new EventEmitter<any>();


  postCaptionForm = new FormControl('',
    [
      Validators.required,
      Validators.maxLength(200),
      Validators.minLength(10),
    ])

  postDescriptionForm = new FormControl('',
    [
      Validators.maxLength(1000),
    ])
  PROCESSING = false;
  SHOW_ERROR = false;
  ERROR_TEXT?: string;
  currentDraft: any;

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

    this.PROCESSING = true;

    of('begin post update and upload').pipe(
      switchMap(()=>{
        // if there is not a draft ID registered, a new one will have to be created
        if (!this.currentDraftId) return this.messageBoardService.createPostDraft(
            this.communityInfo.communityId,
            this.postCaptionForm.value,
            this.postDescriptionForm.value) .pipe(
          tap(draftId => {
            this.currentDraftId = draftId;
          }));

        // if there was a registered draft, but the forms have newer values than the draft
        if (this.postCaptionForm.value || this.postDescriptionForm.value)
          // call edit
          return this.messageBoardService.editDraft(this.currentDraftId, this.postCaptionForm.value, this.postDescriptionForm.value)

        // all else draft is up to date, next step
        return of('draft up to date')
      }),
        switchMap(()=>{
          // if there are no resources waiting to be uploaded, skip this step
          if (!this.pendingImageUpload) return of('draft resources up to date');
          // if there are more resources to add to the post, do that now
          else return this.messageBoardService.addContentToDraft(this.currentDraftId!, this.pendingImageUpload)
        }),
        // after draft has been assembled, do final post call
        switchMap(() =>this.messageBoardService.postDraft(this.currentDraftId!))
      )
      .subscribe({
            next: ()=> {
              this.clearImageUploadEmitter.emit();
              this.router.navigate(['/community',this.communityInfo.communityLocator])
            },
            error: (err:any)=>{
              this.clearImageUploadEmitter.emit();
              this.reportError(err.error.description)
              this.PROCESSING = false
            }
    });
  }

  resetError() {
    this.SHOW_ERROR = false;
    this.ERROR_TEXT = undefined;
  }

  reportError(description:string) {
    this.ERROR_TEXT = description;
    this.SHOW_ERROR = true;
  }

  saveDraftAndResetImageUploader() {
    this.PROCESSING = true;

    of('begin post update').pipe(
      switchMap(() => {
        // if there is not a draft ID registered, a new one will have to be created
        if (!this.currentDraftId) return this.messageBoardService.createPostDraft(
          this.communityInfo.communityId)
          .pipe(
            tap(draftId => {
              this.currentDraftId = draftId;
            }));

        // all else draft is up to date, next step
        return of('draft present')
      }),
      switchMap(() => {
        // if there are no resources waiting to be uploaded, skip this step
        if (!this.pendingImageUpload) return of('draft resources up to date');
        // if there are more resources to add to the post, do that now
        else return this.messageBoardService.addContentToDraft(this.currentDraftId!, this.pendingImageUpload)
      }),
      // get up to date draft to display
      switchMap(()=>this.messageBoardService.getDraft(this.currentDraftId!))
    )
      .subscribe({
        next: (res: any) => {
          this.currentDraft = res;
          this.clearImageUploadEmitter.emit();
          this.pendingImageUpload = undefined;
          this.PROCESSING = false;
        },
        error: (err: any) => {
          this.clearImageUploadEmitter.emit();
          this.reportError(err.error.description)
          this.PROCESSING = false
        }
      });

  }
}
