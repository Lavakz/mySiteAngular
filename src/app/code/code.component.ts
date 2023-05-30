import { Component  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodeMenuComponent } from './code-menu/code-menu.component';
import { TriviaComponent } from './trivia/trivia.component';
import { AppComponent } from '../app.component';
import { WordGameComponent } from './word-game/word-game.component';

@Component({
  selector: 'app-code',
  standalone: true,
  imports: [CommonModule, CodeMenuComponent, TriviaComponent, WordGameComponent],
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.sass']
})
export class CodeComponent {
    codeMenuOpen = false;
    displayedProject = 'Select a Project';
    constructor(private _parent: AppComponent) { this._parent.backButtonVisible = true; }
    changeDisplayedProject(selection: string) { 
      this.codeMenuOpen = false;
      this.displayedProject = selection; 
    }
}
