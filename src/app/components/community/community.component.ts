import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.scss']
})
export class CommunityComponent {
  communityName?:string;
  constructor(private activeRoute: ActivatedRoute) {
    try {
      this.communityName=activeRoute.snapshot.url[0].path;
    } catch {}
  }



}
