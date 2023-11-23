import {FormControl, Validators} from "@angular/forms";
import {MessageBoardClientService} from "./message-board-client.service";
import {EventEmitter, Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class ValidatorFactory {

  prefs?: any;
  prefsSet = new EventEmitter<boolean>();

  constructor(client: MessageBoardClientService) {
    client
      .getPreferences()
      .subscribe({
        next: value => {
          this.prefs = value;
          this.prefsSet.emit(true);
        },
        error: err=>console.error(err)
     });
  }

  getDisplayNameForm()  {
    if (!this.prefs){
      console.error("UH OH")
      throw new Error("We need PREFERENCES!!!!")
    }

    return new FormControl('',
    [
      Validators.maxLength(this.prefs.DISPLAY_NAME_MAX),
      Validators.minLength(this.prefs.DISPLAY_NAME_MIN),
      Validators.pattern(this.prefs.DISPLAY_NAME_PATTERN)
    ]);
  }

  getCommunityRefForm() {
    if (!this.prefs){
      console.error("UH OH")
      throw new Error("We need PREFERENCES!!!!")
    }

    return new FormControl('',
      [
        Validators.maxLength(this.prefs.COMMUNITY_REF_MAX),
        Validators.minLength(this.prefs.COMMUNITY_REF_MIN),
        Validators.pattern(this.prefs.COMMUNITY_REF_PATTERN)
      ]);
  }

  getCommunityDisplayNameForm(){
    if (!this.prefs){
      console.error("UH OH")
      throw new Error("We need PREFERENCES!!!!")
    }

    return new FormControl('',
      [
        Validators.maxLength(this.prefs.COMMUNITY_NAME_MAX),
        Validators.minLength(this.prefs.COMMUNITY_NAME_MIN),
      ]);
  }

  getPostCaptionForm() {
    if (!this.prefs){
      console.error("UH OH")
      throw new Error("We need PREFERENCES!!!!")
    }

    return new FormControl('',
      [
        Validators.maxLength(this.prefs.POST_CAPTION_MAX),
        Validators.minLength(this.prefs.POST_CAPTION_MIN),
      ]);
  }

  getPostDescriptionForm() {
    if (!this.prefs){
      console.error("UH OH")
      throw new Error("We need PREFERENCES!!!!")
    }

    return  new FormControl('',
      [
        Validators.maxLength(this.prefs.POST_DESCRIPTION_MAX),
      ]);
  }
}
