import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

//@ts-ignore
import WaveSurfer from 'wavesurfer.js';

let musicDir: string = '../assets/Audio/myMusic/';
function getSongNames(): string[] {
  // Todo: Get these from SQL database
  return [
    'amoeba',
    'Cyclomachine',
    'Darkwraith',
    'Daze',
    'Deep',
    'Focus',
    'Jumble',
    'LacunaLiner',
    'LonelyHarp',
    'Magnapinna',
    'Protozoa',
    'Remember',
    'Spirillum',
    'Towtacular',
  ];
}
let musicPaths: string[] = [];

function getMusicPaths(refresh: boolean = false): string[] {
  if (!refresh && musicPaths.length > 0) return musicPaths;
  musicPaths = [];
  let songNames = getSongNames()
  songNames.forEach((songName) => {
    musicPaths.push(musicDir.concat(songName).concat('.mp3'));
  });
  return musicPaths;
}

@Component({
  selector: 'app-audio-player',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div id="controlPanel">
      <div id="songWindow"><h1 id="songTitle">{{ songNames[songIndex] }}</h1></div>
      <button type="button" class="navigation" (click)="incrementSongIndex()">^</button>
      <div id="audioPlayer">
        <button id="playButton">Play</button>
        <div id="waveform"></div>
      </div>
      <button type="button" class="navigation" (click)="incrementSongIndex(true)">v</button>
    </div>
  `,
  styleUrls: ['./audio-player.component.sass'],
})
export class AudioPlayerComponent {
  public static loadedSongs: Song[] = [];
  songNames: string[] = []
  songIndex: number = 0;
  constructor() {
    this.songNames = getSongNames();
    window.addEventListener('resize', () => {
      this.refreshSong()
    });
  }
  ngOnInit() {
    loadSong();
  }
  incrementSongIndex(down: boolean = false): void {
    this.songIndex = this.songIndex + (down ? -1 : 1);
    this.refreshSong()
  }
  refreshSong() {
    this.songNames = getSongNames();
    AudioPlayerComponent.loadedSongs.forEach((wave) => wave.destroy());
    loadSong();
  }
}

function loadSong(
  index: number = Math.floor(Math.random() * getMusicPaths().length)
): Song {
  AudioPlayerComponent.loadedSongs = [];
  let song = new Song(getMusicPaths()[index]);
  AudioPlayerComponent.loadedSongs.push(song);
  return song;
}

class Song {
  private wavesurfer: WaveSurfer;
  public isPlaying: boolean = false;

  constructor(songPath: string, containerSeletor: string = '#waveform') {
    this.createWaveSurfer(containerSeletor);
    this.wavesurfer.load(songPath);
    this.addPlayButton();
  }

  private createWaveSurfer(containerSeletor: string | null) {
    this.wavesurfer = WaveSurfer.create({
      container: containerSeletor,
      waveColor: 'violet',
      progressColor: 'purple',
      height: 80,
      barWidth: 2,
    });
  }

  private addPlayButton(buttonId: string = 'playButton') {
    const playButton = document.getElementById(buttonId);
    if (!playButton) return;
    playButton.addEventListener('click', () => {
      this.wavesurfer.playPause();
      this.isPlaying = !this.isPlaying;
      playButton.innerHTML = this.isPlaying ? 'Pause' : 'Play';
    });
  }

  public destroy(): void {
    this.wavesurfer.destroy();
  }
}
