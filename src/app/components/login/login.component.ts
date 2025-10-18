import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';


@Component({ selector: 'app-login', templateUrl: './login.component.html' ,  imports: [CommonModule, FormsModule]})
export class LoginComponent {
  username = '';
  error = '';
  success = '';
  loading = false;


  // constructor(private fb: FirebaseService) { }


  async chooseUsername() {
    this.error = '';
    this.success = '';
    this.loading = true;
    // try {
    //   await this.fb.setUsername(this.username.trim());
    //   this.success = 'Username created and saved!';
    // } catch (e: any) {
    //   this.error = e.message || 'Failed';
    // } finally {
    //   this.loading = false;
    // }
  }
}
