import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { JobDetailsComponent } from './components/job-details/job-details';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: Home },
      { path: 'job/:id', component: JobDetailsComponent }
];
