import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Search, MapPin } from 'lucide-react';
import { useAssessment } from '../context/AssessmentContext';

export const Leaderboard = () => {
  const { athletes } = useAssessment();

  const [selectedState, setSelectedState] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAthletes = athletes.filter(ath => {
    const matchesState = selectedState === 'All' || ath.state === selectedState;
    const matchesQuery = ath.name.toLowerCase().includes(searchQuery.toLowerCase()) || ath.district.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesState && matchesQuery;
  });

  const sortedAthletes = [...filteredAthletes].sort((a, b) => b.khelScore - a.khelScore);
  const topThree = sortedAthletes.slice(0, 3);

  return (
    <div className="bg-slate-50 min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-slate-200 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Trophy className="w-5 h-5 text-orange-600" />
              <span className="text-xs font-bold text-orange-600 uppercase tracking-wider">
                National Rankings
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              National Talent Leaderboard
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs">
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search athlete or district..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-slate-900 focus:outline-none focus:border-orange-500"
              />
            </div>

            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="bg-white border border-slate-200 text-slate-700 rounded-xl px-3 py-2 focus:outline-none focus:border-orange-500"
            >
              <option value="All">All States</option>
              <option value="Gujarat">Gujarat</option>
              <option value="Odisha">Odisha</option>
              <option value="Rajasthan">Rajasthan</option>
              <option value="Bihar">Bihar</option>
            </select>
          </div>
        </div>

        {/* Top 3 Cards */}
        {topThree.length >= 3 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            
            <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-3 shadow-sm order-2 md:order-1">
              <div className="flex items-center justify-between">
                <span className="text-3xl font-extrabold text-slate-400">#02</span>
                <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[11px] font-bold">SILVER TIER</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">{topThree[1]?.name}</h3>
                <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  {topThree[1]?.district}, {topThree[1]?.state}
                </p>
              </div>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400">KhelScore</span>
                <span className="text-slate-900 font-extrabold text-lg">{topThree[1]?.khelScore}</span>
              </div>
            </div>

            <div className="bg-[#0B192C] text-white rounded-3xl p-8 space-y-3 shadow-md order-1 md:order-2">
              <div className="flex items-center justify-between">
                <span className="text-4xl font-extrabold text-orange-400">#01</span>
                <span className="px-3 py-0.5 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold border border-orange-500/30">
                  NATIONAL LEADER
                </span>
              </div>
              <div>
                <h3 className="text-2xl font-extrabold text-white">{topThree[0]?.name}</h3>
                <p className="text-xs text-slate-300 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-orange-400" />
                  {topThree[0]?.district}, {topThree[0]?.state}
                </p>
              </div>
              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                <span className="text-slate-300">KhelScore</span>
                <span className="text-orange-400 font-extrabold text-2xl">{topThree[0]?.khelScore}</span>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-3 shadow-sm order-3">
              <div className="flex items-center justify-between">
                <span className="text-3xl font-extrabold text-orange-700">#03</span>
                <span className="px-2.5 py-0.5 rounded-full bg-orange-50 text-orange-800 text-[11px] font-bold">BRONZE TIER</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">{topThree[2]?.name}</h3>
                <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  {topThree[2]?.district}, {topThree[2]?.state}
                </p>
              </div>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400">KhelScore</span>
                <span className="text-slate-900 font-extrabold text-lg">{topThree[2]?.khelScore}</span>
              </div>
            </div>

          </div>
        )}

        {/* Rankings Table */}
        <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
          <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs font-bold text-slate-700">
            <span>Verified Athlete Rankings ({sortedAthletes.length})</span>
            <span>Sorted by KhelScore</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-3.5 px-6">Rank</th>
                  <th className="py-3.5 px-6">Athlete</th>
                  <th className="py-3.5 px-6">District / State</th>
                  <th className="py-3.5 px-6">Push-Ups Best</th>
                  <th className="py-3.5 px-6">Form Accuracy</th>
                  <th className="py-3.5 px-6">KhelScore</th>
                  <th className="py-3.5 px-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                {sortedAthletes.map((ath, idx) => (
                  <tr key={ath.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-6 font-extrabold text-slate-900">#{idx + 1}</td>
                    <td className="py-4 px-6 font-bold text-slate-900">{ath.name}</td>
                    <td className="py-4 px-6 text-slate-500">{ath.district}, {ath.state}</td>
                    <td className="py-4 px-6 font-bold text-slate-900">{ath.pushupsBest} reps</td>
                    <td className="py-4 px-6">{ath.formAccuracy}%</td>
                    <td className="py-4 px-6 text-emerald-600 font-extrabold text-sm">{ath.khelScore}</td>
                    <td className="py-4 px-6 text-right">
                      <Link to="/athlete/profile" className="text-orange-600 font-bold hover:underline">
                        View Profile →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};
