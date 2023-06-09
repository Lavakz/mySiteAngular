import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TriviaComponent } from '../code/trivia/trivia.component';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, TriviaComponent],
  template: `
    <div id="homeContainer">
      <div id="index">
        <div class="column">
          <h2>Programming:</h2>
          <button [routerLink]="['/code']">Projects</button><br />
        </div>
        <div class="column">
          <h2>Music:</h2>
          <button
            onclick="location.href='https://www.youtube.com/channel/UCsBV3-0sI4AP4dj1-HwTsJQ'"
          >
            Covers</button
          ><br />
          <button [routerLink]="['/music']">Songs</button>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent {
  constructor(private _parent: AppComponent) {
    this._parent.backButtonVisible = false;
  }
}
