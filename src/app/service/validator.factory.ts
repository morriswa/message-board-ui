import {FormControl, Validators} from "@angular/forms";
import {Injectable} from "@angular/core";
import {of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ValidatorFactory {

  private data?: any;

  init(prefs: any) {
    this.prefs = prefs;
    return of('successfully initialized Validator Factory Service!');
  }

  get prefs() {
    // if (!this.data) throw new Error("NEED APPLICATION PREFERENCES");
    return this.data;
  }

  set prefs(data: any) {
    // if (!data) throw new Error("NEED APPLICATION PREFERENCES");
    this.data = data;
  }

  getDisplayNameForm()  {
    return new FormControl('',
    [
      Validators.maxLength(this.prefs.DISPLAY_NAME_MAX),
      Validators.minLength(this.prefs.DISPLAY_NAME_MIN),
      Validators.pattern(this.prefs.DISPLAY_NAME_PATTERN)
    ]);
  }

  getCommunityRefForm() {
    return new FormControl('',
      [
        Validators.maxLength(this.prefs.COMMUNITY_REF_MAX),
        Validators.minLength(this.prefs.COMMUNITY_REF_MIN),
        Validators.pattern(this.prefs.COMMUNITY_REF_PATTERN)
      ]);
  }

  getCommunityDisplayNameForm(){
    return new FormControl('',
      [
        Validators.maxLength(this.prefs.COMMUNITY_NAME_MAX),
        Validators.minLength(this.prefs.COMMUNITY_NAME_MIN),
      ]);
  }

  getPostCaptionForm() {
    return new FormControl('',
      [
        Validators.maxLength(this.prefs.POST_CAPTION_MAX),
        Validators.minLength(this.prefs.POST_CAPTION_MIN),
      ]);
  }

  getPostDescriptionForm() {
    return  new FormControl('',
      [
        Validators.maxLength(this.prefs.POST_DESCRIPTION_MAX),
      ]);
  }
}
