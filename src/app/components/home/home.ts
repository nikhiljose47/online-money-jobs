import { Component, computed, effect, OnInit, signal } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { CommonModule } from '@angular/common';
import { FloatingButtonComponent } from '../floating-button/floating-button';
import { Observable } from 'rxjs';

//
import { Router } from '@angular/router';
import { Job } from '../../models/job.model';
import { JobFormModalComponent } from '../add-job/add-job';

@Component({
  selector: 'online-money-jobs',
  imports: [CommonModule, FloatingButtonComponent, JobFormModalComponent],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  jobs$: Observable<any[]>;
  jobs = signal<Job[]>([
  ]);

  loading = signal(true);

  sortOption = signal<'Latest' | 'Oldest'>('Latest');
  filterOption = signal<'All' | 'Frontend' | 'Backend' | 'Fullstack'>('All');

  constructor(private firebaseService: FirebaseService, private router: Router) {
    this.jobs$ = this.firebaseService.getJobs(); // This is like your Flutter stream
    this.loading.set(false);
    console.log(this.jobs$);
    // Listen to the Observable and update the signal automatically
    this.jobs$.subscribe({
      next: (data) => this.jobs.set(data),
      error: (err) => console.error('Error loading jobs:', err)
    });

    // Optional: debug effect
    effect(() => {
      //console.log('Jobs updated:;
    });
  }


  // Computed: filtered and sorted jobs
  displayedJobs = computed(() => {
    let filtered = this.jobs();
    if (this.filterOption() !== 'All') {
     // filtered = filtered.filter(job => job.type === this.filterOption());
    }

    if (this.sortOption() === 'Latest') {
      return filtered;
    } else {
      return [...filtered].reverse();
    }
  });


  // Update sort
  setSort(option: 'Latest' | 'Oldest') {
    this.sortOption.set(option);
  }

  // Update filter
  setFilter(option: 'All' | 'Frontend' | 'Backend' | 'Fullstack') {
    this.filterOption.set(option);
  }

  addJob(title: string) {

  }

  viewJob(id: string) {
    this.router.navigate(['/job', 'BeglibAYfX0PP3vPSdA0']);
  }

}
