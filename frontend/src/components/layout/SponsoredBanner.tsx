import React from 'react';
import { ExternalLink, Sparkles } from 'lucide-react';

export const SponsoredBanner: React.FC = () => {
  return (
    <div className="w-full bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 rounded-xl p-3 shadow-xs flex items-center justify-between gap-3 text-xs">
      <div className="flex items-center gap-2.5 min-w-0">
        <span className="shrink-0 inline-flex items-center gap-1 bg-amber-500/10 text-amber-600 dark:text-amber-400 px-2 py-0.5 rounded-md font-semibold text-[10px] uppercase tracking-wider">
          <Sparkles className="w-3 h-3" />
          Sponsored
        </span>
        <p className="text-slate-600 dark:text-slate-300 font-medium truncate">
          <strong className="text-slate-900 dark:text-white font-semibold">NutriPure:</strong> Clean plant-based protein for active lifestyles.
        </p>
      </div>
      <a
        href="https://example.com"
        target="_blank"
        rel="noopener noreferrer"
        className="shrink-0 text-[#FFBE91] hover:text-[#E09B6E] font-semibold flex items-center gap-1 transition-colors"
      >
        <span>Learn More</span>
        <ExternalLink className="w-3.5 h-3.5" />
      </a>
    </div>
  );
};
