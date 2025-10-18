import { Component, OnInit, signal } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { CommonModule } from '@angular/common';
import { FloatingButtonComponent } from '../floating-button/floating-button';

@Component({
  selector: 'home-page',
  imports: [CommonModule, FloatingButtonComponent],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  jobs = signal<any[]>([]);
  loading = signal(true);

  constructor(private firebaseService: FirebaseService) {
    this.loadJobs();
  }

  async loadJobs() {
    const result = await this.firebaseService.getJobs();
    this.jobs.set(result);
    this.loading.set(false);
  }
}
