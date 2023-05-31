import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-music',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.sass']
})
export class MusicComponent {
  constructor(private _parent: AppComponent) {
    this._parent.backButtonVisible = true;
  }
}