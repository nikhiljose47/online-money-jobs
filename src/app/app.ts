import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CurvedNavbar } from './components/curved-navbar/curved-navbar';
import { Home } from './components/home/home';



@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CurvedNavbar,Home],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})

export class App {
  protected readonly title = signal('online-money-jobs');
}
