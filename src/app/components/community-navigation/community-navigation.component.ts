import { Component } from '@angular/core';
import {MessageBoardClientService} from "../../service/message-board-client.service";

@Component({
  selector: 'app-community-navigation',
  templateUrl: './community-navigation.component.html',
  styleUrls: ['./community-navigation.component.scss']
})
export class CommunityNavigationComponent {
  communities: any[] = []

  constructor(private service: MessageBoardClientService) {
    service.getUsersCommunities().subscribe({
      next: (value:any) => {
        this.communities = value.payload
      },
      error: err => console.error(err)
    })

  }
}
