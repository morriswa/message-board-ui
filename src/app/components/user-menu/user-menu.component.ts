import {Component} from '@angular/core';
import {AuthService} from "@auth0/auth0-angular";
import {Router} from "@angular/router";
import {Observable, of} from "rxjs";
import {FormControl, Validators} from "@angular/forms";
import {MessageBoardClientService} from "../../service/message-board-client.service";
import {UploadImageRequest} from "../../interface/upload-image-request";

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent {

  PROCESSING_REQUEST = false
  showChangeDisplayNameForm = false;
  userProfile$: Observable<any> = of ( {});
  fileInput = new FormControl();
  displayNameForm = new FormControl('',
  [
    Validators.required,
    Validators.maxLength(30),
    Validators.minLength(3),
    Validators.pattern('^[a-zA-Z0-9._-]*$')
  ])

  constructor(private auth: AuthService,
              private messageBoardService: MessageBoardClientService,
              private router: Router) {
    this.userProfile$
      .subscribe({
        // next: user=>this.loading = false,
        error: err=>{
          console.error(err)
          this.router.navigate(['/registerUser'])
        }
      });
    this.refreshUserProfile();
  }

  refreshUserProfile() {
    this.userProfile$ = this.messageBoardService.getUserProfile();
  }

  updateUserProfileImage($event:UploadImageRequest) {
    this.PROCESSING_REQUEST = true;
    this.messageBoardService.updateProfileImage($event)
    .subscribe({
      next: ()=>{
        this.fileInput.reset();
        this.refreshUserProfile();
        this.PROCESSING_REQUEST = false;
      },
      error: err=>{
        console.error(err);
        this.fileInput.reset();
        this.PROCESSING_REQUEST = false;
      }
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
