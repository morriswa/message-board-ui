import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MessageBoardClientService} from "../../service/message-board-client.service";

@Component({
  selector: 'app-voting',
  templateUrl: './voting.component.html',
  styleUrls: ['./voting.component.scss']
})
export class VotingComponent {

  type: 'POST'|'COMMENT' = 'POST';
  @Input() id!: number;
  @Output() voteUpdated: EventEmitter<number> = new EventEmitter<number>();

  constructor(private service: MessageBoardClientService) {
  }

  vote_up() {
    let upvote = document.getElementById(`upvote-${this.id}`)!;
    upvote.classList.add('clicked-icon');
    let downvote = document.getElementById(`downvote-${this.id}`)!;
    downvote.classList.remove('clicked-icon');


    this.service.voteOnPost(this.id, "UPVOTE")
      .subscribe({
        next: (res:any)=>{
          console.log(res)
          this.voteUpdated.emit(res)
        },
        error: err=>console.error(err)
      })
  }

  vote_down() {
    let upvote = document.getElementById(`upvote-${this.id}`)!;
    upvote.classList.remove('clicked-icon');
    let downvote = document.getElementById(`downvote-${this.id}`)!;
    downvote.classList.add('clicked-icon');

    this.service.voteOnPost(this.id, "DOWNVOTE")
      .subscribe({
        next: (res:any)=>{
          if(res < 0){
            res = 0;
          }
          console.log(res)
          this.voteUpdated.emit(res)
        },
        error: err=>console.error(err)
      })
  }
}
