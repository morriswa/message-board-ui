import {Component, EventEmitter, OnInit} from '@angular/core';
import {map, switchMap} from "rxjs";
import {AuthService} from "@auth0/auth0-angular";
import {Router} from "@angular/router";
import {MessageBoardClientService} from "../../service/message-board-client.service";
import {StaticWarning, ValidatorFactory} from "../../service/validator.factory";
import {FormControl} from "@angular/forms";




@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit{
  loading = true;

  email?:string;


  displayNameForm: FormControl;
  displayNameFormWarnings: StaticWarning;

  serverErrorHandler: EventEmitter<any> = new EventEmitter();
  preferences: any;




  birthdateForm: FormControl<any> = new FormControl;


  constructor(validatorFactory: ValidatorFactory,
              private auth: AuthService,
              private router: Router,
              private messageBoardService: MessageBoardClientService) {
    this.displayNameForm = validatorFactory.getDisplayNameForm();
    this.displayNameFormWarnings = validatorFactory.getDisplayNameFormWarnings();
    this.preferences = validatorFactory.getAllPreferences();
  }

  ngOnInit(): void {
    this.auth.user$.pipe(
      map(user=>{
        if (!user)
          this.auth.loginWithRedirect({ appState: { target: '/' }})
        else
          this.email = user.email;

        return user!;
      }),
      switchMap(()=>{
        return this.messageBoardService.getUserProfile()
      })
    )
    .subscribe({
      next: ()=>this.router.navigate(['/user']),
      error: ()=>this.loading=false
    });
  }

  registerUser() {
    const birthday: string = `${this.birthdateForm.value.year}-${this.birthdateForm.value.month}-${this.birthdateForm.value.day}`
    this.messageBoardService.registerUser(this.displayNameForm.value, birthday)
      .subscribe({
        next: ()=>this.router.navigate(['/user']),
        error: (response:any)=>{
          if (response.error.error === "ValidationException")
            for (let error of response.error.stack) {
              this.serverErrorHandler.emit(error.message);
            }
          else this.serverErrorHandler.emit(response.error.description);
        }
      });
  }
}
