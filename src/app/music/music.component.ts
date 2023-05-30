import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-music',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p>
      music works!
    </p>
  `,
  styleUrls: ['./music.component.sass']
})
export class MusicComponent {

}
