import {Component, EventEmitter} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MessageBoardClientService} from "../../../service/message-board-client.service";
import {UploadImageRequest} from "../../../interface/upload-image-request";
import {map, of, switchMap} from "rxjs";
import {ValidatorFactory} from "../../../service/validator.factory";
import {FormControl} from "@angular/forms";
import {CommunityResponse} from "../../../interface/community";

@Component({
  selector: 'app-edit-community',
  templateUrl: './edit-community.component.html',
  styleUrls: ['./edit-community.component.scss']
})
export class EditCommunityComponent {

  PROCESSING= false;
  ERROR_MESSAGES: { message: string, show: boolean }[] = [];

  communityLocatorForm: FormControl;
  communityDisplayNameForm: FormControl;

  communityInfo?:CommunityResponse;

  stagedContentForUpload: {
   icon?: UploadImageRequest
   banner?: UploadImageRequest
  } = {};

  resetEventEmitter: EventEmitter<any> = new EventEmitter<any>();

  constructor(private activeRoute: ActivatedRoute,
              private router: Router,
              private messageBoardService: MessageBoardClientService,
              validatorFactory: ValidatorFactory) {
    let communityLocator = activeRoute.pathFromRoot[1].snapshot.params['communityId'];

    this.communityLocatorForm = validatorFactory.getCommunityRefForm();
    this.communityDisplayNameForm = validatorFactory.getCommunityDisplayNameForm();

    this.messageBoardService.getCommunityInfo(communityLocator)
      .subscribe({
        next: result => {
          this.communityInfo = result;
        }, error: err => console.error(err)
      });
  }

  updateCommunity() {

    this.PROCESSING = true;

    const newRef = this.communityLocatorForm.value!;

    this.messageBoardService.editCommunityAttributes(
      this.communityInfo!.communityId,
      newRef,
      this.communityDisplayNameForm.value)
      .pipe(
        switchMap(()=>this.updateCommunityBanner()),
        switchMap(()=>this.updateCommunityIcon()),
      )
      .subscribe({
      next: ()=>{
        let nav = newRef? newRef : this.communityInfo!.communityLocator
        this.communityLocatorForm.reset()
        this.communityDisplayNameForm.reset()
        this.router.navigateByUrl('/',{ skipLocationChange: true})
          .then(()=>this.router.navigate(['/community',nav]));
      }, error: (response:any) =>{
        this.PROCESSING = false;

        if (response.error.error === "ValidationException")
          for (let error of response.error.stack) {
            this.reportError(error.message);
          }
        else this.reportError(response.error.description);
      }
    })
  }

  public updateCommunityBanner() {
    if (this.stagedContentForUpload.banner) {

      return this.messageBoardService.updateCommunityBanner(
          this.communityInfo!.communityId,
          this.stagedContentForUpload.banner!)
        .pipe(map(()=> {
            this.resetEventEmitter.emit();
            return 'updated community banner'
          }));
    }

    return of('did not update banner')
  }
  public updateCommunityIcon() {

    if (this.stagedContentForUpload.icon) {

      return this.messageBoardService.updateCommunityIcon(
          this.communityInfo!.communityId,
          this.stagedContentForUpload.icon!)
        .pipe(map(()=> {
          this.resetEventEmitter.emit();
          return 'updated community icon'
        }));

    }

    return of('did not update icon')
  }

  uploadCommunityResource(banner: string, $event: any) {
    if (banner === "banner")
      this.stagedContentForUpload.banner = $event;
    else
      this.stagedContentForUpload.icon = $event
  }

  reportError(response: string) {
    this.ERROR_MESSAGES.push({ message: response, show: true });
  }

  hideError(i: number) {
    this.ERROR_MESSAGES[i].show = false;
  }
}
