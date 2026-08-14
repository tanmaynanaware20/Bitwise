import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-bottom-nav',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-white/95 dark:bg-[#0F172A]/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 px-4 py-2 flex items-center justify-around">
      <a
        *ngFor="let item of navItems"
        [routerLink]="item.path"
        routerLinkActive="text-[#C84A20] dark:text-[#FF9466] font-black"
        [routerLinkActiveOptions]="{ exact: item.path === '/' }"
        className="flex flex-col items-center gap-0.5 text-xs text-slate-500 dark:text-slate-400 font-bold"
      >
        <span className="text-base">{{ item.icon }}</span>
        <span className="text-[10px]">{{ item.label }}</span>
      </a>
    </nav>
  `,
})
export class BottomNavComponent {
  navItems = [
    { path: '/', label: 'Dashboard', icon: '📊' },
    { path: '/ai-chat', label: 'Smart AI', icon: '✨' },
    { path: '/diary', label: 'Diary', icon: '🥗' },
    { path: '/rewards', label: 'Rewards', icon: '🎁' },
    { path: '/profile', label: 'Profile', icon: '👤' },
  ];
}
