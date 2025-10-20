import { Component } from '@angular/core';
import { FloatingButtonComponent } from '../floating-button/floating-button';
import { AddJobPopup } from '../add-job-popup/add-job-popup';
import { JobFormModalComponent } from '../add-job/add-job';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'curved-navbar',
  imports: [AddJobPopup, JobFormModalComponent, RouterLink],
  templateUrl: './curved-navbar.html',
  styleUrl: './curved-navbar.scss'
})
export class CurvedNavbar {

}
