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
  projectIndex: number = 0;
  projects: string[] = ['Trivia', 'Word Game', 'Space Race Game'];
  displayedProject: string = 'Choose a Project';
  codeMenuOpen: boolean = false;
  constructor(private _parent: AppComponent) {
    this._parent.backButtonVisible = true;
    this.codeMenuOpen = true;
  }
  changeDisplayedProject(selection: string) {
    this.projectIndex = this.projects.indexOf(selection);
    this.codeMenuOpen = false;
    this.displayedProject = selection;
  }
  incrementProject(previous: boolean) {
    if (this.projectIndex <= 0) this.projectIndex = this.projects.length - 1;
    else
      this.projectIndex =
        (this.projectIndex + (previous ? -1 : 1)) % this.projects.length;
    this.changeDisplayedProject(this.projects[this.projectIndex]);
  }
}
