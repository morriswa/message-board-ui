import { Component } from '@angular/core';
import {MessageBoardClientService} from "../../service/message-board-client.service";
import {Observable, of} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-community-navigation',
  templateUrl: './community-navigation.component.html',
  styleUrls: ['./community-navigation.component.scss']
})
export class CommunityNavigationComponent {

  loading = true;
  communities$: Observable<any[]> = of([])

  constructor(service: MessageBoardClientService, router: Router) {
    this.communities$ = service.getUsersCommunities();
    this.communities$.subscribe({
      next: ()=>this.loading=false,
      error: (err: any) => {
        if (err.error.error === "NoRegisteredUserException") router.navigateByUrl("/registerUser");
      }
    });
  }
}
