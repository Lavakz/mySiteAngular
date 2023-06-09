import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-code-menu',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div id="menu">
      <h1>Projects:</h1>
      <div id="links">
        <a (click)="selectProject('Trivia')">Trivia</a>
        <a (click)="selectProject('Word Game')">Word Game</a>
        <a (click)="selectProject('Pokemon Binder')">Pokemon Binder</a>
      </div>
    </div>
  `,
  styleUrls: ['./code-menu.component.sass'],
})
export class CodeMenuComponent {
  @Output() projectSelected = new EventEmitter<string>();
  selectProject(selection: string) {
    this.projectSelected.emit(selection);
  }
}
