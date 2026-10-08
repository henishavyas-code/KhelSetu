import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, ArrowRight, CheckCircle2 } from 'lucide-react';

export const AthleteRegister = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    district: 'Kheda',
    state: 'Gujarat',
    age: '17'
  });

  const handleRegister = (e) => {
    e.preventDefault();
    navigate('/athlete/home');
  };

  const handleDemoLogin = () => {
    navigate('/athlete/home');
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 pt-28 pb-20">
      <div className="bg-[#0B0F17] border border-emerald-500/30 rounded-3xl p-8 sm:p-10 max-w-md w-full space-y-8 shadow-2xl relative overflow-hidden">
        
        <div className="space-y-3 text-center">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mx-auto">
            <User className="w-6 h-6 text-emerald-400" />
          </div>
          <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest block">ATHLETE REGISTRATION</span>
          <h1 className="font-display text-3xl font-extrabold text-white">
            MEASURE WHAT YOU CAN BECOME.
          </h1>
          <p className="text-xs text-slate-400 font-mono">
            Standardized athletic assessment, built for the grassroots.
          </p>
        </div>

        {/* DEMO ATHLETE LOGIN QUICK TRIGGER */}
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-3 font-mono text-xs">
          <div className="flex items-center justify-between text-slate-300 font-bold">
            <span>DEMO ATHLETE ACCOUNT</span>
            <span className="text-emerald-400">READY</span>
          </div>
          <p className="text-slate-400 text-[11px]">
            Aarav Patel · 17 · Kheda, Gujarat (ID: KS-ATH-10482)
          </p>
          <button
            onClick={handleDemoLogin}
            className="w-full py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold flex items-center justify-center gap-2 transition-colors"
          >
            DEMO ATHLETE LOGIN →
          </button>
        </div>

        <div className="relative flex py-2 items-center">
          <div className="flex-grow border-t border-slate-800"></div>
          <span className="flex-shrink mx-4 text-slate-500 font-mono text-[10px] uppercase">OR REGISTER NEW</span>
          <div className="flex-grow border-t border-slate-800"></div>
        </div>

        <form onSubmit={handleRegister} className="space-y-4 font-mono text-xs">
          <div>
            <label className="text-slate-400 block mb-1">FULL NAME</label>
            <input
              type="text"
              placeholder="e.g. Aarav Patel"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="text-slate-400 block mb-1">EMAIL / MOBILE</label>
            <input
              type="email"
              placeholder="aarav@khelsetu.demo"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl font-bold bg-slate-800 hover:bg-slate-700 text-white transition-colors flex items-center justify-center gap-2 text-xs border border-slate-700"
          >
            CREATE ATHLETE ACCOUNT
          </button>
        </form>

        <div className="text-center font-mono text-xs">
          <Link to="/athlete/login" className="text-slate-400 hover:text-emerald-400">
            Already registered? Sign In →
          </Link>
        </div>

      </div>
    </div>
  );
};
