import React from 'react';
import { Inbox } from 'lucide-react';
import { Button } from './Button';

export interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  actionText?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon,
  actionText,
  onAction
}) => {
  return (
    <div className="bg-[#11161E] border border-slate-800/80 rounded-xl p-8 text-center flex flex-col items-center justify-center space-y-4">
      <div className="w-14 h-14 rounded-full bg-slate-800/80 flex items-center justify-center text-slate-400">
        {icon || <Inbox className="w-7 h-7" />}
      </div>
      <div className="max-w-sm space-y-1">
        <h3 className="text-base font-bold text-white font-display">{title}</h3>
        <p className="text-xs text-slate-400 leading-relaxed">{description}</p>
      </div>
      {actionText && onAction && (
        <Button variant="primary" size="sm" onClick={onAction}>
          {actionText}
        </Button>
      )}
    </div>
  );
};
