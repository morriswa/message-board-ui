import { Component } from '@angular/core';
import {Utils} from "../../../Utils";
import {MessageBoardClientService} from "../../../service/message-board-client.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-search-community',
  templateUrl: './search-community.component.html',
  styleUrls: ['./search-community.component.scss']
})
export class SearchCommunityComponent {
  communityDisplayNameForm = Utils.communityDisplayNameForm;
  communities?: any;

  constructor(private service: MessageBoardClientService, router: Router) {

  }

  searchForCommunity($event:any) {
    this.service.searchCommunity($event.target.value).subscribe({
      next: (res:any)=>this.communities = res
    });
  }

}
