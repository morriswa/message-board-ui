import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {CommunityComponent} from "./components/community/community.component";
import {LandingPageComponent} from "./components/landing-page/landing-page.component";


const routes: Routes = [
  { path: 'community',
    children: [
      { path: '**', component: CommunityComponent,}
    ]
  },
  { path: '', component: LandingPageComponent },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
