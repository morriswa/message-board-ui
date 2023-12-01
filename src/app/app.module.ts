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
import {APP_BASE_HREF, NgOptimizedImage} from "@angular/common";
import {ImageCropperModule} from "ngx-image-cropper";
import { CreateCommunityComponent } from './components/community-tools/create-community/create-community.component';
import { EditCommunityComponent } from './components/community/edit-community/edit-community.component';
import { CreatePostComponent } from './components/community/create-post/create-post.component';
import { ImageUploadAndCropComponent } from './components/image-upload-and-crop/image-upload-and-crop.component';
import { CommunityToolsComponent } from './components/community-tools/community-tools.component';
import { CommunityHeaderComponent } from './components/community/community-header/community-header.component';
import { CommunityFeedComponent } from './components/community/community-feed/community-feed.component';
import {ThemeService} from "./service/theme.service";
import { VotingComponent } from './components/voting/voting.component';
import { SearchCommunityComponent } from './components/community-tools/search-community/search-community.component';
import {ValidatorFactory} from "./service/validator.factory";
import {MessageBoardClientService} from "./service/message-board-client.service";
import {PreferencesService} from "./service/preferences.service";
import { PostDetailsComponent } from './components/community/post-details/post-details.component';
import { CommentsComponent } from './components/community/comments/comments.component';
import { StaticErrorsComponent } from './components/static-errors/static-errors.component';

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
    CommunityToolsComponent,
    CommunityHeaderComponent,
    CommunityFeedComponent,
    VotingComponent,
    SearchCommunityComponent,
    PostDetailsComponent,
    CommentsComponent,
    StaticErrorsComponent
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
    ThemeService,
    MessageBoardClientService,
    PreferencesService,
    ValidatorFactory
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
