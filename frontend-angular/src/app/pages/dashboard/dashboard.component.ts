import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserProfile, MacroTargets } from '../../models/user.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div className="flex flex-col gap-6 max-w-7xl mx-auto w-full">
      <!-- Welcome Banner -->
      <section className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-[#FF9466]/20 via-[#FFE3D1]/20 to-[#38BDF8]/20 dark:from-slate-800 dark:to-slate-800/60 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-700/80">
        <div className="flex flex-col gap-1">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#E0663B] dark:text-[#FF9466]">
            <span>✨</span>
            <span>BiteWise Smart AI Nutrition Engine</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white">
            Welcome back, {{ user?.fullName || 'Nutrition Explorer' }}! 👋
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xl">
            Track your daily nutrition, earn BiteCoins, and unlock personalized meal recommendations powered by cloud Smart AI.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <a routerLink="/ai-chat" className="px-4 py-2.5 rounded-xl bg-[#38BDF8] text-slate-950 font-bold text-xs hover:bg-[#0284C7] hover:text-white transition-all shadow-md flex items-center gap-1.5">
            <span>✨</span> Ask Smart AI Assistant
          </a>
          <a routerLink="/diary" className="px-4 py-2.5 rounded-xl bg-[#FF9466] text-slate-950 font-bold text-xs hover:bg-[#E0663B] hover:text-white transition-all shadow-md flex items-center gap-1.5">
            <span>🥗</span> Open Food Diary
          </a>
        </div>
      </section>

      <!-- Daily Nutrition Macro Grid -->
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <!-- Calories Card -->
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 rounded-2xl p-5 flex flex-col justify-between shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Calories Today</span>
            <div className="w-8 h-8 rounded-lg bg-orange-500/10 text-orange-500 flex items-center justify-center font-bold text-xs">🔥</div>
          </div>
          <div className="mt-4">
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">1,240</span>
              <span className="text-sm text-slate-500 font-medium">/ {{ macros.daily_calories }} kcal</span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-700 h-2 rounded-full mt-3 overflow-hidden">
              <div className="bg-[#FF9466] h-full rounded-full w-[62%]"></div>
            </div>
          </div>
        </div>

        <!-- Protein Card -->
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 rounded-2xl p-5 flex flex-col justify-between shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Protein Target</span>
            <div className="w-8 h-8 rounded-lg bg-rose-500/10 text-rose-500 flex items-center justify-center font-bold text-xs">P</div>
          </div>
          <div className="mt-4">
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">105g</span>
              <span className="text-sm text-slate-500 font-medium">/ {{ macros.protein_g }}g</span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-700 h-2 rounded-full mt-3 overflow-hidden">
              <div className="bg-rose-500 h-full rounded-full w-[65%]"></div>
            </div>
          </div>
        </div>

        <!-- Carbs Card -->
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 rounded-2xl p-5 flex flex-col justify-between shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Carbohydrates</span>
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold text-xs">C</div>
          </div>
          <div className="mt-4">
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">130g</span>
              <span className="text-sm text-slate-500 font-medium">/ {{ macros.carbs_g }}g</span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-700 h-2 rounded-full mt-3 overflow-hidden">
              <div className="bg-amber-500 h-full rounded-full w-[61%]"></div>
            </div>
          </div>
        </div>

        <!-- Fats Card -->
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 rounded-2xl p-5 flex flex-col justify-between shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Healthy Fats</span>
            <div className="w-8 h-8 rounded-lg bg-sky-500/10 text-sky-500 flex items-center justify-center font-bold text-xs">F</div>
          </div>
          <div className="mt-4">
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">42g</span>
              <span className="text-sm text-slate-500 font-medium">/ {{ macros.fat_g }}g</span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-700 h-2 rounded-full mt-3 overflow-hidden">
              <div className="bg-[#38BDF8] h-full rounded-full w-[64%]"></div>
            </div>
          </div>
        </div>
      </section>

      <!-- Feature Tiles -->
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <a routerLink="/ai-chat" className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 p-5 rounded-2xl flex flex-col justify-between gap-3 hover:border-[#38BDF8] transition-all group">
          <div className="flex flex-col gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#38BDF8]/20 text-[#0284C7] dark:text-[#38BDF8] flex items-center justify-center font-bold">✨</div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-[#0284C7] dark:group-hover:text-[#38BDF8]">BiteWise Smart AI Chat</h2>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">Cloud Smart AI with tool calling for natural meal parsing, recipe analysis, and custom meal planning.</p>
          </div>
          <div className="flex items-center text-xs font-bold text-[#0284C7] dark:text-[#38BDF8] pt-2">
            <span>Launch Smart AI Chat →</span>
          </div>
        </a>

        <a routerLink="/rewards" className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 p-5 rounded-2xl flex flex-col justify-between gap-3 hover:border-amber-500/50 transition-all group">
          <div className="flex flex-col gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold">🎁</div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-amber-500">BiteCoins & Rewards Store</h2>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">Earn BiteCoins from meal logging & streaks. Redeem for real coupon codes, OLED themes, and discounts.</p>
          </div>
          <div className="flex items-center text-xs font-bold text-amber-500 pt-2">
            <span>Open Rewards Store →</span>
          </div>
        </a>

        <a routerLink="/referral" className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 p-5 rounded-2xl flex flex-col justify-between gap-3 hover:border-[#FF9466] transition-all group">
          <div className="flex flex-col gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FF9466]/20 text-[#E0663B] flex items-center justify-center font-bold">🤝</div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-[#E0663B]">Refer & Earn Program</h2>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">Share your referral code. Earn 50 BiteCoins for every verified friend with anti-abuse protection.</p>
          </div>
          <div className="flex items-center text-xs font-bold text-[#E0663B] pt-2">
            <span>View Referral Link →</span>
          </div>
        </a>
      </section>
    </div>
  `,
})
export class DashboardComponent implements OnInit {
  user: UserProfile | null = null;
  macros: MacroTargets = { daily_calories: 2000, protein_g: 150, carbs_g: 200, fat_g: 65 };

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.user$.subscribe((u) => {
      this.user = u;
      if (u?.macroTargets) {
        this.macros = u.macroTargets;
      }
    });
  }
}
