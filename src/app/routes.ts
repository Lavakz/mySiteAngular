import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { TriviaComponent } from './trivia/trivia.component';

const routeConfig: Routes = [
  {
    path: '',
    component: TriviaComponent,
    title: 'Home page'
  },
  {
    path: 'trivia',
    component: TriviaComponent,
    title: 'Trivia'
  }
];

export default routeConfig;