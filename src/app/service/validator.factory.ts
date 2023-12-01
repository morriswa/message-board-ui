import {FormControl, Validators} from "@angular/forms";
import {Injectable} from "@angular/core";
import {of} from "rxjs";

export interface StaticWarning {
  min?: string,
  max?: string,
  pattern?: string
}

@Injectable({
  providedIn: 'root'
})
export class ValidatorFactory {
  getAllPreferences(): any {
    return this.preferences; 
  }
 

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

  getDisplayNameFormWarnings(): StaticWarning {
    return {
      min: `Username is required and must be longer than ${this.preferences.DISPLAY_NAME_MIN - 1} characters.`,
      max: `Username must be no longer than than ${this.preferences.DISPLAY_NAME_MAX} characters!`,
      pattern: 'Username must contain only letters (upper and lower case, A-Z, a-z) , numbers (0-9) , hyphens (-) , and underscores (_)'
    }
  }

  getCommunityRefForm(): FormControl {
    return new FormControl('',
      [
        Validators.maxLength(this.preferences.COMMUNITY_REF_MAX),
        Validators.minLength(this.preferences.COMMUNITY_REF_MIN),
        Validators.pattern(this.preferences.COMMUNITY_REF_PATTERN)
      ]);
  }

  getCommunityRefFormWarnings(): StaticWarning {
    return {
      pattern:`Community Locator must... <br>
        <ul>
          <li>only contain lowercase letters (a-z) , numbers (0-9) , and hyphens (-)</li>
          <li>Locator must not begin or end with a hyphen (-)</li>
          <li>Locator must not begin with a number (0-9)</li>
        </ul>
      `,
      min:`Community Locator must be at least ${this.preferences.COMMUNITY_REF_MIN} characters!`,
      max:`Community Locator must be no longer than than ${this.preferences.COMMUNITY_REF_MAX} characters!`,
    }
  }

  getCommunityDisplayNameForm(): FormControl {
    return new FormControl('',
      [
        Validators.maxLength(this.preferences.COMMUNITY_NAME_MAX),
        Validators.minLength(this.preferences.COMMUNITY_NAME_MIN),
      ]);
  }

  getCommunityDisplayNameFormWarnings():StaticWarning {
    return {
      min:`Community Display Name must be longer than ${this.preferences.COMMUNITY_NAME_MIN - 1} characters!`,
      max:`Community Display Name must be no longer than than ${this.preferences.COMMUNITY_NAME_MAX} characters!`
    }
  }

  getPostCaptionForm(): FormControl {
    return new FormControl('',
      [
        Validators.maxLength(this.preferences.POST_CAPTION_MAX),
        Validators.minLength(this.preferences.POST_CAPTION_MIN),
      ]);
  }

  getPostCaptionFormWarnings(): StaticWarning {
    return {
      min: `Caption is required, and must be at least ${this.preferences.POST_CAPTION_MIN} characters.`,
      max: `Caption must be no longer than than ${this.preferences.POST_CAPTION_MAX} characters!`
    }
  }

  getPostDescriptionForm(): FormControl {
    return  new FormControl('',
      [
        Validators.maxLength(this.preferences.POST_DESCRIPTION_MAX),
      ]);
  }

  getPostDescriptionFormWarnings(): StaticWarning {
    return {
      max: `Post description must be no longer than than ${this.preferences.POST_DESCRIPTION_MAX} characters!`
    }
  }
}
