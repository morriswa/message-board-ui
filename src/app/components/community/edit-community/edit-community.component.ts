import {Component, EventEmitter, Input} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MessageBoardClientService} from "../../../service/message-board-client.service";
import {FormControl, Validators} from "@angular/forms";
import {UploadImageRequest} from "../../../interface/upload-image-request";
import {CommunityComponent} from "../community.component";

@Component({
  selector: 'app-edit-community',
  templateUrl: './edit-community.component.html',
  styleUrls: ['./edit-community.component.scss']
})
export class EditCommunityComponent {

  communityRefForm = CommunityComponent.communityRefForm;
  communityDisplayNameForm = CommunityComponent.communityDisplayNameForm


  loading=true;

  // communityLocator;
  communityInfo:any;

  stagedContentForUpload: {
   icon?: UploadImageRequest
   banner?: UploadImageRequest
  } = {};

  resetEventEmitter: EventEmitter<any> = new EventEmitter<any>();

  constructor(private activeRoute: ActivatedRoute,
              private router: Router,
              private messageBoardService: MessageBoardClientService) {
    let communityLocator = activeRoute.pathFromRoot[1].snapshot.params['communityId']

    this.messageBoardService.getCommunityInfo(communityLocator)
      .subscribe({
        next: result => {
          this.communityInfo = result;
          this.loading = false;
        }, error: err => console.error(err)
      })
  }

  updateCommunity() {
    this.updateCommunityBanner();
    this.updateCommunityIcon();

    const newRef = this.communityRefForm.getRawValue()!

    this.messageBoardService.editCommunityAttributes(
      this.communityInfo.communityId,
      newRef!,
      this.communityDisplayNameForm.getRawValue()!).subscribe({
      next: ()=>{
        let nav = newRef? newRef : this.communityInfo.communityLocator
        this.communityRefForm.reset()
        this.communityDisplayNameForm.reset()
        this.router.navigate(['/community/'+nav])
      }, error: () =>{

      }
    })
  }

  public updateCommunityBanner() {
    // this.PROCESSING_REQUEST = true;

    console.log(this.stagedContentForUpload.banner)

    if (this.stagedContentForUpload.banner) {

      this.messageBoardService.updateCommunityBanner(
          this.communityInfo.communityId!,
          this.stagedContentForUpload.banner!)
        .subscribe({
          next: ()=> {
            this.resetEventEmitter.emit();
          },
          error: err=>{
            this.resetEventEmitter.emit();
            console.error(err);
          }
        })

    }
  }
  public updateCommunityIcon() {
    // this.PROCESSING_REQUEST = true;

    if (this.stagedContentForUpload.icon) {

      this.messageBoardService.updateCommunityIcon(
          this.communityInfo.communityId!,
          this.stagedContentForUpload.icon!)
        .subscribe({
          next: ()=>{
            this.resetEventEmitter.emit();
          },
          error: err=>{
            this.resetEventEmitter.emit();
            console.error(err);
          }
        })

    }
  }

  uploadCommunityResource(banner: string, $event: UploadImageRequest) {
    if (banner === "banner")
      this.stagedContentForUpload.banner = $event;
    else
      this.stagedContentForUpload.icon = $event
  }
}
