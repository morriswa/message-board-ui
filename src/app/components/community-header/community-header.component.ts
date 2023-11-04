import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-community-header',
  templateUrl: './community-header.component.html',
  styleUrls: ['./community-header.component.scss']
})
export class CommunityHeaderComponent {
  @Input() communityInfo: any;
}
