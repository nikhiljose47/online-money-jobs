import { Component, ElementRef, signal, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Job } from '../../models/job.model';
import { CommonModule } from '@angular/common';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'job-form-modal',
  templateUrl: './add-job.html',
  styleUrls: ['./add-job.scss'],
  standalone: true,
    imports: [CommonModule, ReactiveFormsModule], // ✅ Correct imports
})
export class JobFormModalComponent {
  jobForm: FormGroup;
  @ViewChild('jobModal') jobModal!: ElementRef<HTMLDivElement>;

  constructor(private fb: FormBuilder, private firebaseService: FirebaseService) {
    this.jobForm = this.fb.group({
      title: ['', Validators.required],
      shortDesc: ['', [Validators.required, Validators.maxLength(150)]],
      description: ['', Validators.required],
      status: ['open', Validators.required],
      postedBy: ['', Validators.required],
      postedByName: [''],
      postedByPhoto: [''],
      rewardOffered: [null],
      rating: ['']
    });
  }

  // ✅ Open modal programmatically
  openModal() {
    const modal = new (window as any).bootstrap.Modal(this.jobModal.nativeElement);
    modal.show();
  }

  // ✅ Submit logic
  onSubmit() {
    if (this.jobForm.valid) {
      const newJob: Job = this.jobForm.value;
      console.log('Job submitted:', newJob);
      this.addJob(newJob);
      // TODO: Save to Firestore here
      this.jobForm.reset();
      const modal = (window as any).bootstrap.Modal.getInstance(this.jobModal.nativeElement);
      modal.hide();
    } else {
      this.jobForm.markAllAsTouched();
    }
   
    
    
  }

   username = '';
  jobDetails = '';
  
  loading = signal(false);
  message = signal('');


  async addJob(job: Job) {
    // if (!this.username.trim() || !this.jobDetails.trim()) {
    //   this.message.set('Please fill all fields.');
    //   return;
    // }
    console.log('came add Job');
    this.loading.set(true);
    try {
      await this.firebaseService.addJob(job.shortDesc, job.createdAt);
      this.message.set('✅ Job added successfully!');
      this.username = '';
      this.jobDetails = '';
    } catch {
      this.message.set('❌ Error adding job.');
    } finally {
      this.loading.set(false);
    }
  }
}
