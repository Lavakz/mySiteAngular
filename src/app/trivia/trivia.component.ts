import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import './trivia.js';

@Component({
  selector: 'app-trivia',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trivia.component.html',
  styleUrls: ['./trivia.component.sass']
})

export class TriviaComponent {
  constructor() {
    
  }
}

