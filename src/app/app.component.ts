import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { TriviaComponent } from './trivia/trivia.component';
import { CodeComponent } from './code/code.component';
import { CodeMenuComponent } from './code-menu/code-menu.component';
import { CommonModule } from '@angular/common';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    IndexComponent,
    TriviaComponent,
    RouterModule,
    CodeComponent,
    CodeMenuComponent,
    CommonModule,
    NgIf,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  title = 'mySite';
  backButtonVisible = false;
}
