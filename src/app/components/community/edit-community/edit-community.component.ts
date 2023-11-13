import {Component, EventEmitter} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MessageBoardClientService} from "../../../service/message-board-client.service";
import {UploadImageRequest} from "../../../interface/upload-image-request";
import {CommunityComponent} from "../community.component";
import {map, of, switchMap} from "rxjs";

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


    const newRef = this.communityRefForm.getRawValue()!

    this.messageBoardService.editCommunityAttributes(
      this.communityInfo.communityId,
      newRef!,
      this.communityDisplayNameForm.getRawValue()!)
      .pipe(
        switchMap(()=>this.updateCommunityBanner()),
        switchMap(()=>this.updateCommunityIcon())
        // mergeAll()
      )
      .subscribe({
      next: ()=>{
        let nav = newRef? newRef : this.communityInfo.communityLocator
        this.communityRefForm.reset()
        this.communityDisplayNameForm.reset()
        this.router.navigateByUrl('/',{ skipLocationChange: true})
          .then(()=>this.router.navigate(['/community',nav]));
      }, error: () =>{

      }
    })
  }

  public updateCommunityBanner() {
    // this.PROCESSING_REQUEST = true;

    console.log(this.stagedContentForUpload.banner)

    if (this.stagedContentForUpload.banner) {

      return this.messageBoardService.updateCommunityBanner(
          this.communityInfo.communityId!,
          this.stagedContentForUpload.banner!)
        .pipe(map(()=> {
            this.resetEventEmitter.emit();
            return 'updated community banner'
          }));
    }

    return of('did not update banner')
  }
  public updateCommunityIcon() {
    // this.PROCESSING_REQUEST = true;

    if (this.stagedContentForUpload.icon) {

      return this.messageBoardService.updateCommunityIcon(
          this.communityInfo.communityId!,
          this.stagedContentForUpload.icon!)
        .pipe(map(()=> {
          this.resetEventEmitter.emit();
          return 'updated community icon'
        }));

    }

    return of('did not update icon')
  }

  uploadCommunityResource(banner: string, $event: UploadImageRequest) {
    if (banner === "banner")
      this.stagedContentForUpload.banner = $event;
    else
      this.stagedContentForUpload.icon = $event
  }
}
