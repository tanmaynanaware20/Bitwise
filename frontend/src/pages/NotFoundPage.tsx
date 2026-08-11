import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Apple, Home } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 text-center flex flex-col items-center gap-4">
        <div className="w-16 h-16 rounded-2xl bg-[#FFBE91]/20 text-[#E09B6E] flex items-center justify-center">
          <Apple className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white">404 - Page Not Found</h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link to="/" className="w-full mt-2">
          <Button variant="primary" fullWidth>
            <Home className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </Link>
      </Card>
    </div>
  );
};
