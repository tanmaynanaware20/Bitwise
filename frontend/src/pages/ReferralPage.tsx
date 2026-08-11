import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';
import { Share2, Copy, Check, ShieldCheck, Users, Coins, Gift } from 'lucide-react';

export const ReferralPage: React.FC = () => {
  const { user } = useAuth();
  const [copied, setCopied] = useState(false);

  const referralLink = `https://bitewise.app/signup?ref=${user?.referralCode || 'BW-WELCOME'}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto w-full">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-sky-500/10 via-sky-400/10 to-[#FFBE91]/20 p-6 rounded-3xl border border-sky-500/20">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-sky-500/20 text-[#0284C7] dark:text-[#38BDF8] flex items-center justify-center font-bold shadow-xs">
            <Share2 className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              Refer & Earn BiteCoins
            </h1>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Invite friends to BiteWise. You both receive 50 BiteCoins upon account verification.
            </p>
          </div>
        </div>
      </div>

      {/* Referral Link & Code Card */}
      <Card className="flex flex-col gap-4 p-6">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Gift className="w-5 h-5 text-[#FFBE91]" />
          Your Personal Referral Link
        </h2>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 bg-slate-50 dark:bg-slate-900 p-3 rounded-2xl border border-slate-200 dark:border-slate-700">
          <code className="flex-1 font-mono text-xs font-bold text-slate-800 dark:text-slate-200 truncate px-2">
            {referralLink}
          </code>
          <Button variant="primary" size="sm" onClick={handleCopy} className="shrink-0">
            {copied ? <Check className="w-4 h-4 mr-1" /> : <Copy className="w-4 h-4 mr-1" />}
            {copied ? 'Copied Link' : 'Copy Link'}
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2 pt-4 border-t border-slate-100 dark:border-slate-700/80 text-xs">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold">
              1
            </div>
            <div>
              <span className="font-bold text-slate-900 dark:text-white">Share Link</span>
              <p className="text-[10px] text-slate-400">Send code to friends or social followers</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60">
            <div className="w-8 h-8 rounded-lg bg-sky-500/10 text-sky-500 flex items-center justify-center font-bold">
              2
            </div>
            <div>
              <span className="font-bold text-slate-900 dark:text-white">Friend Registers</span>
              <p className="text-[10px] text-slate-400">Friend completes email verification</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-bold">
              3
            </div>
            <div>
              <span className="font-bold text-slate-900 dark:text-white">Earn +50 Coins</span>
              <p className="text-[10px] text-slate-400">Both receive 50 BiteCoins instantly</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Anti-Abuse Integrity Card */}
      <Card className="flex flex-col gap-3 p-6 bg-slate-900/5 dark:bg-slate-800/40">
        <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-sm">
          <ShieldCheck className="w-5 h-5 text-emerald-500" />
          <span>Anti-Abuse & Fraud Protection System</span>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          To protect the BiteCoins reward economy, referrals are validated using IP subnet checks, device fingerprinting, and requiring the referee to log at least 3 active meals before coins are unlocked. Max 100 BiteCoins per user/day from referral activities.
        </p>
      </Card>
    </div>
  );
};
