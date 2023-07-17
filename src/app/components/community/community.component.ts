import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CommunityService} from "../../service/community.service";
import {ContentService} from "../../service/content.service";

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.scss']
})
export class CommunityComponent {

  loading = true;

  communityName?:string;
  communityInfo:any;
  constructor(private activeRoute: ActivatedRoute,
              private router: Router,
              private community: CommunityService,
              private content: ContentService) {
    try {
      this.communityName=activeRoute.snapshot.url[0].path;

      this.community.getCommunityInfo(this.communityName)
        .subscribe({
          next: payload=>{
            console.log(payload)
            this.communityInfo = payload;
            this.loading = false;
          },
          error: ()=>router.navigate(['/'])
        })

    } catch {}
  }





}
