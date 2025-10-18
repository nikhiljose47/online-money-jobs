import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'popup-button',
  standalone: true,
  imports: [CommonModule],
  template: './popup-button.html',
  styles: [
    `
      .fab {
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 56px;
        height: 56px;
        border-radius: 50%;
        border: none;
        background: linear-gradient(135deg, #007bff, #00c6ff);
        color: white;
        font-size: 24px;
        box-shadow: 0 3px 10px rgba(0, 0, 0, 0.3);
        cursor: pointer;
        z-index: 1000;
        transition: transform 0.2s ease-in-out;
      }

      .fab:hover {
        transform: scale(1.1);
      }
    `,
  ],
})
export class FloatingButtonComponent {
  showPopup = signal(false);

  togglePopup() {
    console.log('came');
    this.showPopup.update((v) => !v);
  }
}
