import { Component, EventEmitter, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-add-job-popup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="popup-card">
      <div class="card p-3 shadow-lg rounded-3">
        <h5>Add Job</h5>

        <div class="mb-2">
          <input
            class="form-control"
            [(ngModel)]="username"
            placeholder="Enter your username"
          />
        </div>

        <div class="mb-2">
          <textarea
            class="form-control"
            [(ngModel)]="jobDetails"
            placeholder="Enter job details"
          ></textarea>
        </div>

        <button
          class="btn btn-success w-100"
          (click)="addJob()"
          [disabled]="loading()"
        >
          {{ loading() ? 'Adding...' : 'Add Job' }}
        </button>

        <div *ngIf="message()" class="mt-2 text-success">
          {{ message() }}
        </div>

        <button class="btn btn-outline-secondary w-100 mt-2" (click)="closePopup()">
          Close
        </button>
      </div>
    </div>
  `,
  styles: [
    `
      .popup-card {
        position: fixed;
        bottom: 90px;
        right: 20px;
        width: 280px;
        z-index: 999;
      }
    `,
  ],
})
export class AddJobPopup {
  @Output() closed = new EventEmitter<void>();

  username = '';
  jobDetails = '';
  
  loading = signal(false);
  message = signal('');

  constructor(private firebaseService: FirebaseService) {}

  async addJob() {
    if (!this.username.trim() || !this.jobDetails.trim()) {
      this.message.set('Please fill all fields.');
      return;
    }

    this.loading.set(true);
    try {
      await this.firebaseService.addJob(this.username, this.jobDetails);
      this.message.set('✅ Job added successfully!');
      this.username = '';
      this.jobDetails = '';
    } catch {
      this.message.set('❌ Error adding job.');
    } finally {
      this.loading.set(false);
    }
  }

  closePopup() {
    this.closed.emit();
  }
}
