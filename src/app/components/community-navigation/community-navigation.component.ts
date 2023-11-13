import { Component } from '@angular/core';
import {MessageBoardClientService} from "../../service/message-board-client.service";
import {Observable, of} from "rxjs";

@Component({
  selector: 'app-community-navigation',
  templateUrl: './community-navigation.component.html',
  styleUrls: ['./community-navigation.component.scss']
})
export class CommunityNavigationComponent {
  communities$: Observable<any[]> = of([])

  constructor(service: MessageBoardClientService) {
    this.communities$ = service.getUsersCommunities();
  }
}
