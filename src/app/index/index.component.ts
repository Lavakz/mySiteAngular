import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TriviaComponent } from '../trivia/trivia.component';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [CommonModule, RouterLink, TriviaComponent],
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.sass']
})
export class IndexComponent {}