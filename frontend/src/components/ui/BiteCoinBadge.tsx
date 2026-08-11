import React from 'react';
import { Coins } from 'lucide-react';

interface BiteCoinBadgeProps {
  amount?: number;
  balance?: number;
  size?: 'sm' | 'md' | 'lg';
}

export const BiteCoinBadge: React.FC<BiteCoinBadgeProps> = ({ amount, balance, size = 'md' }) => {
  const val = amount ?? balance ?? 0;
  
  const sizeClasses = {
    sm: 'px-2.5 py-1 text-[11px]',
    md: 'px-3 py-1.5 text-xs',
    lg: 'px-4 py-2 text-sm',
  };

  return (
    <div
      className={`inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 dark:bg-amber-400/15 border border-amber-500/20 dark:border-amber-400/30 text-amber-600 dark:text-amber-400 font-bold transition-transform hover:scale-105 ${sizeClasses[size]}`}
    >
      <Coins className="w-4 h-4 text-amber-500 fill-amber-500/20" />
      <span>{val.toLocaleString()} BiteCoins</span>
    </div>
  );
};
