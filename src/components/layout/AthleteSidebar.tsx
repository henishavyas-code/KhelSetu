import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Activity,
  BarChart3,
  Trophy,
  History,
  User,
  Settings,
  LogOut
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export const AthleteSidebar: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const navItems = [
    { name: 'Dashboard', path: '/app/dashboard', icon: LayoutDashboard },
    { name: 'Assessments', path: '/app/assessments', icon: Activity },
    { name: 'Performance', path: '/app/performance', icon: BarChart3 },
    { name: 'Leaderboard', path: '/app/leaderboard', icon: Trophy },
    { name: 'History', path: '/app/history', icon: History },
    { name: 'Profile', path: '/app/profile', icon: User }
  ];

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col justify-between h-screen sticky top-0 shrink-0 hidden md:flex">
      {/* Top Brand */}
      <div>
        <div className="p-6 border-b border-slate-100 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-black text-lg shadow-md shadow-emerald-600/20">
            K
          </div>
          <div>
            <span className="font-display font-black text-xl tracking-wider text-slate-900">
              KHEL<span className="text-emerald-600">SETU</span>
            </span>
            <span className="block text-[9px] uppercase tracking-widest text-emerald-600 font-bold -mt-0.5">
              Athlete Portal
            </span>
          </div>
        </div>

        {/* Navigation List */}
        <nav className="p-4 space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`
                }
              >
                <Icon className="w-5 h-5 shrink-0" />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-slate-100 space-y-2">
        <NavLink
          to="/app/settings"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
              isActive
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`
          }
        >
          <Settings className="w-5 h-5 shrink-0" />
          <span>Settings</span>
        </NavLink>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
        >
          <LogOut className="w-5 h-5 shrink-0" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};
