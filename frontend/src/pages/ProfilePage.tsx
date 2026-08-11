import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';
import { User, Target, Copy, Check, LogOut, Save, ShieldCheck, Mail } from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [copied, setCopied] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Profile Edit State
  const [fullName, setFullName] = useState(user?.fullName || 'Alex Morgan');
  const [email, setEmail] = useState(user?.email || 'demo@bitewise.app');

  // Macro Targets State
  const [dailyCalories, setDailyCalories] = useState(user?.macroTargets.daily_calories || 2000);
  const [protein, setProtein] = useState(user?.macroTargets.protein_g || 150);
  const [carbs, setCarbs] = useState(user?.macroTargets.carbs_g || 200);
  const [fat, setFat] = useState(user?.macroTargets.fat_g || 65);

  const handleCopyReferral = () => {
    if (user?.referralCode) {
      navigator.clipboard.writeText(user.referralCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (user) {
      const updatedUser = {
        ...user,
        fullName,
        email,
        macroTargets: {
          daily_calories: Number(dailyCalories),
          protein_g: Number(protein),
          carbs_g: Number(carbs),
          fat_g: Number(fat),
        },
      };
      localStorage.setItem('bitewise_user', JSON.stringify(updatedUser));
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto w-full">
      {/* Page Header */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#FF9466]/20 text-[#E0663B] flex items-center justify-center font-bold">
            <User className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white">Profile & Account Settings</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Update your personal information, adjust daily macro goals, or sign out of your account.
            </p>
          </div>
        </div>

        {/* Header Log Out Button */}
        <Button
          onClick={handleLogout}
          variant="outline"
          size="sm"
          className="text-rose-600 dark:text-rose-400 border-rose-500/30 hover:bg-rose-500/10 font-bold"
        >
          <LogOut className="w-4 h-4 mr-1.5" />
          Log Out
        </Button>
      </div>

      {saveSuccess && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 p-3 rounded-2xl text-xs font-bold flex items-center gap-2">
          <ShieldCheck className="w-4 h-4" />
          <span>Profile and daily nutrition targets saved successfully!</span>
        </div>
      )}

      <form onSubmit={handleSaveProfile} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Account Details & Profile Edit Card */}
        <Card className="flex flex-col gap-5">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <User className="w-5 h-5 text-[#FF9466]" />
            Personal Details
          </h2>

          <div className="flex flex-col gap-4">
            <Input
              label="Full Name"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />

            <Input
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <div className="pt-2 border-t border-slate-100 dark:border-slate-700/80">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Your Referral Code
              </span>
              <div className="flex items-center justify-between gap-2 mt-1.5 bg-slate-50 dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
                <code className="font-mono font-black text-slate-900 dark:text-white text-sm">
                  {user?.referralCode || 'BW-ALEX88'}
                </code>
                <button
                  type="button"
                  onClick={handleCopyReferral}
                  className="px-3 py-1.5 rounded-lg bg-[#FF9466] text-slate-950 text-xs font-bold flex items-center gap-1 hover:bg-[#E0663B] hover:text-white transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>
          </div>
        </Card>

        {/* Nutritional Targets Form */}
        <Card className="flex flex-col justify-between gap-5">
          <div className="flex flex-col gap-4">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Target className="w-5 h-5 text-[#38BDF8]" />
              Daily Nutrition Goals
            </h2>

            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Daily Calories (kcal)"
                type="number"
                value={dailyCalories}
                onChange={(e) => setDailyCalories(Number(e.target.value))}
              />
              <Input
                label="Protein (grams)"
                type="number"
                value={protein}
                onChange={(e) => setProtein(Number(e.target.value))}
              />
              <Input
                label="Carbohydrates (grams)"
                type="number"
                value={carbs}
                onChange={(e) => setCarbs(Number(e.target.value))}
              />
              <Input
                label="Fats (grams)"
                type="number"
                value={fat}
                onChange={(e) => setFat(Number(e.target.value))}
              />
            </div>
          </div>

          <Button type="submit" variant="primary" size="md" className="font-bold">
            <Save className="w-4 h-4 mr-2" />
            Save Profile & Goals
          </Button>
        </Card>
      </form>

      {/* Account Actions & Sign Out Section */}
      <Card className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-rose-500/20 bg-rose-500/5 dark:bg-rose-500/10 p-5">
        <div className="flex flex-col gap-0.5">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">Account Session</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Sign out of your current session on this device. Your data and BiteCoins remain saved.
          </p>
        </div>

        <Button
          onClick={handleLogout}
          variant="outline"
          size="md"
          className="text-rose-600 dark:text-rose-400 border-rose-500/40 hover:bg-rose-500/20 font-bold shrink-0"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Log Out of BiteWise
        </Button>
      </Card>
    </div>
  );
};
