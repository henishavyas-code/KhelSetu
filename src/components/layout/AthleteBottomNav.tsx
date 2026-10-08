import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Activity, BarChart3, Trophy, User } from 'lucide-react';

export const AthleteBottomNav: React.FC = () => {
  const navItems = [
    { name: 'Dashboard', path: '/app/dashboard', icon: LayoutDashboard },
    { name: 'Tests', path: '/app/assessments', icon: Activity },
    { name: 'Metrics', path: '/app/performance', icon: BarChart3 },
    { name: 'Ranks', path: '/app/leaderboard', icon: Trophy },
    { name: 'Profile', path: '/app/profile', icon: User }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 md:hidden px-2 py-2">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 py-1 px-3 rounded-lg text-[11px] font-bold transition-all ${
                  isActive ? 'text-emerald-600 font-extrabold' : 'text-slate-500 hover:text-slate-800'
                }`
              }
            >
              <Icon className="w-5 h-5" />
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};
