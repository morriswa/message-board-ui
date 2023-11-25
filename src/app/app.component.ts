import { Component } from '@angular/core';
import {AuthService} from "@auth0/auth0-angular";
import {ThemeService} from "./service/theme.service";
import {MessageBoardClientService} from "./service/message-board-client.service";
import {of, switchMap, tap} from "rxjs";
import {ValidatorFactory} from "./service/validator.factory";
import {PreferencesService} from "./service/preferences.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'message-board-ui';

  USER_UI_PROFILE?:any;
  HEALTHY = true;
  READY = false;

  constructor(authService: AuthService,
              themes: ThemeService,
              client: MessageBoardClientService,
              prefs: PreferencesService,
              validators: ValidatorFactory) {
    // initialize preferences service
    prefs.init()
      // initialize Validator factory with retrieved preferences
      .pipe(switchMap((res:any)=>validators.init(res)))
    // ensure it is running correctly or do not load upp
    .subscribe({
      next: ()=> this.READY = true,
      error: () => this.HEALTHY = false
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
        next: result => {
          // assign app theme
          this.USER_UI_PROFILE = result;
          // and update
          themes.current = this.USER_UI_PROFILE.theme;
        }
      });
  }
}
