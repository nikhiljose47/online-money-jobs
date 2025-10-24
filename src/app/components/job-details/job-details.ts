// job-details.component.ts
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { FirebaseService } from '../../services/firebase.service';
import { selectIsGuestMode } from '../../state/app.selector';
import { Store } from '@ngrx/store';

@Component({
  selector: 'job-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './job-details.html',
})
export class JobDetailsComponent {
  jobId!: string;
  solution$!: Observable<any>; // ✅ Observable for async pipe
  job$!: Observable<any>;
  solutions$!: Observable<any[]>;
  currentUserId = 'user123'; // Replace with auth userId
  userMode$: any;
 
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private firestore: FirebaseService,
    private store: Store,
  ) { }

  ngOnInit() {
    this.jobId = this.route.snapshot.paramMap.get('id')!;
    this.solutions$ = this.firestore.getSolutionsById(this.jobId);
    console.log('job Id  ' + this.solution$);
    this.userMode$ = this.store.select(selectIsGuestMode);
  }

  goBack() {
    this.router.navigate(['/']);
  }

  addSolution() {
    alert('Open modal or navigate to add-solution form');
    // Example:
    // this.jobService.addSolution(this.jobId, this.currentUserId, 'My idea...');
  }
}
