import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'success-animation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './success-animation.html',
  styles: [`
  .success-circle {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background: #d1fae5;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: pop 0.6s ease-out;
  }

  .checkmark {
    font-size: 48px;
    color: #16a34a;
    animation: bounce 0.8s ease-in-out;
  }

  @keyframes pop {
    0% { transform: scale(0.6); opacity: 0; }
    100% { transform: scale(1); opacity: 1; }
  }

  @keyframes bounce {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.3); }
  }
  `]
})
export class SuccessAnimation {
  constructor(private router: Router) { }
  goBack() {
    // history.back(); // simple back navigation
  }

  dummyAction() {
    this.router.navigate(['/online-money-jobs']);

  }
}
