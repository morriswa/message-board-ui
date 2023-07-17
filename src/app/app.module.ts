import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';

import { environment } from 'src/environments/environment';
import {AuthHttpInterceptor, AuthModule, AuthService} from "@auth0/auth0-angular";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import { PostFeedComponent } from './components/post-feed/post-feed.component';
import { CommunityComponent } from './components/community/community.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { UserMenuComponent } from './components/user-menu/user-menu.component';
import {UserProfileService} from "./service/user-profile.service";
import { RegisterUserComponent } from './components/register-user/register-user.component';
import {APP_BASE_HREF} from "@angular/common";

const AUTH0_CONFIG = {
  domain: environment.auth.domain,
  clientId: environment.auth.clientId,
  authorizationParams: {
    audience: environment.auth.audience,
    scope: 'openid email profile develop:demo',
    redirect_uri: window.location.origin
  },
  // Specify configuration for the interceptor
  httpInterceptor: {
    allowedList: [
      { uri: environment.userProfileService + '*' },
      { uri: environment.communityService + '*' },
      { uri: environment.contentService + '*' },
    ]
  }
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PostFeedComponent,
    CommunityComponent,
    LandingPageComponent,
    UserMenuComponent,
    RegisterUserComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AuthModule.forRoot(AUTH0_CONFIG),
    AppRoutingModule,

  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true },
    // {provide: APP_BASE_HREF, useValue: '/messageboard'},
    AuthService,
    UserProfileService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
