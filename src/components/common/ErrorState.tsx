import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from './Button';

export interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Something Went Wrong',
  message,
  onRetry
}) => {
  return (
    <div className="bg-rose-500/10 border border-rose-500/30 rounded-xl p-6 text-center flex flex-col items-center justify-center space-y-4 max-w-lg mx-auto">
      <div className="w-12 h-12 rounded-full bg-rose-500/20 flex items-center justify-center text-rose-400">
        <AlertTriangle className="w-6 h-6" />
      </div>
      <div className="space-y-1">
        <h3 className="text-base font-bold text-white font-display">{title}</h3>
        <p className="text-xs text-rose-200/80 leading-relaxed">{message}</p>
      </div>
      {onRetry && (
        <Button
          variant="outline"
          size="sm"
          onClick={onRetry}
          leftIcon={<RefreshCw className="w-4 h-4" />}
          className="border-rose-500/40 text-rose-300 hover:bg-rose-500/20"
        >
          Try Again
        </Button>
      )}
    </div>
  );
};
