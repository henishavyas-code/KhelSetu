import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
  activeBorder?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  hoverEffect = false,
  activeBorder = false,
  className = '',
  ...props
}) => {
  return (
    <div
      className={`bg-white border ${
        activeBorder ? 'border-emerald-500/60 ring-2 ring-emerald-500/10' : 'border-slate-200/80'
      } rounded-2xl p-6 shadow-xs ${hoverEffect ? 'card-hover-shadow cursor-pointer' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
