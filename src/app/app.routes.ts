import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { JobDetailsComponent } from './components/job-details/job-details';
import { Notifications } from './components/notifications/notifications';
import { AddJob } from './components/add-job/add-job';
import { SolutionPreferences } from './components/solution-preferences/solution-preferences';
import { SuccessAnimation } from './components/common/success-animation/success-animation';

export const routes: Routes = [
  { path: '', redirectTo: 'online-money-jobs', pathMatch: 'full' },
  { path: 'online-money-jobs', component: Home },
  { path: 'job/:id', component: JobDetailsComponent },
  { path: 'notifications', component: Notifications },
  { path: 'post-job', component: AddJob },
    { path: 'success-animation', component: SuccessAnimation },
  { path: 'solution-preferences', component: SolutionPreferences },

];
