import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FirebaseService } from '../../services/firebase.service';


@Component({
  selector: 'login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  email = '';
  password = '';
  errorMsg = '';

  constructor(private fire: FirebaseService) {}

  async login() {
    this.errorMsg = '';
    try {
      await this.fire.login(this.email, this.password);
      alert('Login successful!');
    } catch (err: any) {
      this.errorMsg = err.message;
    }
  }
}
