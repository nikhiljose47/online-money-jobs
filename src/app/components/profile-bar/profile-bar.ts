import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, signal } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'profile-bar',
  imports: [CommonModule],
  templateUrl: './profile-bar.html',
  styleUrl: './profile-bar.scss'
})
export class ProfileBar implements OnInit {

  user = signal<{ name: string; karma: number; wallet: number } | null>({
    name: 'Guest090',
    karma: 120,
    wallet: 500,
  });
  constructor(private userService: UserService) {
  }

  ngOnInit() {
    const user = this.userService.getUser();
    const userName =
      user.mode === 'guest'
        ? 'GuestX'
        : user.userId ?? 'Anonymous';

    this.user.set({
      ...this.user()!, name: userName, karma: 300,
      wallet: 1200,
    });

  }
}
