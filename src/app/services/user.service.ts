// src/app/services/user.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CommonService } from './common.service';

export interface AppUser {
  mode: 'guest' | 'user';
  userId?: string;
  username?: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject = new BehaviorSubject<AppUser>({ mode: 'guest' });
  user$ = this.userSubject.asObservable();

  constructor(private cServive: CommonService) {
    const saved = this.cServive.isBrowser() ? localStorage.getItem('app_user') : null;
    if (saved) {
      this.userSubject.next(JSON.parse(saved));
    }
  }

  /** Update and persist the user state */
  setUser(user: AppUser) {
    this.userSubject.next(user);
    if (this.cServive.isBrowser()) {
      localStorage.setItem('app_user', JSON.stringify(user));
    }
  }

  /** Return current user value */
  getUser(): AppUser {
    return this.userSubject.value;
  }

  /** Clear user info (e.g., on logout) */
  clearUser() {
    this.userSubject.next({ mode: 'guest' });
    localStorage.removeItem('app_user');
  }

}
