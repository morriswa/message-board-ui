import { Component } from '@angular/core';
import {MessageBoardClientService} from "../../service/message-board-client.service";
import {Router} from "@angular/router";
import {CommunityComponent} from "../community/community.component";

@Component({
  selector: 'app-create-community',
  templateUrl: './create-community.component.html',
  styleUrls: ['./create-community.component.scss']
})
export class CreateCommunityComponent {

  communityRefForm = CommunityComponent.communityRefForm;
  communityDisplayNameForm = CommunityComponent.communityDisplayNameForm

  constructor(private router: Router, private service: MessageBoardClientService) {
  }

  createCommunity() {
    this.service.createCommunity(
      this.communityRefForm.getRawValue()!,
      this.communityDisplayNameForm.getRawValue()!).subscribe(
      {
        next:()=>{
          this.router.navigateByUrl('community/'+this.communityRefForm.getRawValue()!);
        },
        error:err=>console.error(err)
      }
    )
  }

}
