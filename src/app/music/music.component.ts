import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from '../app.component';
import { MusicPlayerComponent } from './music-player/music-player.component';

//@ts-ignore
import WaveSurfer from 'wavesurfer.js';

@Component({
  selector: 'app-music',
  standalone: true,
  imports: [CommonModule, MusicPlayerComponent],
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.sass'],
})
export class MusicComponent {
  constructor(private _parent: AppComponent) {
    this._parent.backButtonVisible = true;
  }
  OnNgInit() {
    var wavesurfer = WaveSurfer.create({
      container: '#waveform',
      waveColor: 'violet',
      progressColor: 'purple',
    });
    wavesurfer.load('../assets/Audio/myMusic/Daze.mp3');
    wavesurfer.on('ready', function () {
      wavesurfer.play();
    });
    const playButton = document.querySelector('#playButton');
    if (playButton) {
      playButton.addEventListener('click', function () {
        wavesurfer.playPause();
      });
    } else {
      console.log('playButton not found');
    }
  }
}
