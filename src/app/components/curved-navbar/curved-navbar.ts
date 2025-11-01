import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ToggleButton } from '../buttons/toggle-button/toggle-button';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'curved-navbar',
  imports: [RouterLink, ToggleButton],
  templateUrl: './curved-navbar.html',
  styleUrl: './curved-navbar.scss'
})
export class CurvedNavbar {
  constructor(private fire: FirebaseService) { }

  logout() {
    this.fire.logout();
  }
}
