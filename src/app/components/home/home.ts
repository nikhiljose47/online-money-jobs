import { Component, computed, OnInit, signal } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { CommonModule } from '@angular/common';
import { FloatingButtonComponent } from '../floating-button/floating-button';
import { Observable } from 'rxjs';

//
import { v4 as uuidv4 } from 'uuid';

interface Job {
  title: string;
  company: string;
  type: 'Frontend' | 'Backend' | 'Fullstack';
  postedAt: string;
}

@Component({
  selector: 'home-page',
  imports: [CommonModule, FloatingButtonComponent],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  jobs$: Observable<any[]>;
  jobs = signal<Job[]>([
    { title: 'Frontend Developer', company: 'ABC Corp', type: 'Frontend', postedAt: '2h ago' },
    { title: 'Backend Developer', company: 'XYZ Ltd', type: 'Backend', postedAt: '5h ago' },
    { title: 'Fullstack Developer', company: 'Tech Solutions', type: 'Fullstack', postedAt: '1d ago' },
  ]);

  loading = signal(true);
  user = signal<{ name: string; karma: number; wallet: number } | null>({
    name: 'John Doe',
    karma: 120,
    wallet: 500,
  });
  sortOption = signal<'Latest' | 'Oldest'>('Latest');
  filterOption = signal<'All' | 'Frontend' | 'Backend' | 'Fullstack'>('All');

  constructor(private firebaseService: FirebaseService) {
    this.jobs$ = this.firebaseService.getJobs(); // This is like your Flutter stream
    this.loading.set(false);
    console.log('uuid $uuidv4()');
   // this.jobs$.forEach((e)=>this.jobs().push(e) .update)
  }

  // Computed: filtered and sorted jobs
  displayedJobs = computed(() => {
    let filtered = this.jobs();
    if (this.filterOption() !== 'All') {
      filtered = filtered.filter(job => job.type === this.filterOption());
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

}
