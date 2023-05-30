import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CodeComponent } from '../code/code.component';

@Component({
  selector: 'app-code-menu',
  standalone: true,
  imports: [CommonModule, RouterLink, CodeComponent],
  templateUrl: './code-menu.component.html',
  styleUrls: ['./code-menu.component.sass']
})
export class CodeMenuComponent {
  select(selection: string){this._parent.displayedProject = selection}
  constructor(private _parent: CodeComponent){}
  selected = this._parent.displayedProject
}
