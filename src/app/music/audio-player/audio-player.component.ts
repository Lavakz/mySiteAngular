import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

//@ts-ignore
import WaveSurfer from 'wavesurfer.js';

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

class SongLoader {
  private loadedSongs: Song[] = [];
  private songDir: string;
  private songPaths: string[] = [];
  private loadLabel: HTMLElement | null = null;

  constructor(songDir: string) {
    this.songDir = songDir;
  }

  getMusicPaths(refresh: boolean = false): string[] {
    if (!refresh && this.songPaths.length > 0) return this.songPaths;
    this.songPaths = [];
    getSongNames().forEach((songName) => 
      this.songPaths.push(this.songDir.concat(songName).concat('.mp3'))
    );
    return this.songPaths;
  }

  load(
    index: number = Math.floor(Math.random() * this.getMusicPaths().length)
  ): void {
    if (this.loadLabel != null) 
      this.loadLabel!.innerHTML = 'Loading...';
    this.loadedSongs.forEach((wave) => wave.hide());
    this.loadedSongs[0] = new Song(this.getMusicPaths()[index]);
    if (this.loadLabel == null) 
      this.loadLabel = document.getElementById('loadLabel');
    this.loadedSongs[0].addReadyHandler(this.loadLabel);
  }

  isPlaying(): boolean {
    return this.loadedSongs[0].isPlaying;
  }
}

@Component({
  selector: 'app-audio-player',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div id="controlPanel">
      <div id="songWindow">
        <h1 id="songTitle">{{ songNames[songIndex] }}</h1>
      </div>
      <button type="button" class="navigation" (click)="incrementSongIndex()">
        ^
      </button>
      <div id="audioPlayer">
        <button id="playButton">Play</button>
        <h2 id="loadLabel">Loading...</h2>
        <div id="waveform1"></div>
        <div id="waveform2"></div>
        <div id="waveform3"></div>
      </div>
      <button
        type="button"
        class="navigation"
        (click)="incrementSongIndex(true)"
      >
        v
      </button>
    </div>
  `,
  styleUrls: ['./audio-player.component.sass'],
})
export class AudioPlayerComponent {
  public songLoader: SongLoader;
  songNames: string[] = [];
  songIndex: number = Math.floor(Math.random() * getSongNames().length);

  constructor() {
    this.songNames = getSongNames();
    this.songLoader = new SongLoader('./assets/Audio/');
    this.resizeHandler();
  }

  ngOnInit() {
    this.songLoader.load(this.songIndex);
  }

  incrementSongIndex(down: boolean = false): void {
    let b: HTMLElement | null = document.getElementById('playButton');
    if (!b) return;
    b.innerHTML = 'Play';
    this.songIndex = this.songIndex + (down ? -1 : 1);
    if (this.songIndex < 0) this.songIndex = this.songNames.length - 1;
    if (this.songIndex >= this.songNames.length) this.songIndex = 0;
    this.songLoader.load(this.songIndex);
  }

  resizeHandler(): void {
    window.addEventListener('resize', () => {
      this.songLoader.load(this.songIndex);
    });
  }
}

class Song {
  private wavesurfer: WaveSurfer;
  public isPlaying: boolean = false;

  constructor(songPath: string, containerSeletor: string = '#waveform1') {
    this.createWaveSurfer(containerSeletor);
    this.wavesurfer.load(songPath);
    this.addPlayButton();
  }

  private createWaveSurfer(containerSeletor: string | null) {
    this.wavesurfer = WaveSurfer.create({
      container: containerSeletor,
      waveColor: 'black',
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

  public addReadyHandler(label: HTMLElement | null): void {
    console.log('Adding ready handler');
    this.wavesurfer.on('ready', () => {
      console.log('Ready');
      label!.innerHTML = '';
    });
  }

  public hide(): void {
    this.destroy();
  }

  public destroy(): void {
    this.wavesurfer.destroy();
  }
}
