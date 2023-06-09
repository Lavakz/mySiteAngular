import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-binder',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pokemon.html',
  styleUrls: ['./binder.component.sass'],
})
export class BinderComponent {
  private i: number = 0;
  private path: string = '';
  private mag: HTMLElement | null = null;
  constructor() {}
  ngAfterViewInit() {
    this.magnifierInit();
    var pageFlip = this.loadPages();
    document
      .querySelector('.btn-prev')!
      .addEventListener('click', () => pageFlip.flipPrev());
    document
      .querySelector('.btn-next')!
      .addEventListener('click', () => pageFlip.flipNext());
    pageFlip.on('flip', (e: any) => this.updateMag(e));
  }

  magnifierInit() {
    this.path = `url(../../../assets/Pokemon/${this.i.toString()}.png)`;
    this.mag = document.getElementById('magnifier');
    let binder: HTMLElement | null = document!.getElementById('binder');
    document.addEventListener('mousemove', (e) => {
      if (!binder) return;
      let x_offset: number | undefined =
        -binder?.getBoundingClientRect().left - 125;
      let y_offset: number | undefined =
        -binder?.getBoundingClientRect().top - 125;
      if (!x_offset || !y_offset) return;
      this.mag?.style.setProperty('left', `${e.clientX + x_offset}px`);
      this.mag?.style.setProperty('top', `${e.clientY + y_offset}px`);
      this.mag?.style.setProperty(
        'background-position',
        `-${Math.pow(e.clientX, 1.1) + x_offset * 1.52}px 
         -${Math.pow(e.clientY, 1.15) + y_offset * 1.53}px`
      );
    });
  }

  loadPages() {
    var _pageFlip = require('page-flip');
    let pf = new _pageFlip.PageFlip(document.getElementById('binder'), {
      width: 550,
      height: 733,
      size: 'stretch',
      minWidth: 315,
      maxWidth: 1000,
      minHeight: 420,
      maxHeight: 1350,
      maxShadowOpacity: 0,
      flippingTime: 1500,
      showCover: true,
      mobileScrollSupport: false,
    });
    pf.loadFromHTML(document.querySelectorAll('.page'));
    return pf;
  }

  updateMag(e: any) {
    this.path = `url(../../../assets/Pokemon/${e.data.toString()}.png`;
    if (!this.mag) return;
    this.mag.style.setProperty('background-image', this.path);
  }
}
