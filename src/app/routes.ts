import { Routes } from '@angular/router';
import { TriviaComponent } from './code/trivia/trivia.component';
import { HomeComponent } from './home/home.component';
import { CodeComponent } from './code/code.component';
import { SpaceRaceGameComponent } from './code/space-race-game/space-race-game.component'
import { MusicComponent } from './music/music.component';

const routeConfig: Routes = [
  {
    path: '', 
    redirectTo: '/home', 
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
  },
  {
    path: 'code/space-race-game',
    component: SpaceRaceGameComponent,
    title: 'Space Race'
  },
  {
    path: 'music',
    component: MusicComponent,
    title: 'Music'
  }
];

export default routeConfig;