import { Component } from '@angular/core';
import {MessageBoardClientService} from "../../service/message-board-client.service";

@Component({
  selector: 'app-community-navigation',
  templateUrl: './community-navigation.component.html',
  styleUrls: ['./community-navigation.component.scss']
})
export class CommunityNavigationComponent {
  communities: any[] = []

  constructor(service: MessageBoardClientService) {
    service.getUsersCommunities().subscribe({
      next: val => this.communities = val,
      error: err => console.error(err)
    });
  }
}
