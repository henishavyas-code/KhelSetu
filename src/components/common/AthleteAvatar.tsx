import React from 'react';

export interface AthleteAvatarProps {
  src: string;
  name: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  level?: string;
  verified?: boolean;
}

export const AthleteAvatar: React.FC<AthleteAvatarProps> = ({
  src,
  name,
  size = 'md',
  level,
  verified = false
}) => {
  const sizeStyles = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-14 h-14 text-base',
    xl: 'w-20 h-20 text-xl'
  };

  const levelBorder = {
    Elite: 'border-amber-400 shadow-amber-500/20',
    Gold: 'border-yellow-400 shadow-yellow-500/20',
    Silver: 'border-slate-300 shadow-slate-400/20',
    Bronze: 'border-amber-700 shadow-amber-800/20'
  };

  const borderColor = level && levelBorder[level as keyof typeof levelBorder] ? levelBorder[level as keyof typeof levelBorder] : 'border-emerald-500/40';

  return (
    <div className="relative inline-block shrink-0">
      <img
        src={src}
        alt={name}
        className={`${sizeStyles[size]} rounded-full object-cover border-2 ${borderColor} shadow-md`}
      />
      {verified && (
        <span className="absolute -bottom-0.5 -right-0.5 bg-emerald-500 text-neutral-950 rounded-full p-0.5 ring-2 ring-[#07090E]">
          <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 20 20">
            <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
          </svg>
        </span>
      )}
    </div>
  );
};
