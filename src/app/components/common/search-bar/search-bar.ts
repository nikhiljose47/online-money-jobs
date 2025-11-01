import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map, startWith } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Job } from '../../../models/job.model';

@Component({
  selector: 'search-bar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './search-bar.html',
  styleUrls: ['./search-bar.scss']
})
export class SearchBar {
  @Input() jobs: Job[] = [];
  @Output() jobSelected = new EventEmitter<Job>();

  searchControl = new FormControl('');
  filteredJobs$!: Observable<Job[]>;
  showNoMatchesText: boolean = false;

  ngOnInit() {
    this.filteredJobs$ = this.searchControl.valueChanges.pipe(
      startWith(''),
      debounceTime(200),
      distinctUntilChanged(),
      map(value => {
        const query = (value || '').trim();
        // ✅ Only show suggestions if query length >= 2
        if (query.length < 2) {
          this.showNoMatchesText = false;

          return [];
        }
        this.showNoMatchesText = true;
        return this.filterJobs(query);
      })
    );
  }

  filterJobs(query: string): Job[] {
    query = query.toLowerCase();
    const result = this.jobs.filter(
      job =>
        job.title?.toLowerCase().includes(query) ||
        job.shortDesc?.toLowerCase().includes(query)
    );
    // Limit results to top 3
    return result.slice(0, 3);
  }

  selectSuggestion(job: Job) {
    this.searchControl.setValue(job.title, { emitEvent: false });
    this.jobSelected.emit(job);
  }
}
