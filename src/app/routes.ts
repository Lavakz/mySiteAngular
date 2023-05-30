import { Routes } from '@angular/router';
import { TriviaComponent } from './trivia/trivia.component';
import { IndexComponent } from './index/index.component';
import { CodeComponent } from './code/code.component';

const routeConfig: Routes = [
  {
    path: '', 
    redirectTo: '/index', 
    pathMatch: 'full'
  },
  {
    path: 'index',
    component: IndexComponent,
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