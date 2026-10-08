import React, { useState } from 'react';
import { Bell, Flame, Search } from 'lucide-react';
import { AthleteAvatar } from '../common/AthleteAvatar';
import { Drawer } from '../common/Drawer';
import { NotificationItem } from '../common/NotificationItem';
import { useNotifications } from '../../hooks/useNotifications';
import { CURRENT_ATHLETE_PROFILE } from '../../data/mockProfiles';

export const AthleteHeader: React.FC = () => {
  const [notifDrawerOpen, setNotifDrawerOpen] = useState(false);
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();

  return (
    <>
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 md:px-8 py-3 flex items-center justify-between">
        {/* Left Mobile Brand */}
        <div className="flex items-center gap-3 md:hidden">
          <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-black text-sm">
            K
          </div>
          <span className="font-display font-black text-lg text-slate-900">KHELSETU</span>
        </div>

        {/* Search Input */}
        <div className="hidden md:flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 w-72">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search assessments, sports..."
            className="bg-transparent text-xs font-medium text-slate-900 placeholder-slate-400 focus:outline-none w-full"
          />
        </div>

        {/* Right Info Badges */}
        <div className="flex items-center gap-4">
          {/* Streak Indicator */}
          <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full text-xs font-bold text-amber-700">
            <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span>{CURRENT_ATHLETE_PROFILE.streakDays} Day Streak</span>
          </div>

          {/* Notifications Trigger */}
          <button
            onClick={() => setNotifDrawerOpen(true)}
            className="relative p-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 hover:text-slate-900 hover:border-slate-300 transition-all cursor-pointer"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-600 text-white rounded-full text-[10px] font-black flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Athlete Avatar */}
          <div className="flex items-center gap-2">
            <AthleteAvatar
              src={CURRENT_ATHLETE_PROFILE.avatar}
              name={CURRENT_ATHLETE_PROFILE.name}
              level={CURRENT_ATHLETE_PROFILE.level}
            />
            <div className="hidden sm:block">
              <span className="block text-xs font-bold text-slate-900 font-display">
                {CURRENT_ATHLETE_PROFILE.name}
              </span>
              <span className="block text-[10px] text-emerald-600 font-bold uppercase">
                {CURRENT_ATHLETE_PROFILE.level} Level
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Notifications Drawer */}
      <Drawer
        isOpen={notifDrawerOpen}
        onClose={() => setNotifDrawerOpen(false)}
        title="Notifications"
      >
        <div className="space-y-4">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-500 font-bold">{notifications.length} alerts</span>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-emerald-600 font-bold hover:underline cursor-pointer"
              >
                Mark all as read
              </button>
            )}
          </div>

          <div className="space-y-2.5">
            {notifications.map((n) => (
              <NotificationItem key={n.id} notification={n} onMarkRead={markAsRead} />
            ))}
          </div>
        </div>
      </Drawer>
    </>
  );
};
