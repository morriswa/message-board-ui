import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MessageBoardClientService} from "../../service/message-board-client.service";

@Component({
  selector: 'app-voting',
  templateUrl: './voting.component.html',
  styleUrls: ['./voting.component.scss']
})
export class VotingComponent {

  get id() {
    return `${this.postId!}---${this.commentId!}`;
  }

  @Input() type: 'POST'|'COMMENT' = 'POST';
  @Input() postId!: number;
  @Input() commentId?: number;
  @Output() voteUpdated: EventEmitter<number> = new EventEmitter<number>();

  constructor(private service: MessageBoardClientService) {
  }

  vote_up() {
    let upvote = document.getElementById(`upvote-${this.id}`)!;
    upvote.classList.add('clicked-icon');
    let downvote = document.getElementById(`downvote-${this.id}`)!;
    downvote.classList.remove('clicked-icon');


    if (this.type === 'COMMENT')
      this.service.voteOnComment(this.postId, this.commentId!,"UPVOTE")
        .subscribe({
          next: (res:number)=>this.voteUpdated.emit(res),
          error: err=>console.error(err)
        });
    else
      this.service.voteOnPost(this.postId, "UPVOTE")
        .subscribe({
          next: (res:number)=>this.voteUpdated.emit(res),
          error: err=>console.error(err)
        });
  }

  vote_down() {
    let upvote = document.getElementById(`upvote-${this.id}`)!;
    upvote.classList.remove('clicked-icon');
    let downvote = document.getElementById(`downvote-${this.id}`)!;
    downvote.classList.add('clicked-icon');


    if (this.type === 'COMMENT')
      this.service.voteOnComment(this.postId, this.commentId!,"DOWNVOTE")
        .subscribe({
          next: (res:number)=>this.voteUpdated.emit(res),
          error: err=>console.error(err)
        });
    else
      this.service.voteOnPost(this.postId, "DOWNVOTE")
        .subscribe({
          next: (res:number)=>this.voteUpdated.emit(res),
          error: err=>console.error(err)
        });
  }
}
