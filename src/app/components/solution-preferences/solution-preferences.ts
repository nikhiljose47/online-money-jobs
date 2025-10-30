import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
      solutionImages: ['0', Validators.required],
      textLength: ['20+', Validators.required],
      customLength: [''],
      instructions: [''],
    });
  }

  async onPostJob() {
    const combinedData = {
      ...this.jobData,
      preferences: this.prefForm.value,
      images: this.images,
      createdAt: new Date(),
    };
    
    
    console.log('Final Job Data:', combinedData);
    await this.fireServive.addJob(this.jobData);
    // TODO: Upload to Firestore
    // this.firestore.collection('jobs').add(combinedData)

    this.router.navigate(['/success-animation']);
  }
}
