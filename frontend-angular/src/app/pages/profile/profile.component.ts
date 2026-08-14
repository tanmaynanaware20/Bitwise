import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserProfile } from '../../models/user.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div className="flex flex-col gap-6 max-w-4xl mx-auto w-full">
      <!-- Page Header -->
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#FF9466]/20 text-[#E0663B] flex items-center justify-center font-bold text-lg">
            👤
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white">Profile & Account Settings</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Update your personal information, adjust daily macro goals, or sign out of your account.
            </p>
          </div>
        </div>

        <!-- Header Log Out Button -->
        <button
          (click)="handleLogout()"
          className="px-4 py-2 rounded-xl text-rose-600 dark:text-rose-400 border border-rose-500/30 hover:bg-rose-500/10 font-bold text-xs flex items-center gap-1.5"
        >
          🚪 Log Out
        </button>
      </div>

      <div *ngIf="saveSuccess" className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 p-3 rounded-2xl text-xs font-bold">
        ✅ Profile and daily nutrition targets saved successfully!
      </div>

      <form (ngSubmit)="handleSaveProfile()" className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Account Details -->
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 rounded-2xl p-6 flex flex-col gap-4 shadow-xs">
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            👤 Personal Details
          </h2>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Full Name</label>
              <input
                type="text"
                [(ngModel)]="fullName"
                name="fullName"
                required
                className="px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs font-bold"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Email Address</label>
              <input
                type="email"
                [(ngModel)]="email"
                name="email"
                required
                className="px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs font-bold"
              />
            </div>
          </div>
        </div>

        <!-- Macro Targets -->
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 rounded-2xl p-6 flex flex-col justify-between gap-4 shadow-xs">
          <div className="flex flex-col gap-4">
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              🎯 Daily Nutrition Goals
            </h2>

            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Daily Calories (kcal)</label>
                <input
                  type="number"
                  [(ngModel)]="dailyCalories"
                  name="dailyCalories"
                  className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold text-xs"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Protein (g)</label>
                <input
                  type="number"
                  [(ngModel)]="protein"
                  name="protein"
                  className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold text-xs"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Carbs (g)</label>
                <input
                  type="number"
                  [(ngModel)]="carbs"
                  name="carbs"
                  className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold text-xs"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Fat (g)</label>
                <input
                  type="number"
                  [(ngModel)]="fat"
                  name="fat"
                  className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold text-xs"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-[#FF9466] text-slate-950 font-bold text-xs hover:bg-[#E0663B] hover:text-white transition-all mt-2"
          >
            💾 Save Profile & Goals
          </button>
        </div>
      </form>

      <!-- Account Actions & Sign Out Section -->
      <div className="bg-rose-500/5 dark:bg-rose-500/10 border border-rose-500/20 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-0.5">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">Account Session</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Sign out of your current session on this device. Your data and BiteCoins remain saved.
          </p>
        </div>

        <button
          (click)="handleLogout()"
          className="px-5 py-2.5 rounded-xl text-rose-600 dark:text-rose-400 border border-rose-500/40 hover:bg-rose-500/20 font-bold text-xs shrink-0"
        >
          🚪 Log Out of BiteWise
        </button>
      </div>
    </div>
  `,
})
export class ProfileComponent implements OnInit {
  fullName = 'Alex Morgan';
  email = 'demo@bitewise.app';

  dailyCalories = 2000;
  protein = 150;
  carbs = 200;
  fat = 65;

  saveSuccess = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.user$.subscribe((u) => {
      if (u) {
        this.fullName = u.fullName;
        this.email = u.email;
        if (u.macroTargets) {
          this.dailyCalories = u.macroTargets.daily_calories;
          this.protein = u.macroTargets.protein_g;
          this.carbs = u.macroTargets.carbs_g;
          this.fat = u.macroTargets.fat_g;
        }
      }
    });
  }

  handleSaveProfile(): void {
    this.authService.updateProfile(this.fullName, this.email, {
      daily_calories: Number(this.dailyCalories),
      protein_g: Number(this.protein),
      carbs_g: Number(this.carbs),
      fat_g: Number(this.fat),
    });
    this.saveSuccess = true;
    setTimeout(() => (this.saveSuccess = false), 3000);
  }

  handleLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
