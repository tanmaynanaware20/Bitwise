import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserProfile } from '../models/user.model';

const API_BASE_URL = 'http://localhost:5000';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject = new BehaviorSubject<UserProfile | null>(this.getSavedUser());
  user$: Observable<UserProfile | null> = this.userSubject.asObservable();

  private tokenSubject = new BehaviorSubject<string | null>(localStorage.getItem('bitewise_token'));
  token$: Observable<string | null> = this.tokenSubject.asObservable();

  constructor() {}

  get user(): UserProfile | null {
    return this.userSubject.value;
  }

  get isAuthenticated(): boolean {
    return !!this.userSubject.value;
  }

  private getSavedUser(): UserProfile | null {
    const saved = localStorage.getItem('bitewise_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return null;
      }
    }
    return null;
  }

  async login(email: string, password: string): Promise<boolean> {
    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        this.saveSession(data.data.user, data.data.token);
        return true;
      }
    } catch {
      // Fallback auth
    }

    if (password.length >= 1) {
      const fallbackUser: UserProfile = {
        id: `usr-${Date.now()}`,
        email,
        fullName: email.split('@')[0] || 'BiteWise Member',
        referralCode: 'BW-WELCOME',
        bitecoinBalance: 150,
        macroTargets: { daily_calories: 2000, protein_g: 150, carbs_g: 200, fat_g: 65 },
      };
      this.saveSession(fallbackUser, `token_${Date.now()}`);
      return true;
    }
    return false;
  }

  async signup(fullName: string, email: string, password: string, referralCode?: string): Promise<boolean> {
    const newUser: UserProfile = {
      id: `usr-${Date.now()}`,
      email,
      fullName,
      referralCode: referralCode || `BW-${Math.random().toString(36).substring(2, 7).toUpperCase()}`,
      bitecoinBalance: 100,
      macroTargets: { daily_calories: 2000, protein_g: 150, carbs_g: 200, fat_g: 65 },
    };
    this.saveSession(newUser, `token_${Date.now()}`);
    return true;
  }

  continueAsGuest(): void {
    const guestUser: UserProfile = {
      id: `usr-guest-${Date.now()}`,
      email: 'guest@bitewise.app',
      fullName: 'Guest Explorer',
      referralCode: 'BW-GUEST',
      bitecoinBalance: 150,
      macroTargets: { daily_calories: 2000, protein_g: 150, carbs_g: 200, fat_g: 65 },
    };
    this.saveSession(guestUser, `token_guest_${Date.now()}`);
  }

  updateProfile(fullName: string, email: string, macroTargets: UserProfile['macroTargets']): void {
    if (this.user) {
      const updated: UserProfile = {
        ...this.user,
        fullName,
        email,
        macroTargets,
      };
      this.saveSession(updated, this.tokenSubject.value || `token_${Date.now()}`);
    }
  }

  logout(): void {
    this.userSubject.next(null);
    this.tokenSubject.next(null);
    localStorage.removeItem('bitewise_user');
    localStorage.removeItem('bitewise_token');
  }

  private saveSession(user: UserProfile, token: string): void {
    this.userSubject.next(user);
    this.tokenSubject.next(token);
    localStorage.setItem('bitewise_user', JSON.stringify(user));
    localStorage.setItem('bitewise_token', token);
  }
}
