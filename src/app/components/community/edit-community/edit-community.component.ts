import {Component, EventEmitter} from '@angular/core';
import {Router} from "@angular/router";
import {MessageBoardClientService} from "../../../service/message-board-client.service";
import {UploadImageRequest} from "../../../interface/upload-image-request";
import {Observable, of, switchMap, tap} from "rxjs";
import {ValidatorFactory} from "../../../service/validator.factory";
import {FormControl} from "@angular/forms";
import {CurrentCommunityService} from "../current-community.service";
import {PreferencesService} from "../../../service/preferences.service";

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

  stagedContentForUpload: {
   icon?: UploadImageRequest
   banner?: UploadImageRequest
  } = {};

  resetEventEmitter: EventEmitter<any> = new EventEmitter<any>();
  preferences: any;

  constructor(validatorFactory: ValidatorFactory,
              currentPrefs: PreferencesService,
              private router: Router,
              private messageBoardService: MessageBoardClientService,
              public currentCommunity: CurrentCommunityService,
  ) {
    this.communityLocatorForm = validatorFactory.getCommunityRefForm();
    this.communityDisplayNameForm = validatorFactory.getCommunityDisplayNameForm();
    this.preferences = currentPrefs.preferences;
  }

  updateCommunity() {

    this.PROCESSING = true;

    const newRef = this.communityLocatorForm.value!;

    of('update community triggered!')
      .pipe(
        switchMap(()=>this.updateCommunityAttrs()),
        switchMap(()=>this.updateCommunityBanner()),
        switchMap(()=>this.updateCommunityIcon()),
      )
      .subscribe({
      next: ()=>{
        this.resetEventEmitter.emit();

        let nav = newRef? newRef : this.currentCommunity.locator

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

  updateCommunityAttrs(): Observable<any> {
    // if either form has a value
    if ((this.communityDisplayNameForm.value || this.communityLocatorForm.value)
      // and the value(s) are valid
      && !(this.communityDisplayNameForm.invalid || this.communityLocatorForm.invalid))
        // then call update endpoint
        return this.messageBoardService.editCommunityAttributes(
          this.currentCommunity.id,
          this.communityLocatorForm.value,
          this.communityDisplayNameForm.value).pipe(tap(()=>{
            this.communityLocatorForm.reset();
            this.communityDisplayNameForm.reset();
          }
        ));

    // else skip
    else return of('no values to update!');
  }

  public updateCommunityBanner(): Observable<any> {
    if (this.stagedContentForUpload.banner)
      return this.messageBoardService
        .updateCommunityBanner(
          this.currentCommunity.id,
          this.stagedContentForUpload.banner!);

    return of('did not update banner')
  }

  public updateCommunityIcon(): Observable<any> {
    if (this.stagedContentForUpload.icon)
      return this.messageBoardService
        .updateCommunityIcon(
          this.currentCommunity.id,
          this.stagedContentForUpload.icon!);

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
