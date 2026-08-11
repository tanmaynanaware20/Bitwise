import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';
import { Apple, AlertCircle, Loader2, Lock, ShieldCheck, UserPlus } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, isLoading, error, clearError } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    clearError();

    const success = await login(email, password);
    if (success) {
      navigate('/');
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto flex flex-col items-center py-6">
      {/* Step 1 Lock Indicator Banner */}
      <div className="mb-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF9466]/15 border border-[#FF9466]/40 text-[#C84A20] dark:text-[#FF9466] text-xs font-black uppercase tracking-wider">
        <Lock className="w-3.5 h-3.5" />
        <span>Step 1: Account Authentication Gate</span>
      </div>

      <Card className="w-full p-8 shadow-2xl flex flex-col gap-6 border-[#FF9466]/30 dark:border-slate-700">
        <div className="flex flex-col items-center text-center gap-2">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#FF9466] to-[#E0663B] text-white flex items-center justify-center shadow-lg shadow-[#FF9466]/30 mb-1">
            <Apple className="w-8 h-8 fill-current" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            Welcome to BiteWise
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-sm">
            Please sign in or create an account to unlock your Smart AI Nutrition Engine & Food Diary.
          </p>
        </div>

        {/* Tab Navigation between Sign In and Sign Up */}
        <div className="grid grid-cols-2 gap-2 bg-slate-100 dark:bg-slate-900 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800">
          <button
            type="button"
            className="py-2.5 px-3 rounded-xl text-xs font-extrabold bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-2xs text-center"
          >
            Sign In
          </button>
          <Link
            to="/signup"
            className="py-2.5 px-3 rounded-xl text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white text-center flex items-center justify-center gap-1"
          >
            <UserPlus className="w-3.5 h-3.5" />
            Create Account (Step 1)
          </Link>
        </div>

        {error && (
          <div className="bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 p-3 rounded-xl text-xs flex items-center gap-2 font-bold">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            label="Email Address"
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (error) clearError();
            }}
            required
          />
          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (error) clearError();
            }}
            required
          />

          <Button type="submit" variant="primary" fullWidth size="lg" disabled={isLoading} className="mt-2 font-extrabold text-base">
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Unlocking Features...
              </>
            ) : (
              'Sign In & Unlock Features'
            )}
          </Button>
        </form>

        <div className="flex items-center justify-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-slate-400 text-[11px] font-semibold">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span>Encrypted Cloud Authentication & Anti-Abuse Protection</span>
        </div>
      </Card>
    </div>
  );
};
