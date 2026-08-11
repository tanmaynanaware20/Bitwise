import React from 'react';
import { useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';
import { BottomNav } from './BottomNav';
import { SponsoredBanner } from './SponsoredBanner';
import { useAuth } from '../../context/AuthContext';

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

  if (!isAuthenticated || isAuthPage) {
    return (
      <div className="min-h-dvh flex flex-col bg-[#FAF7F2] dark:bg-[#0F172A] text-slate-900 dark:text-slate-100">
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col items-center justify-center">
          {children}
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-dvh flex flex-col bg-[#FAF7F2] dark:bg-[#0F172A] text-slate-900 dark:text-slate-100">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24 md:pb-8 flex flex-col gap-6">
        <SponsoredBanner />
        {children}
      </main>

      <BottomNav />
    </div>
  );
};
