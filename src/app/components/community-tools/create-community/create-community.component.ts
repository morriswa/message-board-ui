import {Component, OnInit} from '@angular/core';
import {MessageBoardClientService} from "../../../service/message-board-client.service";
import {Router} from "@angular/router";
import {ValidatorFactory} from "../../../service/validator.factory";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-create-community',
  templateUrl: './create-community.component.html',
  styleUrls: ['./create-community.component.scss']
})
export class CreateCommunityComponent implements OnInit {

  communityRefForm: FormControl;
  communityDisplayNameForm: FormControl;

  constructor(private router: Router, private service: MessageBoardClientService, validatorFactory: ValidatorFactory) {
    this.communityRefForm = validatorFactory.getCommunityRefForm();
    this.communityDisplayNameForm = validatorFactory.getCommunityDisplayNameForm();
  }

  createCommunity() {
    this.service.createCommunity(
      this.communityRefForm.getRawValue()!,
      this.communityDisplayNameForm.getRawValue()!).subscribe(
      {
        next:()=>{
          const newCommunity = this.communityRefForm.getRawValue()!
          this.communityRefForm.reset();
          this.communityDisplayNameForm.reset();
          this.router.navigate(['/community',newCommunity]);
        },
        error:err=>console.error(err)
      }
    )
  }

  ngOnInit(): void {
    this.communityRefForm.reset();
    this.communityDisplayNameForm.reset();
  }

}
