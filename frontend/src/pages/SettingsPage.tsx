import React from 'react';
import { Card } from '../components/ui/Card';
import { useTheme } from '../context/ThemeContext';
import { Settings, Moon, Sun, Shield, Bell, Smartphone } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex flex-col gap-6 max-w-3xl mx-auto w-full">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-[#81D4FA]/20 text-[#0284C7] dark:text-[#38BDF8] flex items-center justify-center">
          <Settings className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">Application Settings</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Customize theme appearance, notification preferences, and privacy controls.
          </p>
        </div>
      </div>

      <Card className="flex flex-col gap-6">
        {/* Appearance Settings */}
        <div className="flex flex-col gap-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Appearance & Theme
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setTheme('light')}
              className={`p-4 rounded-xl border flex items-center justify-between transition-all ${
                theme === 'light'
                  ? 'border-[#FFBE91] bg-[#FFBE91]/10 text-slate-900 font-bold'
                  : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Sun className="w-5 h-5 text-amber-500" />
                <span>Light Mode</span>
              </div>
              {theme === 'light' && <span className="text-xs text-[#E09B6E] font-bold">Active</span>}
            </button>

            <button
              onClick={() => setTheme('dark')}
              className={`p-4 rounded-xl border flex items-center justify-between transition-all ${
                theme === 'dark'
                  ? 'border-[#38BDF8] bg-[#38BDF8]/10 text-white font-bold'
                  : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Moon className="w-5 h-5 text-sky-400" />
                <span>Dark Mode</span>
              </div>
              {theme === 'dark' && <span className="text-xs text-[#38BDF8] font-bold">Active</span>}
            </button>
          </div>
        </div>

        {/* Cross Platform Compatibility Info */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-700 flex flex-col gap-2">
          <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-sm">
            <Smartphone className="w-4 h-4 text-[#FFBE91]" />
            <span>Cross-Platform Ready Architecture</span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            BiteWise core business logic and state stores are structured for seamless future export to React Native / Expo.
          </p>
        </div>
      </Card>
    </div>
  );
};
