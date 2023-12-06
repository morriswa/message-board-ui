// NG
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";

// DEPS
import {AuthHttpInterceptor, AuthModule, AuthService} from "@auth0/auth0-angular";
import {ImageCropperModule} from "ngx-image-cropper";
import {NgbCarouselModule} from '@ng-bootstrap/ng-bootstrap'

// APP
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { environment } from 'src/environments/environment';

// PROVIDED
import { PreferencesService } from "./service/preferences.service";
import { ValidatorFactory } from "./service/validator.factory";
import { ThemeService } from "./service/theme.service";
import { MessageBoardClientService } from "./service/message-board-client.service";

// COMPONENT
import { HeaderComponent } from './components/header/header.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { UserMenuComponent } from './components/user-menu/user-menu.component';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { PostFeedComponent } from './components/post-feed/post-feed.component';
import { ImageUploadAndCropComponent } from './components/image-upload-and-crop/image-upload-and-crop.component';
import { VotingComponent } from './components/voting/voting.component';

// ERROR
import { StaticErrorsComponent } from './components/static-errors/static-errors.component';
import { ServerErrorsComponent } from './components/server-errors/server-errors.component';

  // COMMUNITY TOOL COMPONENTS
  import { CommunityToolsComponent } from './components/community-tools/community-tools.component';
  import { CreateCommunityComponent } from './components/community-tools/create-community/create-community.component';
  import { SearchCommunityComponent } from './components/community-tools/search-community/search-community.component';

  // COMMUNITY COMPONENTS
  import { CommunityComponent } from './components/community/community.component';
  import { PostDetailsComponent } from './components/community/post-details/post-details.component';
  import { CommentsComponent } from './components/community/comments/comments.component';
  import { EditCommunityComponent } from './components/community/edit-community/edit-community.component';
  import { CreatePostComponent } from './components/community/create-post/create-post.component';
  import { CommunityHeaderComponent } from './components/community/community-header/community-header.component';
  import { CommunityFeedComponent } from './components/community/community-feed/community-feed.component';
  import { CommunityMemberComponent } from './components/community/community-member/community-member.component';

  

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
    CommunityMemberComponent,
    VotingComponent,
    SearchCommunityComponent,
    PostDetailsComponent,
    CommentsComponent,
    StaticErrorsComponent,
    ServerErrorsComponent,
  ],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        AuthModule.forRoot(AUTH0_CONFIG),
        AppRoutingModule,
        ImageCropperModule,
        NgbCarouselModule,
    ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true },
    AuthService,
    ThemeService,
    MessageBoardClientService,
    PreferencesService,
    ValidatorFactory
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
