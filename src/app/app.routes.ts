import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { JobDetailsComponent } from './components/job-details/job-details';
import { Notifications } from './components/notifications/notifications';
import { JobFormModalComponent } from './components/add-job/add-job';

export const routes: Routes = [
  { path: '', redirectTo: 'online-money-jobs', pathMatch: 'full' },
  { path: 'online-money-jobs', component: Home },
  { path: 'job/:id', component: JobDetailsComponent },
  { path: 'notifications', component: Notifications },
  { path: 'post-job', component: JobFormModalComponent },
];
