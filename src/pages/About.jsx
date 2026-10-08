import React from 'react';
import { Activity, ShieldCheck, Cpu, Target, Award } from 'lucide-react';

export const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 space-y-16">
      
      <div className="text-left space-y-4 max-w-3xl">
        <div className="flex items-center gap-2 font-mono text-xs text-emerald-400 uppercase tracking-widest">
          <span>SMART INDIA HACKATHON 2026</span>
          <span>· PROBLEM STATEMENT 25073</span>
        </div>
        <h1 className="font-display text-4xl sm:text-6xl font-extrabold text-white">
          ABOUT KHELSETU
        </h1>
        <p className="text-slate-300 text-lg leading-relaxed font-normal">
          Bridging grassroots potential with intelligent sports assessment. Built to ensure that athletic recognition is based on movement and verifiable talent, not geographic location or financial background.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 font-mono text-xs">
        <div className="bg-[#0B0F17] border border-white/10 p-8 rounded-2xl space-y-4">
          <Target className="w-8 h-8 text-emerald-400" />
          <h3 className="font-display text-2xl font-bold text-white">The SIH Challenge</h3>
          <p className="text-slate-400 leading-relaxed">
            SIH Problem Statement 25073 calls for an offline-first AI-driven talent identification engine capable of measuring athletic performance anywhere in India.
          </p>
        </div>

        <div className="bg-[#0B0F17] border border-white/10 p-8 rounded-2xl space-y-4">
          <Cpu className="w-8 h-8 text-amber-400" />
          <h3 className="font-display text-2xl font-bold text-white">Technical Core</h3>
          <p className="text-slate-400 leading-relaxed">
            Combines edge pose tracking (23 skeleton keypoints), local SQLite offline storage queue, SHA-256 cryptographic video hashing, and SAI audit dashboard integration.
          </p>
        </div>

        <div className="bg-[#0B0F17] border border-white/10 p-8 rounded-2xl space-y-4">
          <Award className="w-8 h-8 text-emerald-400" />
          <h3 className="font-display text-2xl font-bold text-white">National Impact</h3>
          <p className="text-slate-400 leading-relaxed">
            Eliminates geographic bias and provides young athletes in tier-3 villages direct visibility to national coaches and government sporting schemes.
          </p>
        </div>
      </div>

    </div>
  );
};
