import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodeMenuComponent } from './code-menu/code-menu.component';
import { TriviaComponent } from './trivia/trivia.component';
import { AppComponent } from '../app.component';
import { WordGameComponent } from './word-game/word-game.component';
import { SpaceRaceGameComponent } from './space-race-game/space-race-game.component';
import { BinderComponent } from './binder/binder.component';

@Component({
  selector: 'app-code',
  standalone: true,
  template: `
    <div id="container">
      <!-- TOP -->
      <div id="top">
        <h3>{{ displayedProject }}</h3>
      </div>

      <!-- MENU -->
      <div id="codeMenu" *ngIf="codeMenuOpen">
        <app-code-menu
          (projectSelected)="changeDisplayedProject($event)"
        ></app-code-menu>
      </div>

      <!-- PROJECTS -->
      <div id="project">
        <ng-container [ngSwitch]="displayedProject">
          <!-- <h1 *ngSwitchCase="'Choose a Project'">Choose a Project</h1> -->
          <div *ngSwitchCase="projects[0]"><app-trivia></app-trivia></div>
          <div *ngSwitchCase="projects[1]"><app-word-game></app-word-game></div>
          <div *ngSwitchCase="projects[2]"><app-binder></app-binder></div>
          <div *ngSwitchDefault></div>
        </ng-container>
      </div>

      <!-- BOTTOM -->
      <div id="bottomBar">
        <button type="button" (click)="incrementProject(false)"><==</button>
        <button type="button" (click)="codeMenuOpen = !codeMenuOpen">
          Projects
        </button>
        <button type="button" (click)="incrementProject(true)">==></button>
      </div>
    </div>
  `,
  styleUrls: ['./code.component.sass'],
  imports: [
    CommonModule,
    CodeMenuComponent,
    TriviaComponent,
    WordGameComponent,
    SpaceRaceGameComponent,
    BinderComponent,
  ],
})
export class CodeComponent {
  projectIndex: number = 0;
  projects: string[] = ['Trivia', 'Word Game', 'Pokemon Binder'];
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
    if (this.projectIndex <= 0 && previous)
      this.projectIndex = this.projects.length - 1;
    else
      this.projectIndex =
        (this.projectIndex + (previous ? -1 : 1)) % this.projects.length;
    this.changeDisplayedProject(this.projects[this.projectIndex]);
  }
}
