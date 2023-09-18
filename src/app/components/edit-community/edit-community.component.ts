import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MessageBoardClientService} from "../../service/message-board-client.service";
import {FormControl, Validators} from "@angular/forms";
import {ImageCroppedEvent} from "ngx-image-cropper";
import {UserMenuComponent} from "../user-menu/user-menu.component";
import {Utils} from "../Utils";

@Component({
  selector: 'app-edit-community',
  templateUrl: './edit-community.component.html',
  styleUrls: ['./edit-community.component.scss']
})
export class EditCommunityComponent {

  communityRefForm = new FormControl('',
    [
      Validators.required,
      Validators.maxLength(30),
      Validators.minLength(3),
      Validators.pattern('^[a-zA-Z0-9-]*$')
    ])

  communityDisplayNameForm = new FormControl('',
    [
      Validators.required,
      Validators.maxLength(30),
      Validators.minLength(3),
    ])

  loading=true;

  communityLocator;
  communityInfo:any;
   fileUpload?: any;
   imageChangedEvent?: any;
   croppingInProgress?: boolean;
   stagedProfilePhotoForUpload?: Blob;
   fileInput?: any;

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
          },
          error: ()=>router.navigate(['/'])
        })

    } catch {}
  }

  updateCommunity() {}

  public newImageUploaded($event: any) {
    this.fileUpload = $event.target.files[0];
    this.imageChangedEvent = $event;
    this.croppingInProgress = true;
  }

  public imageCropped($event: ImageCroppedEvent) {
    this.stagedProfilePhotoForUpload = $event.blob!;
  }

  public updateUserProfileImage() {
    // this.PROCESSING_REQUEST = true;

    if (this.stagedProfilePhotoForUpload) {

      this.croppingInProgress = false;
      Utils.file2Base64(this.stagedProfilePhotoForUpload).then(b64Repr => {
        let concatb64Repr = b64Repr.slice(b64Repr.indexOf(",") + 1)
        let imageFormat = b64Repr.slice(b64Repr.indexOf("/") + 1, b64Repr.indexOf(";"))

        this.messageBoardService.updateProfileImage({baseEncodedImage: concatb64Repr,imageFormat: imageFormat})
          .subscribe({
            next: ()=>{
              this.fileInput.reset();
            },
            error: err=>{
              console.error(err);
              this.fileInput.reset();
            }
          })
      });
    }
  }


}
