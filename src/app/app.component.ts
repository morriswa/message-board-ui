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

  constructor(authService: AuthService, themeservice: ThemeService, client: MessageBoardClientService) {
    let authenticated$ = authService.isAuthenticated$;
    authenticated$
      .pipe(
        switchMap(res=>{
          if (res) {
            return client.getUIProfile();
          }
          return of({theme:"default"});
        })
      )
      .subscribe(result=>{
        themeservice.current = result.theme;
      })
  }
}
