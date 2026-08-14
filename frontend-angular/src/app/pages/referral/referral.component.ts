import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { UserProfile } from '../../models/user.model';

@Component({
  selector: 'app-referral',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div className="flex flex-col gap-6 max-w-4xl mx-auto w-full">
      <!-- Header -->
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-[#FF9466]/20 text-[#E0663B] flex items-center justify-center font-bold text-lg">
          🤝
        </div>
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">Refer & Earn Program</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Invite friends to BiteWise and earn +50 BiteCoins for every verified signup.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Referral Code Card -->
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 rounded-2xl p-6 flex flex-col gap-4 shadow-xs">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">Your Unique Referral Code</h2>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Share this code with your friends when they create an account. You both earn bonus BiteCoins upon verification!
          </p>

          <div className="flex items-center justify-between gap-2 bg-slate-50 dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
            <code className="font-mono font-black text-slate-900 dark:text-white text-base">
              {{ user?.referralCode || 'BW-ALEX88' }}
            </code>
            <button
              (click)="copyCode()"
              className="px-4 py-2 rounded-xl bg-[#FF9466] text-slate-950 text-xs font-bold hover:bg-[#E0663B] hover:text-white transition-colors"
            >
              {{ copied ? '✅ Copied!' : 'Copy Code' }}
            </button>
          </div>
        </div>

        <!-- Referral Stats Card -->
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 rounded-2xl p-6 flex flex-col justify-between gap-4 shadow-xs">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">Referral Stats</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1 bg-slate-50 dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Friends Invited</span>
              <span className="text-2xl font-black text-slate-900 dark:text-white">3</span>
            </div>
            <div className="flex flex-col gap-1 bg-slate-50 dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700">
              <span className="text-[10px] font-bold text-amber-500 uppercase">Coins Earned</span>
              <span className="text-2xl font-black text-amber-500">150</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class ReferralComponent implements OnInit {
  user: UserProfile | null = null;
  copied = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.user$.subscribe((u) => (this.user = u));
  }

  copyCode(): void {
    if (this.user?.referralCode) {
      navigator.clipboard.writeText(this.user.referralCode);
      this.copied = true;
      setTimeout(() => (this.copied = false), 2000);
    }
  }
}
