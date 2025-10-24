import { Component } from '@angular/core';
import { selectIsGuestMode } from '../../../state/app.selector';
import { Store } from '@ngrx/store';
import { toggleMode } from '../../../state/app.action';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'toggle-button',
  imports: [CommonModule],
  templateUrl: './toggle-button.html',
  styleUrl: './toggle-button.scss'
})
export class ToggleButton {
  isGuestMode$: any;
  
  constructor(private store: Store) {
  this.isGuestMode$ = this.store.select(selectIsGuestMode);

  }

  toggle() {
    this.store.dispatch(toggleMode());
  }
}
