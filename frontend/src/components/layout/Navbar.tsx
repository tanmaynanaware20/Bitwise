import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ThemeToggle } from '../ui/ThemeToggle';
import { BiteCoinBadge } from '../ui/BiteCoinBadge';
import { useAuth } from '../../context/AuthContext';
import {
  Sparkles,
  LayoutDashboard,
  Utensils,
  Award,
  Share2,
  User,
  Apple,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const { user } = useAuth();

  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { path: '/', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/ai-chat', label: 'Smart AI', icon: Sparkles },
    { path: '/diary', label: 'Food Diary', icon: Utensils },
    { path: '/rewards', label: 'Rewards', icon: Award },
    { path: '/referral', label: 'Refer & Earn', icon: Share2 },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-[#0F172A]/95 backdrop-blur-md border-b border-[#FF9466]/30 dark:border-slate-800 shadow-sm shadow-[#FF9466]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* BiteWise Brand Logo -> Navigates to Main Page (Dashboard) */}
        <Link to="/" onClick={handleLogoClick} className="flex items-center gap-2.5 shrink-0 group" title="Return to BiteWise Main Page">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#FF9466] to-[#E0663B] text-white flex items-center justify-center shadow-md shadow-[#FF9466]/30 group-hover:scale-105 transition-transform duration-300">
            <Apple className="w-6 h-6 fill-current" />
          </div>
          <div className="flex flex-col">
            <span className="font-black text-lg text-slate-900 dark:text-white leading-none tracking-tight">
              Bite<span className="text-[#FF9466]">Wise</span>
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#D0552B] dark:text-slate-400">
              Smart AI Engine
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1.5">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold ${
                  isActive
                    ? 'bg-[#FF9466]/15 text-[#C84A20] dark:text-[#FF9466] border border-[#FF9466]/40 shadow-2xs'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-[#FF9466]/10 dark:hover:bg-slate-800/80 hover:text-[#C84A20] dark:hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Action Controls & User Profile */}
        <div className="flex items-center gap-3">
          <BiteCoinBadge amount={user?.bitecoinBalance || 240} size="md" />
          <ThemeToggle />

          <Link
            to="/profile"
            className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 flex items-center justify-center hover:bg-[#FF9466]/20 hover:border-[#FF9466]/40 dark:hover:bg-slate-700 shadow-2xs"
            title="User Profile"
          >
            <User className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </header>
  );
};
