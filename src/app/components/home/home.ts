import { Component, OnInit, signal } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { CommonModule } from '@angular/common';
import { FloatingButtonComponent } from '../floating-button/floating-button';
import { Observable } from 'rxjs';

@Component({
  selector: 'home-page',
  imports: [CommonModule, FloatingButtonComponent],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  jobs$: Observable<any[]>;
  loading = signal(true);

  constructor(private firebaseService: FirebaseService) {
    this.jobs$ = this.firebaseService.getJobs(); // This is like your Flutter stream
    this.loading.set(false);
  }

}
