import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'popup-button',
  standalone: true,
  imports: [CommonModule],
  template: './popup-button.html',
  styles: [
  ],
})
export class FloatingButtonComponent {
  showPopup = signal(false);

  togglePopup() {
    console.log('came');
    this.showPopup.update((v) => !v);
  }
}
