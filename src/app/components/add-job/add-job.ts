import { ChangeDetectorRef, Component, ElementRef, signal, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Job } from '../../models/job.model';
import { CommonModule } from '@angular/common';
import { FirebaseService } from '../../services/firebase.service';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'job-form-modal',
  templateUrl: './add-job.html',
  styleUrls: ['./add-job.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class AddJob {
  jobForm: FormGroup;
  @ViewChild('jobModal') jobModal!: ElementRef<HTMLDivElement>;
  selectedImages: string[] = [];
  videoCheckStatus: 'public' | 'private' | null = null;

  constructor(private fb: FormBuilder, private firebaseService: FirebaseService, private cdr: ChangeDetectorRef, private cmservices: CommonService) {
    this.jobForm = this.fb.group({
      title: ['', Validators.required],
      shortDesc: ['', [Validators.required, Validators.maxLength(150)]],
      description: ['', Validators.required],
      status: ['open', Validators.required],
      postedBy: ['', Validators.required],
      postedByName: [''],
      postedByPhoto: [''],
      rewardOffered: [null],
      rating: [''],
      videoLink: ['']
    });
  }

  // ✅ Submit logic
  async onSubmit() {
    if (this.jobForm.valid) {
      const newJob: Job = this.jobForm.value;
      console.log('Job submitted:', newJob);
      await this.firebaseService.addJob(newJob);
      this.jobForm.reset();
    } else {
      //  this.jobForm.markAllAsTouched();
    }
  }

  onCancel() { }

onImageSelect(event: any) {
  const files = event.target.files;
  if (!files || files.length === 0) return;

  // ✅ Keep existing images and allow up to 3 total
  const remainingSlots = 3 - this.selectedImages.length;
  const filesToAdd = Math.min(files.length, remainingSlots);

  for (let i = 0; i < filesToAdd; i++) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.selectedImages.push(e.target.result);
       this.cdr.detectChanges(); 
    };
    reader.readAsDataURL(files[i]);
  }

  console.log('Selected images:', this.selectedImages);
}


  checkVideoLink() {
    const link = this.jobForm.get('videoLink')?.value;
    // Here you can call your backend or service to check if the link is public.
    // Mock simulation:
    if (link && link.includes('drive.google.com') || link.includes('youtube.com')) {
      this.videoCheckStatus = 'public';
    } else {
      this.videoCheckStatus = 'private';
    }
  }

}