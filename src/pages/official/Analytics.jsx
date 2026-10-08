import React from 'react';
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity, BarChart2, PieChart as PieIcon, Info } from 'lucide-react';
import { mockAnalytics } from '../../data/mockAnalytics';

export const OfficialAnalytics = () => {
  const { assessmentsTrend, stateBreakdown, riskDistribution, exerciseDistribution } = mockAnalytics;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 space-y-12">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest">
              NATIONAL TELEMETRY & SCOUTING DATA
            </span>
            <span className="px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800 text-[10px] font-mono">
              DEMO DATASET · NOT OFFICIAL STATISTICS
            </span>
          </div>
          <h1 className="font-display text-4xl font-extrabold text-white">
            SPORTS INTELLIGENCE ANALYTICS
          </h1>
        </div>
      </div>

      {/* DOMINANT CHART: ASSESSMENTS GROWTH OVER TIME */}
      <div className="bg-[#0B0F17] border border-emerald-500/30 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl">
        <div className="flex items-center justify-between font-mono text-xs">
          <div>
            <h3 className="font-display text-2xl font-bold text-white">National Assessment Volume Growth</h3>
            <p className="text-slate-400 text-xs mt-1">Monthly trend of recorded vs verified smartphone assessments (2026)</p>
          </div>
          <Activity className="w-6 h-6 text-emerald-400" />
        </div>

        <div className="h-[320px] w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={assessmentsTrend}>
              <defs>
                <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorVerified" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#38BDF8" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#38BDF8" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="month" stroke="#64748B" fontSize={11} />
              <YAxis stroke="#64748B" fontSize={11} />
              <Tooltip
                contentStyle={{ backgroundColor: '#07090E', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }}
              />
              <Area type="monotone" dataKey="assessments" stroke="#10B981" fillOpacity={1} fill="url(#colorTotal)" name="Total Recorded" />
              <Area type="monotone" dataKey="verified" stroke="#38BDF8" fillOpacity={1} fill="url(#colorVerified)" name="Verified Submissions" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* SECONDARY CHARTS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* State Breakdown Bar Chart (7 cols) */}
        <div className="lg:col-span-7 bg-[#0B0F17] border border-white/10 rounded-2xl p-6 space-y-6">
          <div className="flex items-center justify-between font-mono text-xs">
            <h3 className="font-display text-xl font-bold text-white">Assessments by State</h3>
            <BarChart2 className="w-5 h-5 text-emerald-400" />
          </div>

          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stateBreakdown}>
                <XAxis dataKey="state" stroke="#64748B" fontSize={11} />
                <YAxis stroke="#64748B" fontSize={11} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#07090E', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }}
                />
                <Bar dataKey="assessments" fill="#10B981" radius={[4, 4, 0, 0]} name="Assessments" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Risk Distribution Pie Chart (5 cols) */}
        <div className="lg:col-span-5 bg-[#0B0F17] border border-white/10 rounded-2xl p-6 space-y-6">
          <div className="flex items-center justify-between font-mono text-xs">
            <h3 className="font-display text-xl font-bold text-white">Audit Risk Classification</h3>
            <PieIcon className="w-5 h-5 text-emerald-400" />
          </div>

          <div className="h-[240px] w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={riskDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {riskDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#07090E', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-3 gap-2 font-mono text-center text-xs">
            {riskDistribution.map((item) => (
              <div key={item.name} className="bg-slate-900 p-2 rounded-lg border border-slate-800">
                <span className="text-slate-400 text-[9px] block">{item.name}</span>
                <span className="font-bold text-white">{item.value.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
