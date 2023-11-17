import {Component} from '@angular/core';
import {AuthService} from "@auth0/auth0-angular";
import {Router} from "@angular/router";
import {Observable, of} from "rxjs";
import {FormControl, Validators} from "@angular/forms";
import {MessageBoardClientService} from "../../service/message-board-client.service";
import {UploadImageRequest} from "../../interface/upload-image-request";
import {ThemeService} from "../../service/theme.service";
import {Utils} from "../../Utils";

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
  displayNameForm = Utils.displayNameForm;
  newThemeBuffer = false;

  constructor(private auth: AuthService,
              private messageBoardService: MessageBoardClientService,
              private router: Router,
              private themeService: ThemeService) {
    this.refreshUserProfile();
    this.userProfile$
      .subscribe({
        // next: user=>this.loading = false,
        error: err=>{
          console.error(err)
          this.router.navigate(['/registerUser'])
        }
      });
    this.newThemeBuffer = !(themeService.current === "default")
  }

  refreshUserProfile() {
    this.userProfile$ = this.messageBoardService.getUserProfile();
  }

  updateUserProfileImage($event:any) {
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

  darkModeUpdated($event: any) {
    this.newThemeBuffer = $event.target.checked

    let newTheme: string
    if (this.newThemeBuffer) newTheme = "dark-mode";
    else newTheme = "default"

    this.themeService.current = newTheme;
    this.messageBoardService.updateUIProfile(newTheme).subscribe({
      error:err=>console.error(err)
    });
  }

}
