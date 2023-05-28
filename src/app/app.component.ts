import { Component } from '@angular/core';
import { IndexComponent } from './index/index.component';
import { TriviaComponent } from './trivia/trivia.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    IndexComponent, TriviaComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'mySite';
}
