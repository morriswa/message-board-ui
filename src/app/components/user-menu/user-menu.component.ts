import {Component, OnInit} from '@angular/core';
import {AuthService} from "@auth0/auth0-angular";
import {UserProfileService} from "../../service/user-profile.service";
import {Router} from "@angular/router";
import {Observable, of} from "rxjs";

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit {
  loading = true

  userProfile$:Observable<any>=of();

  constructor(private auth: AuthService,
              private users: UserProfileService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.userProfile$ = this.users.getUserProfile();
    this.userProfile$
      .subscribe({
        next: user=>{
          console.log(user);
          this.loading = false;
        },
        error: err=>{
          console.error(err)
          this.router.navigate(['/'])
        }
      })
  }

}
