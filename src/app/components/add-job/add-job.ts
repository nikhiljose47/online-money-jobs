import { ChangeDetectorRef, Component, ElementRef, signal, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Job } from '../../models/job.model';
import { CommonModule } from '@angular/common';
import { CommonService } from '../../services/common.service';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

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

  constructor(private userService: UserService, private fb: FormBuilder, private router: Router, private cdr: ChangeDetectorRef, private cmservices: CommonService) {
    this.jobForm = this.fb.group({
      title: ['', Validators.required],
      shortDesc: ['', [Validators.required, Validators.maxLength(150)]],
      description: ['', Validators.required],
      status: ['open', Validators.required],
      postedByName: [''],
      postedByPhoto: [''],
      rewardOffered: [null],
      rating: [''],
      videoLink: ['']
    });
  }

  // ✅ Submit logic
  async onNext() {
    if (this.jobForm.valid) {
      const user = this.userService.getUser();
      var newJob: Job = {
        ...this.jobForm.value,
        postedBy: user.userId,
      };

      console.log('Job submitted:', newJob);

      //await this.firebaseService.addJob(newJob);
      this.router.navigate(['/solution-preferences'], {
        state: { jobData: newJob, images: this.selectedImages },
      });
      this.jobForm.reset();

    } else {
      this.jobForm.markAllAsTouched();
      console.log('Form invalid!');

    }
  }

  onCancel() {
    console.log('cam on cancel');
  }

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