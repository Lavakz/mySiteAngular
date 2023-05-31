import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodeMenuComponent } from './code-menu/code-menu.component';
import { TriviaComponent } from './trivia/trivia.component';
import { AppComponent } from '../app.component';
import { WordGameComponent } from './word-game/word-game.component';
import { SpaceRaceGameComponent } from './space-race-game/space-race-game.component';

@Component({
  selector: 'app-code',
  standalone: true,
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.sass'],
  imports: [
    CommonModule,
    CodeMenuComponent,
    TriviaComponent,
    WordGameComponent,
    SpaceRaceGameComponent,
  ],
})
export class CodeComponent {
  codeMenuOpen = false;
  displayedProject = 'Choose a Project';
  constructor(private _parent: AppComponent) {
    this._parent.backButtonVisible = true;
  }
  changeDisplayedProject(selection: string) {
    this.codeMenuOpen = false;
    this.displayedProject = selection;
  }
}
