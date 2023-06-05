import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// @ts-ignorek
import playWordGame from './WordGame.js';

@Component({
  selector: 'app-word-game',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div id="wordGameContainer">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width" />
        <title>Spelling Bee</title>
      </head>

      <h1 id="title">Spelling Bee</h1>
      <div id="game">
        <h2 id="textBox"></h2>
        <script src="script.js"></script>
        <div id="grid"></div>
      </div>
      <ul id="correctList"></ul>
    </div>
  `,
  styleUrls: ['./word-game.component.sass'],
})
export class WordGameComponent {
  ngOnInit() {
    const puzzle1 = {
      center: 'O',
      letters: ['W', 'H', 'M', 'T', 'A', 'K'],
      solutions: [
        'mohawk',
        'amok',
        'atom',
        'moat',
        'moth',
        'oath',
        'whoa',
        'whom',
        'hot',
        'how',
        'mow',
        'oak',
        'oat',
        'ohm',
        'who',
        'tow',
        'two',
        'wok',
        'ow',
        'oh',
        'ok',
        'at',
      ],
    };

    playWordGame(puzzle1);
  }
}
