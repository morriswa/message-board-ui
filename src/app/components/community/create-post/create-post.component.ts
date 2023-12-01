import {Component, EventEmitter} from '@angular/core';
import {Router} from "@angular/router";
import {MessageBoardClientService} from "../../../service/message-board-client.service";
import {FormControl} from "@angular/forms";
import {UploadImageRequest} from "../../../interface/upload-image-request";
import {of, switchMap, tap} from "rxjs";
import {ValidatorFactory} from "../../../service/validator.factory";
import {PostDraftResponse} from "../../../interface/posts";
import {CurrentCommunityService} from "../current-community.service";
import { PreferencesService } from 'src/app/service/preferences.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent {
  PROCESSING = false;
  SHOW_ERROR = false;
  ERROR_TEXT?: string;

  currentDraftId?:string;
  currentDraft?: PostDraftResponse;
  pendingImageUpload?: UploadImageRequest;

  clearImageUploadEmitter: EventEmitter<any> = new EventEmitter<any>();
  serverErrorEmitter: EventEmitter<any> = new EventEmitter();

  postCaptionForm: FormControl;
  postDescriptionForm: FormControl;
  postCaptionFormWarnings: any;
  postDescriptionFormWarnings: any;
  preferences: any;

  constructor(validators: ValidatorFactory,
              preferences: PreferencesService,
              private router: Router,
              private messageBoardService: MessageBoardClientService,
              public communityInfo: CurrentCommunityService) {
    this.postCaptionForm = validators.getPostCaptionForm();
    this.postCaptionFormWarnings = validators.getPostCaptionFormWarnings();
    this.postDescriptionForm = validators.getPostDescriptionForm();
    this.postDescriptionFormWarnings = validators.getPostDescriptionFormWarnings();
    this.preferences = preferences.preferences;

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
            this.communityInfo.id,
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
              this.router.navigate(['/community',this.communityInfo.locator])
            },
            error: (err:any)=>{
              this.clearImageUploadEmitter.emit();
              this.serverErrorEmitter.emit(err.error.description);
              this.PROCESSING = false
            }
    });
  }

  saveDraftAndResetImageUploader() {
    this.PROCESSING = true;

    of('begin post update').pipe(
      switchMap(() => {
        // if there is not a draft ID registered, a new one will have to be created
        if (!this.currentDraftId) return this.messageBoardService.createPostDraft(
          this.communityInfo.id)
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
          this.serverErrorEmitter.emit(err.error.description)
          this.PROCESSING = false
        }
      });

  }
}
