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
import {NgOptimizedImage} from "@angular/common";
import {ImageCropperModule} from "ngx-image-cropper";
import { CreateCommunityComponent } from './components/community-navigation/create-community/create-community.component';
import { EditCommunityComponent } from './components/community/edit-community/edit-community.component';
import { CreatePostComponent } from './components/community/create-post/create-post.component';
import { ImageUploadAndCropComponent } from './components/image-upload-and-crop/image-upload-and-crop.component';
import { CommunityNavigationComponent } from './components/community-navigation/community-navigation.component';
import { CommunityHeaderComponent } from './components/community/community-header/community-header.component';
import { CommunityFeedComponent } from './components/community/community-feed/community-feed.component';
import {ThemeService} from "./service/theme.service";
import { VotingComponent } from './components/voting/voting.component';
import { SearchCommunityComponent } from './components/community-navigation/search-community/search-community.component';

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
      { uri: `${environment.api.scheme}://${environment.api.path}/${environment.api.routes.secure}/*` },
    ]
  },
  cacheLocation: "localstorage" as const
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
    EditCommunityComponent,
    CreatePostComponent,
    ImageUploadAndCropComponent,
    CommunityNavigationComponent,
    CommunityHeaderComponent,
    CommunityFeedComponent,
    VotingComponent,
    SearchCommunityComponent,
  ],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        AuthModule.forRoot(AUTH0_CONFIG),
        AppRoutingModule,
        ImageCropperModule,
        NgOptimizedImage,

    ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true },
    // {provide: APP_BASE_HREF, useValue: '/messageboard'},
    AuthService,
    ThemeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
