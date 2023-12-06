import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CurrentCommunityService } from '../current-community.service';
import { MessageBoardClientService } from 'src/app/service/message-board-client.service';
import { CommunityMember } from 'src/app/interface/community';

@Component({
  selector: 'app-community-member',
  templateUrl: './community-member.component.html',
  styleUrl: './community-member.component.scss'
})
export class CommunityMemberComponent {

  userId:string;

  member?: CommunityMember;
  MODS = ['PROMOTE_MOD', 'EDIT_MOD', 'CONTENT_MOD', 'COMMENT_MOD', 'NONE']
  SELECTED_MOD?: string;

  constructor(
        active: ActivatedRoute, 
        private router: Router,
        private client: MessageBoardClientService,
        public current: CurrentCommunityService, ) {
    this.userId = active.snapshot.params['userId'];

    this.refreshMember();
  }

  refreshMember() {
    this.client.getMember(this.current.id, this.userId).subscribe({
      next: (val: CommunityMember) => {
        this.SELECTED_MOD = undefined;
        this.member=val;
      },
      error: ()=>this.router.navigate(['/community',this.current.locator])
    });
  }

  get searchIsOwner(): boolean {
    return this.current.community.ownerId===this.member!.userId;
  }

  onChange($event: any) {
    this.SELECTED_MOD = $event.target.value;
  }

  updatePermissions() {
    this.client.updateModStatus(this.current.id, this.userId, this.SELECTED_MOD!).subscribe({
      next: ()=>this.refreshMember()
    });
  }
    
}
