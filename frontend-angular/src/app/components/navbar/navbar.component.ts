import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ThemeService } from '../../services/theme.service';
import { UserProfile } from '../../models/user.model';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-[#0F172A]/95 backdrop-blur-md border-b border-[#FF9466]/30 dark:border-slate-800 shadow-sm shadow-[#FF9466]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        <!-- BiteWise Brand Logo -> Navigates to Main Page (Dashboard) -->
        <a routerLink="/" (click)="onLogoClick()" className="flex items-center gap-2.5 shrink-0 group cursor-pointer" title="Return to BiteWise Main Page">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#FF9466] to-[#E0663B] text-white flex items-center justify-center shadow-md shadow-[#FF9466]/30 group-hover:scale-105 transition-transform duration-300 font-black text-xl">
            🍎
          </div>
          <div className="flex flex-col">
            <span className="font-black text-lg text-slate-900 dark:text-white leading-none tracking-tight">
              Bite<span className="text-[#FF9466]">Wise</span>
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#C84A20] dark:text-slate-400">
              Smart AI Engine
            </span>
          </div>
        </a>

        <!-- Desktop Navigation Links -->
        <nav className="hidden lg:flex items-center gap-1.5">
          <a
            *ngFor="let link of navLinks"
            [routerLink]="link.path"
            routerLinkActive="bg-[#FF9466]/15 text-[#C84A20] dark:text-[#FF9466] border border-[#FF9466]/40 shadow-2xs"
            [routerLinkActiveOptions]="{ exact: link.path === '/' }"
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-[#FF9466]/10 dark:hover:bg-slate-800/80 transition-all"
          >
            <span>{{ link.icon }}</span>
            <span>{{ link.label }}</span>
          </a>
        </nav>

        <!-- Action Controls & User Profile -->
        <div className="flex items-center gap-3">
          <!-- BiteCoins Badge -->
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs font-black">
            <span>🪙</span>
            <span>{{ (user?.bitecoinBalance || 240) | number }} Coins</span>
          </div>

          <!-- Theme Toggle -->
          <button
            (click)="toggleTheme()"
            className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 flex items-center justify-center hover:bg-[#FF9466]/20 transition-all"
            title="Toggle Light/Dark Theme"
          >
            <span>{{ isDark ? '☀️' : '🌙' }}</span>
          </button>

          <!-- Profile Link -->
          <a
            routerLink="/profile"
            className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 flex items-center justify-center hover:bg-[#FF9466]/20 transition-all"
            title="User Profile"
          >
            👤
          </a>
        </div>
      </div>
    </header>
  `,
})
export class NavbarComponent implements OnInit {
  user: UserProfile | null = null;
  isDark = false;

  navLinks = [
    { path: '/', label: 'Dashboard', icon: '📊' },
    { path: '/ai-chat', label: 'Smart AI', icon: '✨' },
    { path: '/diary', label: 'Food Diary', icon: '🥗' },
    { path: '/rewards', label: 'Rewards', icon: '🎁' },
    { path: '/referral', label: 'Refer & Earn', icon: '🤝' },
  ];

  constructor(
    private authService: AuthService,
    private themeService: ThemeService
  ) {}

  ngOnInit(): void {
    this.authService.user$.subscribe((u) => (this.user = u));
    this.themeService.isDark$.subscribe((dark) => (this.isDark = dark));
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  onLogoClick(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
