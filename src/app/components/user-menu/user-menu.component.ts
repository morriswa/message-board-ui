import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {FormControl} from "@angular/forms";
import {MessageBoardClientService} from "../../service/message-board-client.service";
import {ThemeService} from "../../service/theme.service";
import {ValidatorFactory} from "../../service/validator.factory";
import {UserProfile} from "../../interface/user-profile";

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent {

  PROCESSING_REQUEST = false
  change_display_name_form_toggle = false;
  dark_mode_switch_toggle = false;

  fileInput:FormControl<File> = new FormControl();

  displayNameForm:FormControl;

  user?: UserProfile;

  constructor(private messageBoardService: MessageBoardClientService,
              private router: Router,
              private themeService: ThemeService,
              validatorFactory: ValidatorFactory) {
    this.refreshUserProfile();
    this.dark_mode_switch_toggle = !(themeService.current === "default");
    this.displayNameForm = validatorFactory.getDisplayNameForm();
  }

  refreshUserProfile() {
    this.messageBoardService.getUserProfile().subscribe({
      next: result => this.user = result,
      error: () => this.router.navigateByUrl("/registerUser")
    })
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
    this.change_display_name_form_toggle = !this.change_display_name_form_toggle;
  }

  changeDisplayName() {
    this.messageBoardService.updateDisplayName(this.displayNameForm.getRawValue()!)
      .subscribe({
        next: ()=>{
          this.change_display_name_form_toggle = false;
          this.displayNameForm.reset();
          this.refreshUserProfile();
        },
        error: err => {
          this.change_display_name_form_toggle = false;
          this.displayNameForm.reset();
          console.error(err);
        }
      });
  }

  darkModeUpdated($event: any) {
    this.dark_mode_switch_toggle = $event.target.checked

    let newTheme: string
    if (this.dark_mode_switch_toggle) newTheme = "dark-mode";
    else newTheme = "default"

    this.themeService.current = newTheme;
    this.messageBoardService.updateUIProfile(newTheme).subscribe({
      error:err=>console.error(err)
    });
  }

}
