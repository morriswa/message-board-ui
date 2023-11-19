import { Component } from '@angular/core';
import {MessageBoardClientService} from "../../service/message-board-client.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-community-navigation',
  templateUrl: './community-navigation.component.html',
  styleUrls: ['./community-navigation.component.scss']
})
export class CommunityNavigationComponent {
  communities?: any[];

  constructor(service: MessageBoardClientService, router: Router) {
    service.getUsersCommunities().subscribe({
      next: (res:any)=>this.communities = res,
      error: (err: any) => {
        if (err.error.error === "NoRegisteredUserException") router.navigateByUrl("/registerUser");
      }
    });
  }
}
