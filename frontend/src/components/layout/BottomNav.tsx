import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Sparkles, Utensils, Gift, Share2, User } from 'lucide-react';

export const BottomNav: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'AI Chat', path: '/ai-chat', icon: Sparkles, badge: 'AI' },
    { name: 'Diary', path: '/diary', icon: Utensils },
    { name: 'Rewards', path: '/rewards', icon: Gift },
    { name: 'Refer', path: '/referral', icon: Share2 },
    { name: 'Profile', path: '/profile', icon: User },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg border-t border-slate-200/80 dark:border-slate-800/80 px-2 py-1.5 pb-[calc(0.375rem+env(safe-area-inset-bottom))] shadow-lg">
      <nav className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-xl transition-all min-w-[50px] min-h-[44px] justify-center ${
                isActive
                  ? 'text-slate-900 dark:text-white font-semibold'
                  : 'text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
              }`}
            >
              <div className="relative">
                <Icon
                  className={`w-4 h-4 transition-transform ${
                    isActive ? 'scale-110 text-[#FFBE91]' : ''
                  }`}
                />
                {item.badge && (
                  <span className="absolute -top-1.5 -right-2 bg-[#81D4FA] dark:bg-[#38BDF8] text-slate-900 text-[8px] font-bold px-1 rounded-full">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] tracking-tight">{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};
