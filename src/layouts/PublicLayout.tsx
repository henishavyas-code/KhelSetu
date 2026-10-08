import React from 'react';
import { Outlet } from 'react-router-dom';
import { PublicNavbar } from '../components/layout/PublicNavbar';
import { PublicFooter } from '../components/layout/PublicFooter';

export const PublicLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F8FAF9] text-slate-900 flex flex-col font-sans selection:bg-emerald-500 selection:text-white">
      <PublicNavbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <PublicFooter />
    </div>
  );
};
