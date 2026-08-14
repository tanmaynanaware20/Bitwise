import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div className="w-full max-w-lg mx-auto flex flex-col items-center py-6">
      <!-- Step 1 Lock Indicator Banner -->
      <div className="mb-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF9466]/15 border border-[#FF9466]/40 text-[#C84A20] dark:text-[#FF9466] text-xs font-black uppercase tracking-wider">
        <span>🔒 Step 1: Account Creation Gate</span>
      </div>

      <div className="w-full p-8 shadow-2xl flex flex-col gap-6 bg-white dark:bg-slate-800 border border-[#FF9466]/30 dark:border-slate-700 rounded-3xl">
        <div className="flex flex-col items-center text-center gap-2">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#FF9466] to-[#E0663B] text-white flex items-center justify-center shadow-lg shadow-[#FF9466]/30 mb-1 text-2xl font-black">
            🍎
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            Create Your Account
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-sm">
            Sign up below to unlock Dashboard, Smart AI Chatbot, Food Diary, and claim +50 bonus BiteCoins!
          </p>
        </div>

        <!-- Tab Navigation between Sign In and Sign Up -->
        <div className="grid grid-cols-2 gap-2 bg-slate-100 dark:bg-slate-900 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800">
          <a
            routerLink="/login"
            className="py-2.5 px-3 rounded-xl text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white text-center"
          >
            Sign In
          </a>
          <button
            type="button"
            className="py-2.5 px-3 rounded-xl text-xs font-extrabold bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-2xs text-center flex items-center justify-center gap-1"
          >
            Create Account (Step 1)
          </button>
        </div>

        <form (ngSubmit)="handleSignup()" className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Full Name</label>
            <input
              type="text"
              placeholder="Alex Morgan"
              [(ngModel)]="fullName"
              name="fullName"
              required
              className="px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs font-bold"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Email Address</label>
            <input
              type="email"
              placeholder="alex@example.com"
              [(ngModel)]="email"
              name="email"
              required
              className="px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs font-bold"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              [(ngModel)]="password"
              name="password"
              required
              className="px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs font-bold"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-[#FF9466] text-slate-950 font-extrabold text-sm hover:bg-[#E0663B] hover:text-white transition-all mt-2 shadow-md"
          >
            Create Account & Earn 50 BiteCoins
          </button>
        </form>
      </div>
    </div>
  `,
})
export class SignupComponent {
  fullName = '';
  email = '';
  password = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  async handleSignup(): Promise<void> {
    if (!this.fullName || !this.email || !this.password) return;
    const ok = await this.authService.signup(this.fullName, this.email, this.password);
    if (ok) {
      this.router.navigate(['/']);
    }
  }
}
