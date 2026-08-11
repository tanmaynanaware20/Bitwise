import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { BiteCoinBadge } from '../components/ui/BiteCoinBadge';
import { useAuth } from '../context/AuthContext';
import {
  Award,
  Sparkles,
  ShoppingBag,
  CheckCircle,
  Copy,
  Check,
  Tag,
  Zap,
  Gift,
  X,
  FileText,
} from 'lucide-react';

interface RewardItem {
  id: string;
  title: string;
  description: string;
  cost: number;
  category: 'AI Plans' | 'Themes' | 'Discounts' | 'Downloads';
  icon: React.ReactNode;
  couponPrefix: string;
}

interface UnlockedReward {
  rewardId: string;
  title: string;
  couponCode: string;
  unlockedAt: string;
}

export const RewardsStorePage: React.FC = () => {
  const { user } = useAuth();
  const [balance, setBalance] = useState<number>(user?.bitecoinBalance || 240);
  const [selectedReward, setSelectedReward] = useState<RewardItem | null>(null);
  const [redeemedCode, setRedeemedCode] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [unlockedRewards, setUnlockedRewards] = useState<UnlockedReward[]>(() => {
    const saved = localStorage.getItem('bitewise_unlocked_rewards');
    return saved ? JSON.parse(saved) : [];
  });

  const rewards: RewardItem[] = [
    {
      id: 'r1',
      title: '7-Day High-Protein Smart AI Meal Plan',
      description: 'Structured 7-day high protein meal plan customized to your macro targets.',
      cost: 100,
      category: 'AI Plans',
      icon: <Sparkles className="w-5 h-5 text-[#81D4FA] dark:text-[#38BDF8]" />,
      couponPrefix: 'BW-PLAN7',
    },
    {
      id: 'r2',
      title: 'Custom Obsidian OLED Dark Theme Pack',
      description: 'Unlock exclusive pitch-black OLED dark mode theme for zero eye strain.',
      cost: 50,
      category: 'Themes',
      icon: <Zap className="w-5 h-5 text-amber-500" />,
      couponPrefix: 'BW-OLED',
    },
    {
      id: 'r3',
      title: '15% Off NutriPure Organic Protein Coupon',
      description: 'Exclusive partner discount coupon code for clean plant-based protein powders.',
      cost: 150,
      category: 'Discounts',
      icon: <Tag className="w-5 h-5 text-emerald-500" />,
      couponPrefix: 'BW-NUTRI15',
    },
    {
      id: 'r4',
      title: 'Healthy Recipe PDF Card Bundle',
      description: '20+ printable gourmet macro-friendly recipe cards for fast meal prep.',
      cost: 75,
      category: 'Downloads',
      icon: <FileText className="w-5 h-5 text-rose-500" />,
      couponPrefix: 'BW-RECIPE20',
    },
  ];

  const handleRedeem = (reward: RewardItem) => {
    if (balance < reward.cost) return;

    const newBalance = balance - reward.cost;
    setBalance(newBalance);

    // Generate unique coupon code
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const code = `${reward.couponPrefix}-${randomSuffix}`;
    setRedeemedCode(code);

    // Add to unlocked list
    const newUnlocked: UnlockedReward = {
      rewardId: reward.id,
      title: reward.title,
      couponCode: code,
      unlockedAt: new Date().toLocaleDateString(),
    };

    const updatedUnlocked = [newUnlocked, ...unlockedRewards];
    setUnlockedRewards(updatedUnlocked);
    localStorage.setItem('bitewise_unlocked_rewards', JSON.stringify(updatedUnlocked));
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-6 max-w-5xl mx-auto w-full">
      {/* Top Banner */}
      <section className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-gradient-to-r from-amber-500/10 via-[#FFBE91]/20 to-[#81D4FA]/20 dark:from-slate-800 dark:to-slate-800/80 p-6 rounded-3xl border border-amber-500/20">
        <div className="flex flex-col gap-1">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">
            <Award className="w-4 h-4" />
            <span>BiteCoins Loyalty Store</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            Redeem BiteCoins & Rewards
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-lg">
            Earn coins by logging daily meals and keeping up streaks. Redeem them below for real discount coupon codes, themes, and PDF recipe bundles.
          </p>
        </div>

        <div className="flex flex-col items-end gap-1 shrink-0">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Your Balance
          </span>
          <BiteCoinBadge amount={balance} size="lg" />
        </div>
      </section>

      {/* Rewards Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {rewards.map((item) => {
          const isAffordable = balance >= item.cost;
          return (
            <Card
              key={item.id}
              className="flex flex-col justify-between gap-4 border-slate-200/80 dark:border-slate-700/80 hover:border-amber-400/50 transition-all"
            >
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0">
                  {item.icon}
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between gap-2">
                    <h2 className="text-base font-bold text-slate-900 dark:text-white">
                      {item.title}
                    </h2>
                    <span className="text-[10px] uppercase font-bold text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full shrink-0">
                      {item.category}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
                <BiteCoinBadge amount={item.cost} size="sm" />

                <Button
                  onClick={() => {
                    setSelectedReward(item);
                    handleRedeem(item);
                  }}
                  disabled={!isAffordable}
                  variant={isAffordable ? 'primary' : 'outline'}
                  size="sm"
                  className="font-bold"
                >
                  <ShoppingBag className="w-4 h-4 mr-1.5" />
                  {isAffordable ? 'Redeem Coupon' : 'Insufficient Coins'}
                </Button>
              </div>
            </Card>
          );
        })}
      </section>

      {/* My Unlocked Coupon Codes Section */}
      {unlockedRewards.length > 0 && (
        <section className="flex flex-col gap-3 mt-4">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Gift className="w-5 h-5 text-amber-500" />
            My Active Redeemed Coupon Codes ({unlockedRewards.length})
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {unlockedRewards.map((unlocked, idx) => (
              <Card key={idx} className="flex flex-col gap-2 bg-amber-500/5 dark:bg-amber-500/10 border-amber-500/30">
                <span className="text-xs font-bold text-slate-900 dark:text-white">
                  {unlocked.title}
                </span>

                <div className="flex items-center justify-between bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-amber-500/40">
                  <span className="font-mono text-sm font-black text-amber-600 dark:text-amber-400">
                    {unlocked.couponCode}
                  </span>
                  <button
                    onClick={() => handleCopyCode(unlocked.couponCode)}
                    className="flex items-center gap-1 text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-amber-500"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    Copy
                  </button>
                </div>
                <span className="text-[10px] text-slate-400">Redeemed on {unlocked.unlockedAt}</span>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* Redemption Success Modal */}
      {selectedReward && redeemedCode && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <Card className="w-full max-w-md p-6 flex flex-col gap-5 border-amber-500/50 shadow-2xl relative">
            <button
              onClick={() => {
                setSelectedReward(null);
                setRedeemedCode(null);
              }}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col items-center text-center gap-2">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-1">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white">
                Reward Redeemed Successfully!
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                You unlocked <strong className="text-slate-900 dark:text-white">{selectedReward.title}</strong> for {selectedReward.cost} BiteCoins.
              </p>
            </div>

            {/* Coupon Code Display Box */}
            <div className="flex flex-col gap-2 bg-amber-500/10 border border-amber-500/30 p-4 rounded-2xl">
              <span className="text-[11px] font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider text-center">
                Your Exclusive Coupon Code
              </span>
              <div className="flex items-center justify-between bg-white dark:bg-slate-900 px-4 py-3 rounded-xl border border-amber-500/40">
                <span className="font-mono text-lg font-black text-amber-600 dark:text-amber-400 tracking-wider">
                  {redeemedCode}
                </span>
                <Button
                  onClick={() => handleCopyCode(redeemedCode)}
                  variant="primary"
                  size="sm"
                  className="font-bold"
                >
                  {isCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5 mr-1" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 mr-1" />
                      Copy Code
                    </>
                  )}
                </Button>
              </div>
            </div>

            <Button
              onClick={() => {
                setSelectedReward(null);
                setRedeemedCode(null);
              }}
              variant="outline"
              fullWidth
              size="md"
              className="font-bold"
            >
              Done & Save Code
            </Button>
          </Card>
        </div>
      )}
    </div>
  );
};
