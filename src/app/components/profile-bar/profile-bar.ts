import { CommonModule } from '@angular/common';
import { Component, Input, signal } from '@angular/core';

@Component({
  selector: 'profile-bar',
  imports: [CommonModule],
  templateUrl: './profile-bar.html',
  styleUrl: './profile-bar.scss'
})
export class ProfileBar {   
 user = signal<{ name: string; karma: number; wallet: number } | null>({
    name: 'Arjun Kumar (AK)',
    karma: 120,
    wallet: 500,
  });
}
