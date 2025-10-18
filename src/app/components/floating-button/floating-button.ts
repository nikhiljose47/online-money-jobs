import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddJobPopup } from '../add-job-popup/add-job-popup';

@Component({
  selector: 'floating-button',
  standalone: true,
  imports: [CommonModule, AddJobPopup],
  templateUrl: './floating-button.html',
  styles: [
    `
      /* wrapper ensures the component can be placed inside any parent div */
      .fb-wrapper { position: relative; }

      /* Floating button: vertically centered, 20% from right, scaled 2x */
      .fb-btn {
        position: fixed;
        top: 50%;
        right: 20%;
        transform: translateY(-50%) scale(2);
        width: 56px;
        height: 56px;
        border-radius: 50%;
        border: none;
        background: linear-gradient(135deg,#007bff,#00c6ff);
        color: #fff;
        font-size: 28px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        z-index: 1000;
        box-shadow: 0 6px 18px rgba(0,0,0,0.25);
      }

      .fb-btn:hover { transform: translateY(-50%) scale(2.1); }

      /* Popup positioned near the button */
      .fb-popup {
        position: fixed;
        top: 50%;
        right: calc(20% + 80px); /* shift left from button */
        transform: translateY(-50%);
        z-index: 1000;
      }

      .fb-popup-card {
        width: 260px;
        padding: 12px;
        background: #fff;
        border-radius: 8px;
        box-shadow: 0 8px 24px rgba(0,0,0,0.15);
        font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
      }

      .fb-popup-card h6 { margin: 0 0 6px 0; font-size: 14px; }
      .fb-popup-card .muted { color: #666; font-size: 13px; margin-bottom: 8px; }

      .btn-close{
        background: #007bff;
        color:#fff;
        border:none;
        padding:6px 10px;
        border-radius:4px;
        cursor:pointer;
      }
    `
  ]
})
export class FloatingButtonComponent {
  // using signals makes it work well in zoneless apps too
  show = signal(false);

  toggle() {
    this.show.update(v => !v);
  }
}
