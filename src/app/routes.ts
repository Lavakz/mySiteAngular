import { Routes } from '@angular/router';
import { TriviaComponent } from './code/trivia/trivia.component';
import { HomeComponent } from './home/home.component';
import { CodeComponent } from './code/code.component';

const routeConfig: Routes = [
  {
    path: '', 
    redirectTo: '/index', 
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
    title: 'Home page'
  },
  {
    path: 'code',
    component: CodeComponent,
    title: 'Code'
  },
  {
    path: 'code/trivia',
    component: TriviaComponent,
    title: 'Trivia'
  }
];

export default routeConfig;