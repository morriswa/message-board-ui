import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-server-errors',
  templateUrl: './server-errors.component.html',
  styleUrl: './server-errors.component.scss'
})
export class ServerErrorsComponent implements OnInit{

  ERROR_MESSAGES: {message: string, show: boolean}[] = []; 

  @Input() serverErrorHandler = new EventEmitter<string>();

  ngOnInit(): void {
    this.serverErrorHandler.subscribe({
      next: (val:string) => this.ERROR_MESSAGES.push({message: val, show: true})
    })
  }

  hideError(i: number) {
    this.ERROR_MESSAGES[i].show = false;
  }
  
}
