import { ChangeDetectorRef, Component, Input, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FirebaseService } from '../../services/firebase.service';
import { Observable } from 'rxjs';
import { SolutionStruct } from '../../models/solution-struct.model';
import { Job } from '../../models/job.model';

@Component({
  selector: 'add-solution',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-solution.html',
  styleUrls: ['./add-solution.scss']
})
export class AddSolution implements OnInit {
  @Input() jobId!: string;
  solutionForm!: FormGroup;
  selectedImages: string[] = [];
  job = signal<Job | null>(null);

  solutionRules: SolutionStruct = {
    imageCount: 1,
    textLen: 150,
    textContainsWords: [],
  };


  constructor(private cdr: ChangeDetectorRef, private fb: FormBuilder, private fire: FirebaseService) {
  }

  async getJobById(id: string) {
    const data = await this.fire.getJobById(this.jobId); // still async internally
    if (data) {
      this.job.set(data); // store directly in signal
    }
    if (this.job()) {
      
      console.log('sol rules', this.job()!.preferences)
      this.solutionRules = this.job()!.preferences;
       this.cdr.detectChanges();
    }
  }

  ngOnInit(): void {
    this.solutionForm = this.fb.group({
      text: [],
    });
    console.log('came with ID' + this.jobId);
    this.getJobById(this.jobId);
  }

  onImageSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files) return;

    const files = Array.from(input.files);
    const maxImages = this.solutionRules.imageCount;

    if (files.length > maxImages) {
      alert(`You can upload up to ${maxImages} image(s) only.`);
      input.value = ''; // reset
      return;
    }

    this.selectedImages = [];
    for (const file of files) {
      const reader = new FileReader();
      reader.onload = e => this.selectedImages.push(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  }
  hasMinLength(): boolean {
    const text = this.solutionForm.get('text')?.value || '';
    return text.length >= this.solutionRules.textLen;
  }

  hasRequiredWords(): boolean {
    const text = (this.solutionForm.get('text')?.value || '').toLowerCase();
    return this.solutionRules.textContainsWords.every(w => text.includes(w.toLowerCase()));
  }

  checksPassed(): boolean {
    return this.hasMinLength() && this.hasRequiredWords();
  }


  async onSubmit() {
    if (this.solutionForm.valid && this.checksPassed()) {
      const solutionData = {
        ...this.solutionForm.value,
        images: this.selectedImages,
        createdAt: new Date().toISOString()
      };
      await this.fire.addSolutionToJob(this.jobId, solutionData);
      alert('✅ Solution submitted successfully!');
      this.solutionForm.reset();
      this.selectedImages = [];
    } else {
      alert('⚠️ Please ensure all checks pass before submitting.');
    }
  }
}
