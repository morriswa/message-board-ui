import { Component } from '@angular/core';
import {AuthService} from "@auth0/auth0-angular";
import {ThemeService} from "./service/theme.service";
import {MessageBoardClientService} from "./service/message-board-client.service";
import {of, switchMap, tap} from "rxjs";
import {ValidatorFactory} from "./service/validator.factory";
import {PreferencesService} from "./service/preferences.service";
import {UserUIProfile} from "./interface/user-profile";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'message-board-ui';

  /**
   * optional member to store User specific UI settings
   */
  USER_UI_PROFILE?: UserUIProfile;

  /**
   * indicates application's health status
   */
  READY = false;

  constructor(authService: AuthService,
              themes: ThemeService,
              client: MessageBoardClientService,
              prefs: PreferencesService,
              validators: ValidatorFactory) {
    // initialize preferences service
    prefs.init()
      // initialize Validator factory after preferences service
      .pipe(switchMap(()=>validators.init(prefs.preferences)))
    // ensure it is running correctly or do not load upp
    .subscribe({
      next: ()=> this.READY = true,
      error: () => this.READY = false
    });

    // listen to provided authentication observable
    authService.isAuthenticated$
      .pipe(
        switchMap(authenticated=>{
          // if the user is authenticated, fetch their UI profile
          if (authenticated) return client.getUIProfile();
          // else use the default
          return of({theme:"default"});
        })
      )
      .subscribe({
        next: (result: UserUIProfile) => {
          // assign app theme
          this.USER_UI_PROFILE = result;
          // and update
          themes.current = this.USER_UI_PROFILE.theme;
        },
        error: err=>{if (err.status===403) this.READY=false; }
      });
  }
}
