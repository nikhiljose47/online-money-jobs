import { Component, Input, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'add-solution',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-solution.html',
  styleUrls: ['./add-solution.scss']
})
export class AddSolution {
  @Input() jobId!: string; 
  solutionForm: FormGroup;
  selectedImages: string[] = [];
  checksPassed = signal(false);

  constructor(private fb: FormBuilder, private firebaseService: FirebaseService) {
    this.solutionForm = this.fb.group({
      text: ['', [Validators.required, Validators.minLength(20)]],
      images: [[]],
    });

    // Monitor text for validation
    this.solutionForm.get('text')?.valueChanges.subscribe((text: string) => {
      this.runChecks(text);
    });
  }

  hasMinWords(): boolean {
  const text = this.solutionForm.get('text')?.value || '';
  return text.trim().split(/\s+/).length >= 5;
}

  onImageSelect(event: any) {
    const files = event.target.files;
    const fileCount = Math.min(files.length, 3);
    this.selectedImages = [];

    for (let i = 0; i < fileCount; i++) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedImages.push(e.target.result);
      };
      reader.readAsDataURL(files[i]);
    }
  }

  runChecks(text: string) {
    const hasEnoughWords = text.trim().split(/\s+/).length >= 5;
    const endsWithPunctuation = /[.!?]$/.test(text.trim());
    const isLongEnough = text.length >= 20;

    // You can customize your rules here
    this.checksPassed.set(hasEnoughWords && endsWithPunctuation && isLongEnough);
  }

  async onSubmit() {
    if (this.solutionForm.valid && this.checksPassed()) {
      const solutionData = {
        ...this.solutionForm.value,
        images: this.selectedImages,
        createdAt: new Date().toISOString()
      };
      await this.firebaseService.addSolutionToJob(this.jobId , solutionData);
      alert('✅ Solution submitted successfully!');
      this.solutionForm.reset();
      this.selectedImages = [];
    } else {
      alert('⚠️ Please ensure all checks pass before submitting.');
    }
  }
}
