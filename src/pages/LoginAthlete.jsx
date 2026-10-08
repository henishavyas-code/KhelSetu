import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Activity, ArrowRight } from 'lucide-react';
import { authService } from '../services/authService';

export const LoginAthlete = () => {
  const navigate = useNavigate();
  const [mobile, setMobile] = useState('aarav@khelsetu.demo');

  const handleLogin = (e) => {
    e.preventDefault();
    authService.loginAthleteDemo();
    navigate('/athlete/home');
  };

  const handleDemoLogin = () => {
    authService.loginAthleteDemo();
    navigate('/athlete/home');
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 pt-28 pb-20">
      <div className="bg-[#0B0F17] border border-emerald-500/30 rounded-3xl p-8 sm:p-10 max-w-md w-full space-y-8 shadow-2xl relative overflow-hidden">
        
        <div className="space-y-3 text-center">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mx-auto">
            <User className="w-6 h-6 text-emerald-400" />
          </div>
          <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest block">ATHLETE PORTAL LOGIN</span>
          <h1 className="font-display text-3xl font-extrabold text-white">
            MEASURE WHAT YOU CAN BECOME.
          </h1>
          <p className="text-xs text-slate-400 font-mono">
            Standardized athletic assessment, built for the grassroots.
          </p>
        </div>

        {/* DEMO ATHLETE LOGIN BUTTON */}
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-3 font-mono text-xs">
          <div className="flex items-center justify-between text-slate-300 font-bold">
            <span>DEMO ATHLETE (AARAV PATEL)</span>
            <span className="text-emerald-400">READY</span>
          </div>
          <p className="text-slate-400 text-[11px]">
            Kheda, Gujarat · Age 17 · ID: KS-ATH-10482
          </p>
          <button
            onClick={handleDemoLogin}
            className="w-full py-3 rounded-xl font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-colors"
          >
            DEMO ATHLETE LOGIN →
          </button>
        </div>

        <form onSubmit={handleLogin} className="space-y-4 font-mono text-xs pt-2">
          <div>
            <label className="text-slate-400 block mb-1">EMAIL / MOBILE NUMBER</label>
            <input
              type="text"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
          >
            SIGN IN
          </button>
        </form>

        <div className="text-center font-mono text-xs">
          <Link to="/athlete/register" className="text-slate-400 hover:text-emerald-400">
            Need an account? Create Athlete Account →
          </Link>
        </div>

      </div>
    </div>
  );
};
