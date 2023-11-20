import { Component } from '@angular/core';
import {AuthService} from "@auth0/auth0-angular";
import {ThemeService} from "./service/theme.service";
import {MessageBoardClientService} from "./service/message-board-client.service";
import {of, switchMap} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'message-board-ui';

  USER_UI_PROFILE?:any;
  SERVER_REFUSED_TO_RESPOND = false;

  constructor(authService: AuthService, themes: ThemeService, client: MessageBoardClientService) {
    let authenticated$ = authService.isAuthenticated$;
    client.isHealthy().pipe(
        switchMap(()=>authenticated$),
        switchMap(authenticated=>{
          if (authenticated) return client.getUIProfile();
          return of({theme:"default"});
        })
      )
      .subscribe({
        next: result => {
          this.USER_UI_PROFILE = result;
          themes.current = this.USER_UI_PROFILE.theme;
        }, error: err => {
          this.SERVER_REFUSED_TO_RESPOND = true;
        }
      });
  }
}
