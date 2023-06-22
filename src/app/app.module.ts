import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';

import { environment } from 'src/environments/environment';
import {AuthHttpInterceptor, AuthModule, AuthService} from "@auth0/auth0-angular";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import { PostFeedComponent } from './components/post-feed/post-feed.component';
import { CommunityComponent } from './components/community/community.component';
import {RouterModule} from "@angular/router";
import { LandingPageComponent } from './components/landing-page/landing-page.component';

const AUTH0_CONFIG = {
  domain: environment.auth.domain,
  clientId: environment.auth.clientId,
  authorizationParams: {
    audience: environment.auth.audience,
    scope: 'openid email profile develop:demouser',
    redirect_uri: window.location.origin
  },
  // Specify configuration for the interceptor
  httpInterceptor: {
    allowedList: [{ uri: environment.api + environment.securepath + '*' },]
  }
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PostFeedComponent,
    CommunityComponent,
    LandingPageComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AuthModule.forRoot(AUTH0_CONFIG),
    AppRoutingModule,
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true },
    AuthService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
