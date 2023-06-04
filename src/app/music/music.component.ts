import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from '../app.component';
import { AudioPlayerComponent } from './audio-player/audio-player.component';

@Component({
  selector: 'app-music',
  standalone: true,
  imports: [CommonModule, AudioPlayerComponent],
  template: ` <div id="container">
    <app-audio-player></app-audio-player>
  </div>`,
  styleUrls: ['./music.component.sass'],
})
export class MusicComponent {
  constructor(private _parent: AppComponent) {
    this._parent.backButtonVisible = true;
  }
  
}
