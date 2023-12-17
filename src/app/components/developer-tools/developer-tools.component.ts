import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { switchMap, tap } from 'rxjs';
import { MessageBoardClientService } from 'src/app/service/message-board-client.service';

@Component({
  selector: 'app-developer-tools',
  templateUrl: './developer-tools.component.html',
  styleUrl: './developer-tools.component.scss'
})
export class DeveloperToolsComponent {
  accessToken?:string;

  constructor(client: MessageBoardClientService, router: Router, auth: AuthService) {
    client.developer().pipe(
      switchMap(()=>auth.getAccessTokenSilently())
    )
    .subscribe({
      next: (response:any)=>this.accessToken=response,
      error: ()=>router.navigate(['/'])
    });
  }
}
