import { Component } from '@angular/core';
import { FloatingButtonComponent } from '../floating-button/floating-button';
import { AddJobPopup } from '../add-job-popup/add-job-popup';

@Component({
  selector: 'curved-navbar',
  imports: [AddJobPopup],
  templateUrl: './curved-navbar.html',
  styleUrl: './curved-navbar.scss'
})
export class CurvedNavbar {

}
