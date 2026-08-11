import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';
import { Flame, Utensils, Sparkles, TrendingUp, Award, Share2, ArrowRight } from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const macros = user?.macroTargets || { daily_calories: 2000, protein_g: 150, carbs_g: 200, fat_g: 65 };

  return (
    <div className="flex flex-col gap-6">
      {/* Welcome Banner */}
      <section className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-[#FF9466]/20 via-[#FFE3D1]/20 to-[#38BDF8]/20 dark:from-slate-800 dark:to-slate-800/60 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-700/80">
        <div className="flex flex-col gap-1">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#E0663B] dark:text-[#FF9466]">
            <Sparkles className="w-4 h-4" />
            <span>BiteWise Smart AI Nutrition Engine</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white">
            Welcome back, {user?.fullName || 'Nutrition Explorer'}! 👋
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xl">
            Track your daily nutrition, earn BiteCoins, and unlock personalized meal recommendations powered by cloud Smart AI.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <Link to="/ai-chat">
            <Button variant="accent" size="md">
              <Sparkles className="w-4 h-4 mr-2" />
              Ask Smart AI Assistant
            </Button>
          </Link>
          <Link to="/diary">
            <Button variant="primary" size="md">
              <Utensils className="w-4 h-4 mr-2" />
              Open Food Diary
            </Button>
          </Link>
        </div>
      </section>

      {/* Daily Nutrition Macro Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Calories Card */}
        <Card className="flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Calories Today
            </span>
            <div className="w-8 h-8 rounded-lg bg-orange-500/10 text-orange-500 flex items-center justify-center">
              <Flame className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">1,240</span>
              <span className="text-sm text-slate-500 font-medium">/ {macros.daily_calories} kcal</span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-700 h-2 rounded-full mt-3 overflow-hidden">
              <div className="bg-[#FF9466] h-full rounded-full w-[62%]" />
            </div>
          </div>
        </Card>

        {/* Protein Card */}
        <Card className="flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Protein Target
            </span>
            <div className="w-8 h-8 rounded-lg bg-rose-500/10 text-rose-500 flex items-center justify-center font-bold text-xs">
              P
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">105g</span>
              <span className="text-sm text-slate-500 font-medium">/ {macros.protein_g}g</span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-700 h-2 rounded-full mt-3 overflow-hidden">
              <div className="bg-rose-500 h-full rounded-full w-[65%]" />
            </div>
          </div>
        </Card>

        {/* Carbs Card */}
        <Card className="flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Carbohydrates
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold text-xs">
              C
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">130g</span>
              <span className="text-sm text-slate-500 font-medium">/ {macros.carbs_g}g</span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-700 h-2 rounded-full mt-3 overflow-hidden">
              <div className="bg-amber-500 h-full rounded-full w-[61%]" />
            </div>
          </div>
        </Card>

        {/* Fats Card */}
        <Card className="flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Healthy Fats
            </span>
            <div className="w-8 h-8 rounded-lg bg-sky-500/10 text-sky-500 flex items-center justify-center font-bold text-xs">
              F
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">42g</span>
              <span className="text-sm text-slate-500 font-medium">/ {macros.fat_g}g</span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-700 h-2 rounded-full mt-3 overflow-hidden">
              <div className="bg-[#38BDF8] h-full rounded-full w-[64%]" />
            </div>
          </div>
        </Card>
      </section>

      {/* Features Showcase Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link to="/ai-chat">
          <Card className="flex flex-col justify-between gap-3 h-full hover:border-[#38BDF8] transition-all group">
            <div className="flex flex-col gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#38BDF8]/20 text-[#0284C7] dark:text-[#38BDF8] flex items-center justify-center font-bold">
                <Sparkles className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-[#0284C7] dark:group-hover:text-[#38BDF8] transition-colors">
                BiteWise Smart AI Chat
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Cloud Smart AI with tool calling for natural meal parsing, recipe analysis, and custom meal planning.
              </p>
            </div>
            <div className="flex items-center text-xs font-bold text-[#0284C7] dark:text-[#38BDF8] pt-2">
              <span>Launch Smart AI Chat</span>
              <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
            </div>
          </Card>
        </Link>

        <Link to="/rewards">
          <Card className="flex flex-col justify-between gap-3 h-full hover:border-amber-500/50 transition-all group">
            <div className="flex flex-col gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold">
                <Award className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-amber-500 transition-colors">
                BiteCoins & Rewards Store
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Earn BiteCoins from meal logging & streaks. Redeem for real coupon codes, OLED themes, and discounts.
              </p>
            </div>
            <div className="flex items-center text-xs font-bold text-amber-500 pt-2">
              <span>Open Rewards Store</span>
              <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
            </div>
          </Card>
        </Link>

        <Link to="/referral">
          <Card className="flex flex-col justify-between gap-3 h-full hover:border-[#FF9466] transition-all group">
            <div className="flex flex-col gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#FF9466]/20 text-[#E0663B] flex items-center justify-center font-bold">
                <Share2 className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-[#E0663B] transition-colors">
                Refer & Earn Program
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Share your referral code. Earn 50 BiteCoins for every verified friend with anti-abuse protection.
              </p>
            </div>
            <div className="flex items-center text-xs font-bold text-[#E0663B] pt-2">
              <span>View Referral Link</span>
              <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
            </div>
          </Card>
        </Link>
      </section>
    </div>
  );
};
