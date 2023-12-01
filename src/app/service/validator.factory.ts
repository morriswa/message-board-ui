import {FormControl, Validators} from "@angular/forms";
import {Injectable} from "@angular/core";
import {of} from "rxjs";
import { c_str } from "../Functions";

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
      min: c_str('Username is required and must be longer than {} characters.',this.preferences.DISPLAY_NAME_MIN - 1),
      max: c_str('Username must be no longer than than {} characters!',this.preferences.DISPLAY_NAME_MAX),
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
      min: c_str("Community Locator must be at least {} characters!", this.preferences.COMMUNITY_REF_MIN),
      max: c_str("Community Locator must be no longer than than {} characters!", this.preferences.COMMUNITY_REF_MAX),
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
      min:c_str("Community Display Name must be longer than {} characters!", this.preferences.COMMUNITY_NAME_MIN - 1),
      max:c_str("Community Display Name must be no longer than than {} characters!", this.preferences.COMMUNITY_NAME_MAX)
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
      min: c_str("Caption is required, and must be at least {} characters.", this.preferences.POST_CAPTION_MIN),
      max: c_str("Caption must be no longer than than {} characters!", this.preferences.POST_CAPTION_MAX)
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
      max: c_str("Post description must be no longer than than {} characters!", this.preferences.POST_DESCRIPTION_MAX)
    }
  }
}
