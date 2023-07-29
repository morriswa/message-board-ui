import {Component, OnInit} from '@angular/core';
import {AuthService} from "@auth0/auth0-angular";
import {Router} from "@angular/router";
import {Observable, of} from "rxjs";
import {FormControl, Validators} from "@angular/forms";
import {ImageCroppedEvent} from "ngx-image-cropper";
import {MessageBoardClientService} from "../../service/message-board-client.service";

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit {
  loading = true
  croppingInProgress= false;

  showChangeDisplayNameForm = false;

  userProfile$:Observable<any>=of();

  fileUpload?: File;
  stagedProfilePhotoForUpload?:Blob;

  fileInput = new FormControl();

  displayNameForm = new FormControl('',
  [
    Validators.required,
    Validators.maxLength(30),
    Validators.minLength(3),
    Validators.pattern('^[a-zA-Z0-9._-]*$')
  ])
  imageChangedEvent: any;

  constructor(private auth: AuthService,
              private messageBoardService: MessageBoardClientService,
              private router: Router) {
  }

  ngOnInit(): void {
   this.refreshUserProfile();
  }

  refreshUserProfile() {
    this.userProfile$ = this.messageBoardService.getUserProfile();
    this.userProfile$
      .subscribe({
        next: user=>{
          console.log(user);
          this.loading = false;
        },
        error: err=>{
          console.error(err)
          this.router.navigate(['/registerUser'])
        }
      });
  }

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
      UserMenuComponent.file2Base64(this.stagedProfilePhotoForUpload).then(b64Repr => {
        let concatb64Repr = b64Repr.slice(b64Repr.indexOf(",") + 1)
        let imageFormat = b64Repr.slice(b64Repr.indexOf("/") + 1, b64Repr.indexOf(";"))

        this.messageBoardService.updateProfileImage({baseEncodedImage: concatb64Repr,imageFormat: imageFormat})
        .subscribe({
          next: ()=>{
            this.fileInput.reset();
            this.refreshUserProfile();
          },
          error: err=>{
            console.error(err);
            this.fileInput.reset();
          }
        })
      });
    }
  }

  public static file2Base64(file:any):Promise<string> {
    return new Promise<string>(
      (resolve,reject)=> {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => resolve(reader.result?.toString() || '');
        reader.onerror = error => reject(error);
      });
  }

  toggleChangeDisplayNameForm() {
    this.showChangeDisplayNameForm = !this.showChangeDisplayNameForm;
  }

  changeDisplayName() {
    this.messageBoardService.updateDisplayName(this.displayNameForm.getRawValue()!)
      .subscribe({
        next: ()=>{
          this.showChangeDisplayNameForm = false;
          this.displayNameForm.reset();
          this.refreshUserProfile();
        },
        error: err => {
          this.showChangeDisplayNameForm = false;
          this.displayNameForm.reset();
          console.error(err);
        }
      });
  }

}
