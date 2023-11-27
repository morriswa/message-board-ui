import { Component } from '@angular/core';
import {MessageBoardClientService} from "../../service/message-board-client.service";
import {Router} from "@angular/router";
import {CommunityResponse} from "../../interface/community";

@Component({
  selector: 'app-community-tools',
  templateUrl: './community-tools.component.html',
  styleUrls: ['./community-tools.component.scss']
})
export class CommunityToolsComponent {
  communities?: CommunityResponse[];

  constructor(service: MessageBoardClientService, router: Router) {
    service.getUsersCommunities().subscribe({
      next: res=>this.communities = res,
      error: (err: any) => {
        if (err.error.error === "NoRegisteredUserException") router.navigateByUrl("/registerUser");
      }
    });
  }
}
