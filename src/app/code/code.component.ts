import { Component  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodeMenuComponent } from '../code-menu/code-menu.component';
import { TriviaComponent } from '../trivia/trivia.component';
import { AppComponent } from '../app.component';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-code',
  standalone: true,
  imports: [CommonModule, CodeMenuComponent, TriviaComponent, RouterModule],
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.sass']
})
export class CodeComponent {
  codeMenuOpen = false;
  displayedProject = 'Select a Project';
  constructor(private _parent: AppComponent) { this._parent.backButtonVisible = true; }
}
