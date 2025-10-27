import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CurvedNavbar } from './components/curved-navbar/curved-navbar';
import { ProfileBar } from './components/profile-bar/profile-bar';



@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CurvedNavbar, ProfileBar],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})

export class App {
  protected readonly title = signal('online-money-jobs');
}
