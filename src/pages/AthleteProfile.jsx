import React from 'react';
import { User, Award, MapPin, Activity, Flame, ShieldCheck, Mail, Phone } from 'lucide-react';
import { authService } from '../services/authService';

export const AthleteProfile = () => {
  const currentUser = authService.getCurrentUser() || {
    name: 'Aarav Patel',
    age: 18,
    sport: 'Athletics & Field',
    experienceLevel: 'Intermediate',
    district: 'Kheda',
    state: 'Gujarat',
    email: 'aarav@khelsetu.in',
    phone: '+91 98765 43210',
    khelScore: 87,
    assessmentsCompleted: 14,
    streak: 4,
    personalBests: { pushups: 34, squats: 48, jumpingJacks: 72 }
  };

  return (
    <div className="bg-slate-50 min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="max-w-4xl mx-auto space-y-8">

        {/* Profile Card Header */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 border-b border-slate-100 pb-6 text-center sm:text-left">
            <div className="w-20 h-20 rounded-2xl bg-[#0B192C] text-white flex items-center justify-center font-bold text-3xl shrink-0">
              {currentUser.name.charAt(0)}
            </div>

            <div className="space-y-1">
              <span className="px-3 py-0.5 rounded-full bg-orange-100 text-orange-800 text-[11px] font-bold">
                Athlete Profile
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">{currentUser.name}</h1>
              <p className="text-xs text-slate-500 font-semibold flex items-center justify-center sm:justify-start gap-1">
                <MapPin className="w-3.5 h-3.5 text-orange-500" />
                {currentUser.district || 'Kheda'}, {currentUser.state || 'Gujarat'} · Age {currentUser.age || 18}
              </p>
            </div>
          </div>

          {/* Profile Details Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-slate-400 font-bold block">Primary Sport</span>
              <span className="font-extrabold text-slate-900 mt-0.5 block">{currentUser.sport || 'Athletics'}</span>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-slate-400 font-bold block">Experience Level</span>
              <span className="font-extrabold text-slate-900 mt-0.5 block">{currentUser.experienceLevel || 'Intermediate'}</span>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-slate-400 font-bold block">Email</span>
              <span className="font-extrabold text-slate-900 mt-0.5 block truncate">{currentUser.email}</span>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-slate-400 font-bold block">KhelScore</span>
              <span className="font-extrabold text-emerald-600 mt-0.5 block">{currentUser.khelScore || 87} / 100</span>
            </div>
          </div>
        </div>

        {/* Personal Bests Section */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-4">
            <Award className="w-5 h-5 text-orange-600" />
            Verified Personal Bests
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-orange-50 border border-orange-200 space-y-1">
              <span className="font-bold text-orange-900 uppercase tracking-wider block">Push-Ups</span>
              <span className="text-2xl font-extrabold text-orange-950">34 <span className="text-xs font-normal text-orange-800">reps</span></span>
            </div>

            <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 space-y-1">
              <span className="font-bold text-blue-900 uppercase tracking-wider block">Squats</span>
              <span className="text-2xl font-extrabold text-blue-950">48 <span className="text-xs font-normal text-blue-800">reps</span></span>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-1">
              <span className="font-bold text-emerald-900 uppercase tracking-wider block">Jumping Jacks</span>
              <span className="text-2xl font-extrabold text-emerald-950">72 <span className="text-xs font-normal text-emerald-800">reps</span></span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
