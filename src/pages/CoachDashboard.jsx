import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, ShieldCheck, Award, Eye, Search, Filter, CheckCircle2, ArrowRight, Activity, Calendar } from 'lucide-react';
import { authService } from '../services/authService';

export const CoachDashboard = () => {
  const currentUser = authService.getCurrentUser() || {
    name: 'Coach Rajesh Sharma',
    role: 'coach',
    organization: 'Gujarat Sports Academy'
  };

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAthlete, setSelectedAthlete] = useState(null);

  const assignedAthletes = [
    {
      id: 'ATH-101',
      name: 'Aarav Patel',
      age: 18,
      sport: 'Athletics & Field',
      district: 'Kheda',
      khelScore: 87,
      pushupsBest: 34,
      squatsBest: 48,
      jumpingJacksBest: 72,
      lastAssessment: 'Push-Ups (87 KhelScore) · Today',
      status: 'Active'
    },
    {
      id: 'ATH-102',
      name: 'Priya Sharma',
      age: 17,
      sport: 'Badminton',
      district: 'Ahmedabad',
      khelScore: 91,
      pushupsBest: 28,
      squatsBest: 52,
      jumpingJacksBest: 80,
      lastAssessment: 'Jumping Jacks (91 KhelScore) · 2 days ago',
      status: 'Active'
    },
    {
      id: 'ATH-103',
      name: 'Rohan Verma',
      age: 19,
      sport: 'Football',
      district: 'Surat',
      khelScore: 84,
      pushupsBest: 38,
      squatsBest: 44,
      jumpingJacksBest: 64,
      lastAssessment: 'Squats (84 KhelScore) · 4 days ago',
      status: 'Review Pending'
    }
  ];

  const filteredAthletes = assignedAthletes.filter(a =>
    a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.sport.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-slate-50 min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Coach Dashboard Header */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#0B192C] text-white flex items-center justify-center font-bold text-2xl">
              <ShieldCheck className="w-8 h-8 text-orange-500" />
            </div>
            <div>
              <span className="text-xs font-bold text-orange-600 uppercase tracking-wider">Coach & Organization Portal</span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">{currentUser.name}</h1>
              <p className="text-xs text-slate-500">{currentUser.organization || 'National Sports Operations'} · Assigned Athletes: {assignedAthletes.length}</p>
            </div>
          </div>
        </div>

        {/* Coach Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm space-y-1">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Assigned Athletes</span>
            <span className="text-3xl font-extrabold text-slate-900">{assignedAthletes.length}</span>
          </div>

          <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm space-y-1">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Average KhelScore</span>
            <span className="text-3xl font-extrabold text-emerald-600">87.3</span>
          </div>

          <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm space-y-1">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Pending Reviews</span>
            <span className="text-3xl font-extrabold text-orange-600">1</span>
          </div>
        </div>

        {/* Athletes List */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Users className="w-5 h-5 text-orange-600" />
              Assigned Athletes Roster
            </h2>

            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search athlete by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-orange-500"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-3.5 px-4">Athlete</th>
                  <th className="py-3.5 px-4">Sport</th>
                  <th className="py-3.5 px-4">KhelScore</th>
                  <th className="py-3.5 px-4">Push-Ups Best</th>
                  <th className="py-3.5 px-4">Squats Best</th>
                  <th className="py-3.5 px-4">Jumping Jacks</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                {filteredAthletes.map(ath => (
                  <tr key={ath.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-4">
                      <div className="font-bold text-slate-900">{ath.name}</div>
                      <div className="text-[10px] text-slate-400">ID: {ath.id} · Age: {ath.age}</div>
                    </td>
                    <td className="py-4 px-4">{ath.sport}</td>
                    <td className="py-4 px-4">
                      <span className="font-extrabold text-slate-900 text-sm">{ath.khelScore}</span>
                    </td>
                    <td className="py-4 px-4 font-bold text-slate-800">{ath.pushupsBest} reps</td>
                    <td className="py-4 px-4 font-bold text-slate-800">{ath.squatsBest} reps</td>
                    <td className="py-4 px-4 font-bold text-slate-800">{ath.jumpingJacksBest} reps</td>
                    <td className="py-4 px-4 text-right">
                      <button
                        onClick={() => setSelectedAthlete(ath)}
                        className="px-3 py-1.5 rounded-lg bg-[#0B192C] hover:bg-blue-900 text-white text-[11px] font-bold"
                      >
                        Inspect Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Selected Athlete Evidence Modal / Inspection Drawer */}
        {selectedAthlete && (
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-md space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-bold text-orange-600 uppercase">Athlete Performance Details</span>
                <h3 className="text-xl font-bold text-slate-900">{selectedAthlete.name}</h3>
              </div>
              <button
                onClick={() => setSelectedAthlete(null)}
                className="text-xs font-bold text-slate-500 hover:text-slate-900 underline"
              >
                Close Inspection
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-4 bg-slate-50 rounded-2xl space-y-1">
                <span className="text-slate-400 font-bold block">Push-Ups Personal Best</span>
                <span className="text-xl font-extrabold text-slate-900">{selectedAthlete.pushupsBest} valid reps</span>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl space-y-1">
                <span className="text-slate-400 font-bold block">Squats Personal Best</span>
                <span className="text-xl font-extrabold text-slate-900">{selectedAthlete.squatsBest} valid reps</span>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl space-y-1">
                <span className="text-slate-400 font-bold block">Jumping Jacks Personal Best</span>
                <span className="text-xl font-extrabold text-slate-900">{selectedAthlete.jumpingJacksBest} valid reps</span>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
