import { Component } from '@angular/core';
import {MessageBoardClientService} from "../../service/message-board-client.service";
import {FormControl, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-community',
  templateUrl: './create-community.component.html',
  styleUrls: ['./create-community.component.scss']
})
export class CreateCommunityComponent {

  communityRefForm = new FormControl('',
    [
      Validators.required,
      Validators.maxLength(30),
      Validators.minLength(3),
      Validators.pattern('^[a-zA-Z0-9-]*$')
    ])

  communityDisplayNameForm = new FormControl('',
    [
      Validators.required,
      Validators.maxLength(30),
      Validators.minLength(3),
    ])
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
