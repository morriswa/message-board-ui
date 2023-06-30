import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {max} from "rxjs";
import {AuthService} from "@auth0/auth0-angular";
import {Router} from "@angular/router";
import {UserProfileService} from "../../service/user-profile.service";

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit{
  loading = true;

  email?:string;

  displayNameForm = new FormControl('',[
    Validators.required,
    Validators.maxLength(30),
    Validators.minLength(3),
    Validators.pattern('^[a-zA-Z0-9._-]*$')
  ])

  constructor(private auth: AuthService,
              private router: Router,
              private users: UserProfileService) { }

  ngOnInit(): void {
    this.auth.user$.subscribe(user=>{
      if (!user) {
        console.log('Please authenticate with Auth0 before registering a user');
        this.router.navigate(['/']);
      } else {
        this.email = user.email;
        console.log('retrieved user email from auth0: ' + this.email);
      }

      this.loading = false;
    })
  }

  registerUser() {
    this.users.registerUser(this.email!, this.displayNameForm.getRawValue()!)
      .subscribe({
        next: ()=>this.router.navigate(['/user']),
        error: er=>console.error(er)
      })
  }
}
