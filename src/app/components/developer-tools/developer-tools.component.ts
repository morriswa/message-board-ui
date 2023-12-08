import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-developer-tools',
  templateUrl: './developer-tools.component.html',
  styleUrl: './developer-tools.component.scss'
})
export class DeveloperToolsComponent {
  accessToken?:string;

  constructor(auth: AuthService, router: Router) {
    auth.idTokenClaims$.pipe(
      switchMap((res:any)=>{
        if (!(res.rolly as any[]).includes("messageboard:tester"))
        throw new Error("User missing required scope!");
        else return auth.getAccessTokenSilently();
      })
    )
    .subscribe({
      next: (accessToken:string)=>this.accessToken=accessToken,
      error: ()=>router.navigate(['/'])
    });
  }
}
