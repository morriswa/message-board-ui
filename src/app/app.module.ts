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
import { RegisterUserComponent } from './components/register-user/register-user.component';
import {APP_BASE_HREF} from "@angular/common";
import {ImageCropperModule} from "ngx-image-cropper";
import { CreateCommunityComponent } from './components/create-community/create-community.component';
import { EditCommunityComponent } from './components/edit-community/edit-community.component';

const AUTH0_CONFIG = {
  domain: environment.auth.domain,
  clientId: environment.auth.clientId,
  authorizationParams: {
    audience: environment.auth.audience,
    scope: environment.auth.scopes,
    redirect_uri: window.location.origin
  },
  // Specify configuration for the interceptor
  httpInterceptor: {
    allowedList: [
      { uri: environment.userProfileService + '*' },
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
    RegisterUserComponent,
    CreateCommunityComponent,
    EditCommunityComponent
  ],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        AuthModule.forRoot(AUTH0_CONFIG),
        AppRoutingModule,
        ImageCropperModule,

    ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true },
    // {provide: APP_BASE_HREF, useValue: '/messageboard'},
    AuthService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
