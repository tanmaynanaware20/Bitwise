import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { UserProfile, CouponCode } from '../../models/user.model';

interface RewardItem {
  id: string;
  title: string;
  category: 'Discount' | 'Meal Plan' | 'Theme' | 'Badge';
  cost: number;
  description: string;
  discountValue: string;
  icon: string;
}

@Component({
  selector: 'app-rewards-store',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div className="flex flex-col gap-6 max-w-4xl mx-auto w-full">
      <!-- Header -->
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-500 flex items-center justify-center font-bold text-lg">
            🎁
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white">BiteCoins & Rewards Store</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Redeem your BiteCoins for partner promo coupon codes, discounts, and OLED themes.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-amber-500/10 text-amber-600 dark:text-amber-400 px-4 py-2 rounded-full text-xs font-black">
          <span>🪙 {{ userBalance }} BiteCoins</span>
        </div>
      </div>

      <!-- Notification Banner -->
      <div *ngIf="redeemMessage" className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 p-3 rounded-2xl text-xs font-bold flex items-center justify-between">
        <span>✅ {{ redeemMessage }}</span>
        <button (click)="redeemMessage = null" className="text-slate-400 hover:text-slate-600">✕</button>
      </div>

      <!-- Rewards Grid -->
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div
          *ngFor="let reward of rewards"
          className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 rounded-2xl p-5 flex flex-col justify-between gap-4 shadow-xs"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold text-lg">
                {{ reward.icon }}
              </div>
              <div className="flex flex-col">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">{{ reward.title }}</h3>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{{ reward.category }}</span>
              </div>
            </div>

            <div className="px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-black shrink-0">
              🪙 {{ reward.cost }}
            </div>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-400">{{ reward.description }}</p>

          <button
            (click)="handleRedeemReward(reward)"
            [disabled]="userBalance < reward.cost"
            [className]="'w-full py-2.5 rounded-xl font-bold text-xs transition-all ' + (userBalance >= reward.cost ? 'bg-[#FF9466] text-slate-950 hover:bg-[#E0663B] hover:text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-400 cursor-not-allowed')"
          >
            {{ userBalance >= reward.cost ? 'Redeem for Promo Code' : 'Need ' + (reward.cost - userBalance) + ' More Coins' }}
          </button>
        </div>
      </div>

      <!-- Active Redeemed Coupons List -->
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 rounded-2xl p-5 flex flex-col gap-4 shadow-xs">
        <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <span>🎫</span> My Active Redeemed Coupon Codes
        </h2>

        <div *ngIf="redeemedCoupons.length === 0" className="text-xs text-slate-400 italic py-2">
          You have not redeemed any coupon codes yet. Earn BiteCoins and redeem rewards above!
        </div>

        <div *ngIf="redeemedCoupons.length > 0" className="flex flex-col gap-2">
          <div
            *ngFor="let coupon of redeemedCoupons"
            className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
          >
            <div className="flex flex-col gap-0.5">
              <span className="text-xs font-bold text-slate-900 dark:text-white">{{ coupon.title }}</span>
              <span className="text-[10px] text-slate-400">Redeemed on {{ coupon.redeemedAt }}</span>
            </div>

            <div className="flex items-center gap-2">
              <code className="font-mono font-black text-slate-900 dark:text-white text-xs bg-white dark:bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700">
                {{ coupon.code }}
              </code>
              <button
                (click)="copyCouponCode(coupon.code)"
                className="px-3 py-1.5 rounded-lg bg-[#FF9466] text-slate-950 text-xs font-bold hover:bg-[#E0663B] hover:text-white transition-colors"
              >
                Copy
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class RewardsStoreComponent implements OnInit {
  userBalance = 240;
  redeemMessage: string | null = null;

  rewards: RewardItem[] = [
    {
      id: 'rew-1',
      title: '15% Off Organic Nutri-Store',
      category: 'Discount',
      cost: 100,
      description: 'Get an exclusive 15% discount promo code for organic supplements and protein snacks.',
      discountValue: '15% OFF',
      icon: '🌿',
    },
    {
      id: 'rew-2',
      title: '7-Day High-Protein Meal Plan',
      category: 'Meal Plan',
      cost: 150,
      description: 'Unlock a customized 7-day high-protein recipe guide formatted per 100g base portions.',
      discountValue: '100% UNLOCKED',
      icon: '🥗',
    },
    {
      id: 'rew-3',
      title: 'OLED Pure Black Dark Theme',
      category: 'Theme',
      cost: 200,
      description: 'Unlock ultra-contrast pitch-black OLED dark mode preset for battery savings.',
      discountValue: 'THEME UNLOCKED',
      icon: '🌙',
    },
    {
      id: 'rew-4',
      title: '$10 FreshProduce Gift Card',
      category: 'Discount',
      cost: 300,
      description: 'Redeem a $10 voucher code valid at all participating organic grocery stores.',
      discountValue: '$10 OFF',
      icon: '🛒',
    },
  ];

  redeemedCoupons: CouponCode[] = [
    {
      id: 'coup-1',
      rewardId: 'rew-1',
      title: '15% Off Organic Nutri-Store',
      code: 'BW-NUTRI15-8941',
      discount: '15% OFF',
      redeemedAt: new Date().toLocaleDateString(),
    },
  ];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.user$.subscribe((u) => {
      this.userBalance = u?.bitecoinBalance || 240;
    });
  }

  handleRedeemReward(reward: RewardItem): void {
    if (this.userBalance < reward.cost) return;

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newCode: CouponCode = {
      id: `coup-${Date.now()}`,
      rewardId: reward.id,
      title: reward.title,
      code: `BW-${reward.category.toUpperCase().slice(0, 4)}${reward.cost}-${randomSuffix}`,
      discount: reward.discountValue,
      redeemedAt: new Date().toLocaleDateString(),
    };

    this.redeemedCoupons.unshift(newCode);
    this.userBalance -= reward.cost;
    this.redeemMessage = `Successfully redeemed "${reward.title}"! Promo Code: ${newCode.code}`;
  }

  copyCouponCode(code: string): void {
    navigator.clipboard.writeText(code);
    this.redeemMessage = `Coupon code "${code}" copied to clipboard!`;
  }
}
