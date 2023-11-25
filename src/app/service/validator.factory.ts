import {FormControl, Validators} from "@angular/forms";
import {Injectable} from "@angular/core";
import {of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ValidatorFactory {

  init(prefs: any) {
    this.prefs = prefs;
    return of('validator-factory initialized');
  }

  private data?: any;

  private get preferences() {
    if (!this.data) throw new Error("VALIDATOR FACTORY HAS NOT BEEN INITIALIZED");
    return this.data;
  }

  private set prefs(data: any) {
    if (!data) throw new Error("VALIDATOR FACTORY HAS NOT BEEN INITIALIZED");
    this.data = data;
  }

  getDisplayNameForm()  {
    return new FormControl('',
    [
      Validators.maxLength(this.preferences.DISPLAY_NAME_MAX),
      Validators.minLength(this.preferences.DISPLAY_NAME_MIN),
      Validators.pattern(this.preferences.DISPLAY_NAME_PATTERN)
    ]);
  }

  getCommunityRefForm() {
    return new FormControl('',
      [
        Validators.maxLength(this.preferences.COMMUNITY_REF_MAX),
        Validators.minLength(this.preferences.COMMUNITY_REF_MIN),
        Validators.pattern(this.preferences.COMMUNITY_REF_PATTERN)
      ]);
  }

  getCommunityDisplayNameForm(){
    return new FormControl('',
      [
        Validators.maxLength(this.preferences.COMMUNITY_NAME_MAX),
        Validators.minLength(this.preferences.COMMUNITY_NAME_MIN),
      ]);
  }

  getPostCaptionForm() {
    return new FormControl('',
      [
        Validators.maxLength(this.preferences.POST_CAPTION_MAX),
        Validators.minLength(this.preferences.POST_CAPTION_MIN),
      ]);
  }

  getPostDescriptionForm() {
    return  new FormControl('',
      [
        Validators.maxLength(this.preferences.POST_DESCRIPTION_MAX),
      ]);
  }
}
