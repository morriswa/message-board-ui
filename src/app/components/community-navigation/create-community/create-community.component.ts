import { Component } from '@angular/core';
import {MessageBoardClientService} from "../../../service/message-board-client.service";
import {Router} from "@angular/router";
import {Utils} from "../../../Utils";

@Component({
  selector: 'app-create-community',
  templateUrl: './create-community.component.html',
  styleUrls: ['./create-community.component.scss']
})
export class CreateCommunityComponent {

  communityRefForm = Utils.communityRefForm;
  communityDisplayNameForm = Utils.communityDisplayNameForm

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
