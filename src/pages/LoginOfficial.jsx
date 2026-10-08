import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Lock, ArrowRight } from 'lucide-react';
import { authService } from '../services/authService';

export const LoginOfficial = () => {
  const navigate = useNavigate();
  const [officerId, setOfficerId] = useState('official@sai.demo');

  const handleLogin = (e) => {
    e.preventDefault();
    authService.loginOfficialDemo();
    navigate('/official/dashboard');
  };

  const handleDemoOfficialLogin = () => {
    authService.loginOfficialDemo();
    navigate('/official/dashboard');
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 pt-28 pb-20">
      <div className="bg-[#0B0F17] border border-amber-500/30 rounded-3xl p-8 sm:p-10 max-w-md w-full space-y-8 shadow-2xl relative overflow-hidden">
        
        <div className="space-y-3 text-center">
          <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center mx-auto">
            <ShieldCheck className="w-6 h-6 text-amber-400" />
          </div>
          <span className="text-xs font-mono text-amber-400 uppercase tracking-widest block">SAI OFFICIAL PORTAL LOGIN</span>
          <h1 className="font-display text-3xl font-extrabold text-white">
            VERIFY THE PERFORMANCE.
          </h1>
          <p className="text-xs text-slate-400 font-mono">
            Audit grassroots assessments through transparent performance and trust signals.
          </p>
        </div>

        {/* DEMO OFFICIAL LOGIN BUTTON */}
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-3 font-mono text-xs">
          <div className="flex items-center justify-between text-slate-300 font-bold">
            <span>DEMO SAI OFFICIAL ACCESS</span>
            <span className="text-amber-400">READY</span>
          </div>
          <p className="text-slate-400 text-[11px]">
            Senior Talent Auditor · Sports Authority of India (SAI)
          </p>
          <button
            onClick={handleDemoOfficialLogin}
            className="w-full py-3 rounded-xl font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-colors"
          >
            DEMO OFFICIAL ACCESS →
          </button>
        </div>

        <form onSubmit={handleLogin} className="space-y-4 font-mono text-xs pt-2">
          <div>
            <label className="text-slate-400 block mb-1">OFFICER EMAIL / ID</label>
            <input
              type="text"
              value={officerId}
              onChange={(e) => setOfficerId(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
          >
            ACCESS CONSOLE
          </button>
        </form>

        <div className="text-center font-mono text-[11px] text-slate-500">
          ● DEMO ENVIRONMENT ACTIVE · Direct console access
        </div>

      </div>
    </div>
  );
};
