import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// @ts-ignorek
import playWordGame from './WordGame.js'; 

@Component({
  selector: 'app-word-game',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './word-game.component.html',
  styleUrls: ['./word-game.component.sass']
})
export class WordGameComponent {
  ngOnInit() {
    const puzzle1 = {
      center: 'O',
      letters: ["W", "H", "M", "T", "A", "K"],
      solutions: ["mohawk", "amok", "atom", "moat", "moth", "oath", "whoa", "whom", "hot", "how",
        "mow", "oak", "oat", "ohm", "who", "tow", "two", "wok", "ow", "oh", "ok", "at"
      ]
    };
  
    playWordGame(puzzle1);
  }
}
