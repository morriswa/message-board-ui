import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {CommunityComponent} from "./components/community/community.component";
import {LandingPageComponent} from "./components/landing-page/landing-page.component";
import {UserMenuComponent} from "./components/user-menu/user-menu.component";
import {RegisterUserComponent} from "./components/register-user/register-user.component";
import {CreateCommunityComponent} from "./components/create-community/create-community.component";
import {EditCommunityComponent} from "./components/edit-community/edit-community.component";
import {CreatePostComponent} from "./components/create-post/create-post.component";


const routes: Routes = [
  { path: 'communityTools',
    children: [
      { path: 'create', component: CreateCommunityComponent,},
    ]
  },
  { path: 'community/:communityId',
    children: [
      { path: 'edit', component: EditCommunityComponent,  },
      { path: 'post', component: CreatePostComponent, },
      { path: '', component: CommunityComponent, pathMatch: "full" }
    ]
  },
  { path: 'user', component: UserMenuComponent },
  { path: 'registerUser', component: RegisterUserComponent },
  { path: '', component: LandingPageComponent },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
