import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BottomNavComponent } from './components/bottom-nav/bottom-nav.component';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent, BottomNavComponent],
  template: `
    <div className="min-h-dvh flex flex-col bg-[#FAF7F2] dark:bg-[#0F172A] text-slate-900 dark:text-slate-100">
      <!-- Top Navbar (Visible only when authenticated and not on login/signup) -->
      <app-navbar *ngIf="showNavigation"></app-navbar>

      <!-- Main Router Container -->
      <main [className]="'flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 ' + (showNavigation ? 'pb-24 md:pb-8' : 'flex flex-col items-center justify-center')">
        <router-outlet></router-outlet>
      </main>

      <!-- Bottom Mobile Nav -->
      <app-bottom-nav *ngIf="showNavigation"></app-bottom-nav>
    </div>
  `,
})
export class AppComponent implements OnInit {
  showNavigation = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const isAuthPage = event.url === '/login' || event.url === '/signup';
        this.showNavigation = this.authService.isAuthenticated && !isAuthPage;
      }
    });

    this.authService.user$.subscribe((user) => {
      const currentUrl = this.router.url;
      const isAuthPage = currentUrl === '/login' || currentUrl === '/signup';
      this.showNavigation = !!user && !isAuthPage;
    });
  }
}
