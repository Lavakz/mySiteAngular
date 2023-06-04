import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

//@ts-ignore
import WaveSurfer from 'wavesurfer.js';

@Component({
  selector: 'app-audio-player',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div id="audioPlayer">
      <button id="playButton">Play</button>
      <div id="waveform"></div>
    </div>
  `,
  styleUrls: ['./audio-player.component.sass'],
})
export class AudioPlayerComponent {
  public static loadedWaves: Song[] = [];

  constructor() {
    window.addEventListener('resize', () => {
      AudioPlayerComponent.loadedWaves.forEach((wave) => {
        wave.destroy();
      });
      AudioPlayerComponent.loadedWaves = [];
      loadWave();
    });
  }
  ngAfterViewInit() {
    loadWave();
  }


}

function loadWave() {
  const song = new Song();
  AudioPlayerComponent.loadedWaves.push(song);
  return song
}

class Song {
  private wavesurfer: WaveSurfer;
  public isPlaying: boolean = false;

  constructor(containerSeletor: string = '#waveform') {
    this.wavesurfer = WaveSurfer.create({
      container: containerSeletor,
      waveColor: 'violet',
      progressColor: 'purple',
      height: 80,
      barWidth: 2,
    });
    this.wavesurfer.load('../assets/Audio/myMusic/Daze.mp3');
    const playButton = document.getElementById('playButton');
    if (playButton) {
      playButton.addEventListener('click', () => {
        this.wavesurfer.playPause();
        this.isPlaying = !this.isPlaying;
        if (this.isPlaying) {
          playButton.innerHTML = 'Pause';
        } else {
          playButton.innerHTML = 'Play';
        }
      });
    } else {
      console.log('playButton not found');
    }
  }

  public destroy(): void {
    this.wavesurfer.destroy();
  }
}