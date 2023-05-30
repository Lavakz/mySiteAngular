import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TriviaComponent } from './code/trivia/trivia.component';
import { CodeComponent } from './code/code.component';
import { CodeMenuComponent } from './code/code-menu/code-menu.component';
import { CommonModule } from '@angular/common';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HomeComponent,
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
