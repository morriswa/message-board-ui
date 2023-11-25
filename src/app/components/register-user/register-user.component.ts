import {Component, OnInit} from '@angular/core';
import {map, switchMap} from "rxjs";
import {AuthService} from "@auth0/auth0-angular";
import {Router} from "@angular/router";
import {MessageBoardClientService} from "../../service/message-board-client.service";
import {ValidatorFactory} from "../../service/validator.factory";
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

  constructor(private auth: AuthService,
              private router: Router,
              private messageBoardService: MessageBoardClientService,
              validatorFactory: ValidatorFactory) {
    this.displayNameForm = validatorFactory.getDisplayNameForm()
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
    this.messageBoardService.registerUser(this.displayNameForm.getRawValue()!)
      .subscribe({
        next: ()=>this.router.navigate(['/user']),
        error: er=>console.error(er)
      })
  }

}
