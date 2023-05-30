import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-code-menu',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './code-menu.component.html',
  styleUrls: ['./code-menu.component.sass']
})
export class CodeMenuComponent {
  @Output() projectSelected = new EventEmitter<string>();
  selectProject(selection: string) { this.projectSelected.emit(selection); }
}
