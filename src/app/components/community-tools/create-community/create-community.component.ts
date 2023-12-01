import {Component, EventEmitter, OnInit} from '@angular/core';
import {MessageBoardClientService} from "../../../service/message-board-client.service";
import {Router} from "@angular/router";
import {StaticWarning, ValidatorFactory} from "../../../service/validator.factory";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-create-community',
  templateUrl: './create-community.component.html',
  styleUrls: ['./create-community.component.scss']
})
export class CreateCommunityComponent implements OnInit {

  communityRefForm: FormControl;
  communityDisplayNameForm: FormControl;
  communityRefFormWarnings: StaticWarning;
  communityDisplayNameFormWarnings: StaticWarning;

  serverErrorHandler: EventEmitter<any> = new EventEmitter();

  preferences: any;

  constructor(
    validatorFactory: ValidatorFactory,
    private router: Router, 
    private service: MessageBoardClientService) {
    this.communityRefForm = validatorFactory.getCommunityRefForm();
    this.communityRefFormWarnings = validatorFactory.getCommunityRefFormWarnings();

    this.communityDisplayNameForm = validatorFactory.getCommunityDisplayNameForm();
    this.communityDisplayNameFormWarnings = validatorFactory.getCommunityDisplayNameFormWarnings();

    this.preferences = validatorFactory.getAllPreferences()
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
        error:(response:any)=>{
          if (response.error.error === "ValidationException")
            for (let error of response.error.stack) {
              this.serverErrorHandler.emit(error.message);
            }
          else this.serverErrorHandler.emit(response.error.description);
        }
      }
    )
  }

  ngOnInit(): void {
    this.communityRefForm.reset();
    this.communityDisplayNameForm.reset();
  }
}
