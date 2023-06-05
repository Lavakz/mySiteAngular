import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

//@ts-ignore
import { getCategories, start } from './trivia.js';

@Component({
  selector: 'app-trivia',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trivia.component.html',
  styleUrls: ['./trivia.component.sass']
})

export class TriviaComponent {
  ngOnInit() {
    getCategories();
  }
  startTrivia() {
    start();
  }
}

