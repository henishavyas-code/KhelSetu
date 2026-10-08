import React from 'react';
import { Cpu, Smartphone, Database, RefreshCw, ShieldCheck, Server, Lock } from 'lucide-react';

export const Platform = () => {
  const architectureSteps = [
    { num: '01', title: 'CAPTURE', desc: 'Budget smartphone records video at 30-60 FPS in rural grounds.', icon: Smartphone },
    { num: '02', title: 'ON-DEVICE INTELLIGENCE', desc: 'Lightweight pose estimation engine calculates 23 keypoint arrays on-device.', icon: Cpu },
    { num: '03', title: 'OFFLINE LOCAL STORAGE', desc: 'SQLite database persists keypoints, biometric hashes, and rep timestamps offline.', icon: Database },
    { num: '04', title: 'SECURE SYNC LAYER', desc: 'Automatic background retry worker flushes local queue upon cell signal restoration.', icon: RefreshCw },
    { num: '05', title: 'VERIFICATION ENGINE', desc: 'SHA-256 fingerprint matching & rep cadence anomaly detection prevents video tampering.', icon: Lock },
    { num: '06', title: 'OFFICIAL REVIEW', desc: 'SAI officials audit flagged submissions and identify national grassroots champions.', icon: ShieldCheck }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 space-y-16">
      
      {/* Page Title */}
      <div className="text-left space-y-4 max-w-3xl">
        <span className="text-xs font-mono text-emerald-400 tracking-widest uppercase">TECHNICAL ARCHITECTURE</span>
        <h1 className="font-display text-4xl sm:text-6xl font-extrabold text-white">
          THE KHELSETU PLATFORM PIPELINE
        </h1>
        <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
          Engineered specifically for low-connectivity environments. KhelSetu combines edge computer vision, offline persistence, and cryptographic verification to deliver scalable national talent identification.
        </p>
      </div>

      {/* SVG System Architecture Diagram */}
      <div className="bg-[#0B0F17] border border-emerald-500/30 rounded-3xl p-6 sm:p-10 space-y-8 shadow-2xl relative overflow-hidden">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 font-mono text-xs">
          <span className="text-emerald-400 font-bold tracking-wider">END-TO-END DATA FLOW DIAGRAM</span>
          <span className="text-slate-400">SIH PROBLEM STATEMENT: 25073</span>
        </div>

        {/* Interactive Architecture Map */}
        <div className="relative py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 font-mono text-xs relative z-10">
            
            <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 space-y-3">
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px]">STAGE 1: CLIENT</span>
              <h4 className="font-display text-base font-bold text-white">ATHLETE SMARTPHONE</h4>
              <p className="text-slate-400 text-[11px]">Camera Video Feed → On-Device Vision Engine → 23 Keypoints Array</p>
            </div>

            <div className="bg-slate-900 p-5 rounded-xl border border-amber-500/30 space-y-3">
              <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px]">STAGE 2: EDGE PERSISTENCE</span>
              <h4 className="font-display text-base font-bold text-white">LOCAL SQLITE QUEUE</h4>
              <p className="text-slate-400 text-[11px]">Offline Queue → Keypoint Serialization → Local SHA-256 Video Fingerprint</p>
            </div>

            <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 space-y-3">
              <span className="px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 text-[10px]">STAGE 3: SYNC & API</span>
              <h4 className="font-display text-base font-bold text-white">BACKGROUND SYNC ENGINE</h4>
              <p className="text-slate-400 text-[11px]">Network Switch Detector → Secure Payload → Express / Node.js API</p>
            </div>

            <div className="bg-slate-900 p-5 rounded-xl border border-emerald-500/40 space-y-3">
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px]">STAGE 4: AUDIT</span>
              <h4 className="font-display text-base font-bold text-white">SAI OFFICIAL DASHBOARD</h4>
              <p className="text-slate-400 text-[11px]">PostgreSQL Database → Forensic Risk Classifier → Official Review Console</p>
            </div>

          </div>
        </div>

      </div>

      {/* 6-Stage Detailed Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {architectureSteps.map((step) => {
          const Icon = step.icon;
          return (
            <div key={step.num} className="bg-[#0B0F17] border border-white/10 hover:border-emerald-500/50 rounded-2xl p-6 space-y-4 transition-all">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-emerald-400 font-bold">{step.num}</span>
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                  <Icon className="w-5 h-5 text-emerald-400" />
                </div>
              </div>
              <h3 className="font-display text-xl font-bold text-white">{step.title}</h3>
              <p className="text-xs text-slate-400 font-mono leading-relaxed">{step.desc}</p>
            </div>
          );
        })}
      </div>

    </div>
  );
};
