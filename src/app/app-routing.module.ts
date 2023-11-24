import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {CommunityComponent} from "./components/community/community.component";
import {LandingPageComponent} from "./components/landing-page/landing-page.component";
import {UserMenuComponent} from "./components/user-menu/user-menu.component";
import {RegisterUserComponent} from "./components/register-user/register-user.component";
import {CreateCommunityComponent} from "./components/community-tools/create-community/create-community.component";
import {EditCommunityComponent} from "./components/community/edit-community/edit-community.component";
import {CreatePostComponent} from "./components/community/create-post/create-post.component";
import {CommunityToolsComponent} from "./components/community-tools/community-tools.component";
import {CommunityFeedComponent} from "./components/community/community-feed/community-feed.component";
import {PostDetailsComponent} from "./components/community/post-details/post-details.component";


const routes: Routes = [
  { path: 'communityTools/create',component: CreateCommunityComponent, },
  { path: 'communityTools',component: CommunityToolsComponent, },
  { path: 'community/:communityId', component: CommunityComponent,
    children: [
      { path: 'edit', component: EditCommunityComponent,  },
      { path: 'post/:postId', component: PostDetailsComponent, },
      { path: 'post', component: CreatePostComponent, },
      { path: '', component: CommunityFeedComponent, pathMatch: "full" }
    ]
  },
  { path: 'user', component: UserMenuComponent },
  { path: 'registerUser', component: RegisterUserComponent },
  { path: '', component: LandingPageComponent },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { onSameUrlNavigation: "ignore" })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
