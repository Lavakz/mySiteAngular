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
        <a (click)="selectProject('Trivia')">Trivia</a><br />
        <a (click)="selectProject('Word Game')">Word Game</a><br />
        <a (click)="selectProject('Space Race Game')">Space Race Game</a><br />
        <a onclick="location.href='/cube.html'">Rubik's Cube Simulation</a
        ><br />
        <a onclick="location.href='/pokemon.html'">Pokemon Binder</a>
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
