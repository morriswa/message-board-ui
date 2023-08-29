import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MessageBoardClientService} from "../../service/message-board-client.service";
import {FormControl} from "@angular/forms";
import {UserMenuComponent} from "../user-menu/user-menu.component";

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent{
  public communityLocator: any;
  public communityInfo: any;
  public loading: boolean = true;
  fileInput = new FormControl();
  fileUpload?: File;

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
            this.messageBoardService.joinCommunity(this.communityInfo.communityId!).subscribe();
          },
          error: ()=>router.navigate(['/'])
        })


    } catch {}


  }


  public newImageUploaded($event: any) {
    this.fileUpload = $event.target.files[0];
  }

  public uploadPostImage() {
    // this.PROCESSING_REQUEST = true;

    if (this.fileUpload) {

      UserMenuComponent.file2Base64(this.fileUpload).then(b64Repr => {
        let concatb64Repr = b64Repr.slice(b64Repr.indexOf(",") + 1)
        let imageFormat = b64Repr.slice(b64Repr.indexOf("/") + 1, b64Repr.indexOf(";"))

        this.messageBoardService.createImagePostToCommunity(
          this.communityInfo.communityId,
          "aaaaa", "bbbbb",
          {baseEncodedImage: concatb64Repr,imageFormat: imageFormat})
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
