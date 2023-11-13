import { Component } from '@angular/core';
import {AuthService} from "@auth0/auth0-angular";
import {Observable} from "rxjs";
import {ThemeService} from "../../service/theme.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  authenticated$:Observable<boolean>;

  constructor(private authService: AuthService, private themeservice: ThemeService) {
    this.authenticated$ = authService.isAuthenticated$;
  }

  login() {
    this.authService.loginWithRedirect({

    })
  }

  register() {
    this.authService.loginWithRedirect({
      appState: {
        target: '/registerUser'
      }
    })
  }

  logout() {
    this.authService.logout()
  }

  switchMode() {
    this.themeservice.current = this.themeservice.current==='dark-mode'?'default':'dark-mode'
  }
}
