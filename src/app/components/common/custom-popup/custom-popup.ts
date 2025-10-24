import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'custom-popup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './custom-popup.html',
  styleUrls: ['./custom-popup.scss'],
})
export class CustomPopup {
  @Input() title: string = 'Popup Title';
  @Input() show = false;
  @Output() onClose = new EventEmitter<void>();
  @Input() onAction?: () => void; // callback function from parent

  handleAction() {
    if (this.onAction) this.onAction();
  }

  close() {
    this.onClose.emit();
  }
}
