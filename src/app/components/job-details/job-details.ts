// job-details.component.ts
import { Component, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { FirebaseService } from '../../services/firebase.service';
import { selectIsGuestMode } from '../../state/app.selector';
import { Store } from '@ngrx/store';
import { CustomPopup } from '../common/custom-popup/custom-popup';
import { AddSolution } from '../add-solution/add-solution';
import { Job } from '../../models/job.model';

@Component({
  selector: 'job-details',
  standalone: true,
  imports: [CommonModule, CustomPopup, AddSolution],
  templateUrl: './job-details.html',
})
export class JobDetailsComponent {
  jobId: string = '';
  solution$!: Observable<any>; // ✅ Observable for async pipe
  job = signal<Job | null>(null);
  solutions$!: Observable<any[]>;
  currentUserId = 'user123'; // Replace with auth userId
  isGuestMode$: any;
  showPopup: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store,
    private fireService: FirebaseService,
  ) { }

  ngOnInit() {
    this.jobId = this.route.snapshot.paramMap.get('id')!;
    this.solutions$ = this.fireService.getSolutionsById(this.jobId);
    console.log(this.solutions$);
    this.getJobById(this.jobId);
    this.isGuestMode$ = this.store.select(selectIsGuestMode);

  }

  async getJobById(id: string) {
    const data = await this.fireService.getJobById(this.jobId); // still async internally
    if (data) {
      this.job.set(data); // store directly in signal
    }

  }

  goBack() {
    this.router.navigate(['/']);
  }



  onActionClick() {
    // this.showPopup = false;
  }

  addSolution() {
    alert('Open modal or navigate to add-solution form');
    // Example:
    // this.jobService.addSolution(this.jobId, this.currentUserId, 'My idea...');
  }
}
