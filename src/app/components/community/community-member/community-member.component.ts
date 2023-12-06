import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CurrentCommunityService } from '../current-community.service';
import { MessageBoardClientService } from 'src/app/service/message-board-client.service';
import { CommunityMember } from 'src/app/interface/community';

@Component({
  selector: 'app-community-member',
  templateUrl: './community-member.component.html',
  styleUrl: './community-member.component.scss'
})
export class CommunityMemberComponent {

  member?: CommunityMember;

  constructor(
        active: ActivatedRoute, 
        client: MessageBoardClientService,
        public current: CurrentCommunityService, ) {
    const userId = active.snapshot.params['userId'];

    client.getMember(current.id, userId).subscribe({
      next: (val: CommunityMember) => this.member=val
    });
  }

  get searchIsOwner(): boolean {
    return this.current.community.ownerId===this.member!.userId;
  }

}
