import React from 'react';
import { Outlet } from 'react-router-dom';
import { AthleteSidebar } from '../components/layout/AthleteSidebar';
import { AthleteHeader } from '../components/layout/AthleteHeader';
import { AthleteBottomNav } from '../components/layout/AthleteBottomNav';

export const AthleteAppLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F8FAF9] text-slate-900 flex font-sans selection:bg-emerald-500 selection:text-white">
      {/* Desktop Left Sidebar */}
      <AthleteSidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 pb-16 md:pb-0">
        <AthleteHeader />
        <main className="flex-1 p-4 md:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <AthleteBottomNav />
    </div>
  );
};
