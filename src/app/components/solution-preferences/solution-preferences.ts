import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseService } from '../../services/firebase.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-solution-preferences',
  templateUrl: './solution-preferences.html',
  imports: [ReactiveFormsModule, CommonModule],

})
export class SolutionPreferences {
  jobData: any;
  images: string[] = [];
  prefForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private fireServive: FirebaseService) {
    const navState = this.router.getCurrentNavigation()?.extras.state as any;
    this.jobData = navState?.jobData;
    this.images = navState?.images || [];

    this.prefForm = this.fb.group({
      imageCount: ['0', Validators.required],
      textLen: ['20', Validators.required],
      textContainsWords: this.fb.array([]),
      instructions: [''],
    });
  }

  get textContainsWords(): FormArray {
    return this.prefForm.get('textContainsWords') as FormArray;
  }

  addWord(): void {
    this.textContainsWords.push(this.fb.control('', Validators.required));
  }

  removeWord(index: number): void {
    this.textContainsWords.removeAt(index);
  }


  async onPostJob() {
    const combinedData = {
      ...this.jobData,
      preferences: this.prefForm.value,
      images: this.images,
      createdAt: new Date(),
    };

    console.log('Final Job Data:', combinedData);
    await this.fireServive.addJob(combinedData);
    // TODO: Upload to Firestore
    // this.firestore.collection('jobs').add(combinedData)
    this.router.navigate(['/success-animation']);
  }
}
