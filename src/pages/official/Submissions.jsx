import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, ShieldCheck, AlertTriangle, Eye, Copy, Check } from 'lucide-react';
import { useAssessment } from '../../context/AssessmentContext';

export const OfficialSubmissions = () => {
  const { submissions } = useAssessment();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRisk, setSelectedRisk] = useState('All');
  const [selectedState, setSelectedState] = useState('All');
  const [copiedId, setCopiedId] = useState(null);

  const filtered = submissions.filter(sub => {
    const matchesRisk = selectedRisk === 'All' || sub.risk === selectedRisk;
    const matchesState = selectedState === 'All' || sub.state === selectedState;
    const matchesQuery = sub.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         sub.athleteName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         sub.district.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRisk && matchesState && matchesQuery;
  });

  const handleCopyId = (id) => {
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest block mb-1">
            SAI OFFICIAL AUDIT LOGS
          </span>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
            ASSESSMENT SUBMISSIONS AUDIT
          </h1>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search Submission ID / Name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-slate-900 border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <select
            value={selectedRisk}
            onChange={(e) => setSelectedRisk(e.target.value)}
            className="bg-slate-900 border border-slate-800 text-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:border-emerald-500"
          >
            <option value="All">All Risk Levels</option>
            <option value="Low">Low Risk</option>
            <option value="Medium">Medium Risk</option>
            <option value="High">High Risk (Anomaly)</option>
          </select>

          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="bg-slate-900 border border-slate-800 text-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:border-emerald-500"
          >
            <option value="All">All States</option>
            <option value="Gujarat">Gujarat</option>
            <option value="Odisha">Odisha</option>
            <option value="Rajasthan">Rajasthan</option>
            <option value="Bihar">Bihar</option>
          </select>
        </div>
      </div>

      {/* Submissions Table */}
      <div className="bg-[#0B0F17] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
        <div className="p-4 bg-slate-900/80 border-b border-slate-800 flex items-center justify-between font-mono text-xs">
          <span className="text-slate-300 font-bold">TOTAL AUDIT SUBMISSIONS ({filtered.length})</span>
          <span className="text-slate-500">DEMO DATASET</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-3.5 px-6">Submission ID</th>
                <th className="py-3.5 px-6">Athlete Name</th>
                <th className="py-3.5 px-6">District / State</th>
                <th className="py-3.5 px-6">Test Type</th>
                <th className="py-3.5 px-6">Reps</th>
                <th className="py-3.5 px-6">Score</th>
                <th className="py-3.5 px-6">Risk Level</th>
                <th className="py-3.5 px-6">Status</th>
                <th className="py-3.5 px-6 text-right">Audit Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-slate-300">
              {filtered.map((sub) => (
                <tr key={sub.id} className="hover:bg-white/5 transition-colors">
                  <td className="py-4 px-6 font-bold text-white flex items-center gap-2">
                    {sub.id}
                    <button
                      onClick={() => handleCopyId(sub.id)}
                      className="text-slate-500 hover:text-emerald-400"
                      title="Copy Submission ID"
                    >
                      {copiedId === sub.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </td>
                  <td className="py-4 px-6 font-bold text-slate-200">{sub.athleteName}</td>
                  <td className="py-4 px-6 text-slate-400">{sub.district}, {sub.state}</td>
                  <td className="py-4 px-6 font-bold text-emerald-400">{sub.exercise}</td>
                  <td className="py-4 px-6 text-white font-bold">{sub.reps}</td>
                  <td className="py-4 px-6 text-amber-400 font-bold">{sub.score}</td>
                  <td className="py-4 px-6">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      sub.risk === 'High' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                      sub.risk === 'Medium' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                      'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    }`}>
                      {sub.risk} RISK
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-2 py-0.5 rounded text-[10px] ${
                      sub.status === 'Verified' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                      sub.status === 'Flagged' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                      'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    }`}>
                      {sub.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <Link
                      to={`/official/submissions/${sub.id}`}
                      className="inline-flex items-center gap-1 px-3 py-1 rounded bg-slate-800 hover:bg-emerald-500 hover:text-slate-950 font-bold text-emerald-400 transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      AUDIT
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
