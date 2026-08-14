import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private isDarkSubject = new BehaviorSubject<boolean>(false);
  isDark$ = this.isDarkSubject.asObservable();

  constructor() {
    const savedTheme = localStorage.getItem('bitewise_theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = savedTheme ? savedTheme === 'dark' : prefersDark;

    this.setTheme(isDark);
  }

  toggleTheme(): void {
    this.setTheme(!this.isDarkSubject.value);
  }

  private setTheme(isDark: boolean): void {
    this.isDarkSubject.next(isDark);
    const root = document.documentElement;

    if (isDark) {
      root.classList.add('dark');
      root.classList.remove('light');
      localStorage.setItem('bitewise_theme', 'dark');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
      localStorage.setItem('bitewise_theme', 'light');
    }
  }
}
