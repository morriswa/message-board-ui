import {Component, OnInit} from '@angular/core';
import {ValidatorFactory} from "../../../service/validator.factory";
import {MessageBoardClientService} from "../../../service/message-board-client.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-search-community',
  templateUrl: './search-community.component.html',
  styleUrls: ['./search-community.component.scss']
})
export class SearchCommunityComponent implements OnInit {
  communityDisplayNameForm;
  communities?: any;

  constructor(private service: MessageBoardClientService, router: Router, validatorFactory: ValidatorFactory) {
    this.communityDisplayNameForm = validatorFactory.getCommunityDisplayNameForm();
  }

  searchForCommunity($event:any) {
    this.service.searchCommunities($event.target.value).subscribe({
      next: (res:any)=>this.communities = res
    });
  }

  ngOnInit(): void {
    this.communityDisplayNameForm.reset();
  }

}
