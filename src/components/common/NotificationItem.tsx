import React from 'react';
import { Notification } from '../../types';
import { Award, Trophy, Activity, Bell } from 'lucide-react';

export interface NotificationItemProps {
  notification: Notification;
  onMarkRead: (id: string) => void;
}

export const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
  onMarkRead
}) => {
  const iconMap = {
    assessment: <Activity className="w-4 h-4 text-emerald-400" />,
    achievement: <Award className="w-4 h-4 text-amber-400" />,
    rank_change: <Trophy className="w-4 h-4 text-lime-400" />,
    system: <Bell className="w-4 h-4 text-cyan-400" />
  };

  return (
    <div
      onClick={() => onMarkRead(notification.id)}
      className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
        notification.read
          ? 'bg-[#0D1117] border-slate-800/60 opacity-70'
          : 'bg-[#11161E] border-emerald-500/30 shadow-md'
      }`}
    >
      <div className="flex gap-3">
        <div className="w-8 h-8 rounded-lg bg-slate-800/80 flex items-center justify-center shrink-0">
          {iconMap[notification.type]}
        </div>
        <div className="flex-1 space-y-1">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-white">{notification.title}</h4>
            <span className="text-[10px] text-slate-400">{notification.timestamp}</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">{notification.message}</p>
        </div>
      </div>
    </div>
  );
};
