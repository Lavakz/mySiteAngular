import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TriviaComponent } from './code/trivia/trivia.component';
import { CodeComponent } from './code/code.component';
import { CodeMenuComponent } from './code/code-menu/code-menu.component';
import { MusicComponent } from './music/music.component';
import { CommonModule } from '@angular/common';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HomeComponent,
    CodeComponent,
    CodeMenuComponent,
    MusicComponent,
    TriviaComponent,
    RouterModule,
    CommonModule,
    NgIf,
  ],
  template: `
    <div *ngIf="this.backButtonVisible">
      <button id="backButton" [routerLink]="['/home']">Back</button>
    </div>
    <div id="routerContainer">
      <router-outlet></router-outlet>
    </div>
  `,
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  title = 'mySite';
  backButtonVisible = false;
}
