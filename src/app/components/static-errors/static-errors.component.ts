import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-static-errors',
  templateUrl: './static-errors.component.html',
  styleUrl: './static-errors.component.scss'
})
export class StaticErrorsComponent {
  @Input() WARNINGS: any[] = [];

}
