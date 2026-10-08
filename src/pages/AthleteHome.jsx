import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Play, Activity, History, Award, Flame, TrendingUp, ArrowRight, User } from 'lucide-react';
import { authService } from '../services/authService';
import { useAssessment } from '../context/AssessmentContext';

export const AthleteHome = () => {
  const navigate = useNavigate();
  const currentUser = authService.getCurrentUser() || {
    name: 'Aarav Patel',
    role: 'athlete',
    khelScore: 87,
    assessmentsCompleted: 14,
    streak: 4,
    personalBests: { pushups: 34, squats: 48, jumpingJacks: 72 }
  };

  const { assessments } = useAssessment();

  const handleLogout = () => {
    authService.logout();
    navigate('/');
  };

  return (
    <div className="bg-slate-50 min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Dashboard Header */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#0B192C] text-white flex items-center justify-center font-bold text-2xl">
              {currentUser.name.charAt(0)}
            </div>
            <div>
              <span className="text-xs font-bold text-orange-600 uppercase tracking-wider">Athlete Dashboard</span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Welcome back, {currentUser.name}</h1>
              <p className="text-xs text-slate-500">{currentUser.sport || 'General Athletics'} · {currentUser.district || 'Kheda'}, {currentUser.state || 'Gujarat'}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <Link
              to="/assessment"
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs shadow-md transition-colors w-full md:w-auto"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Start Assessment</span>
            </Link>
            <Link
              to="/athlete/history"
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors w-full md:w-auto"
            >
              <History className="w-4 h-4 text-slate-600" />
              <span>View History</span>
            </Link>
          </div>
        </div>

        {/* Overview Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm space-y-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Latest KhelScore</span>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-extrabold text-[#0B192C]">{currentUser.khelScore || 87}</span>
              <span className="text-xs font-bold text-slate-400">/ 100</span>
            </div>
          </div>

          <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm space-y-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Assessments Completed</span>
            <span className="text-3xl font-extrabold text-slate-900">{currentUser.assessmentsCompleted || 14}</span>
          </div>

          <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm space-y-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Best Performance</span>
            <span className="text-3xl font-extrabold text-emerald-600">91</span>
          </div>

          <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm space-y-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Current Streak</span>
            <div className="flex items-center gap-1">
              <span className="text-3xl font-extrabold text-orange-600">{currentUser.streak || 4}</span>
              <Flame className="w-5 h-5 text-orange-500 fill-orange-500" />
            </div>
          </div>
        </div>

        {/* Recent Assessments & Personal Bests Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Recent Assessments */}
          <div className="lg:col-span-8 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Activity className="w-5 h-5 text-orange-600" />
                Recent Assessments
              </h2>
              <Link to="/athlete/history" className="text-xs font-bold text-orange-600 hover:underline">
                View All →
              </Link>
            </div>

            <div className="space-y-3">
              {[
                { title: 'Push-Ups', score: 87, reps: 24, date: '2 hours ago', status: 'Completed' },
                { title: 'Squats', score: 82, reps: 32, date: 'Yesterday', status: 'Completed' },
                { title: 'Jumping Jacks', score: 91, reps: 45, date: '3 days ago', status: 'Completed' }
              ].map((test, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h3 className="font-bold text-slate-900 text-sm">{test.title}</h3>
                    <p className="text-xs text-slate-500">{test.reps} valid reps · {test.date}</p>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <span className="text-xs text-slate-400 block">KhelScore</span>
                      <span className="text-lg font-extrabold text-[#0B192C]">{test.score}</span>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                      {test.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Personal Bests */}
          <div className="lg:col-span-4 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Award className="w-5 h-5 text-orange-600" />
                Personal Bests
              </h2>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-orange-50 border border-orange-200 space-y-1">
                <span className="text-xs font-bold text-orange-900 uppercase tracking-wider block">Push-Ups</span>
                <span className="text-2xl font-extrabold text-orange-950">34 <span className="text-xs font-normal text-orange-800">valid reps</span></span>
              </div>

              <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 space-y-1">
                <span className="text-xs font-bold text-blue-900 uppercase tracking-wider block">Squats</span>
                <span className="text-2xl font-extrabold text-blue-950">48 <span className="text-xs font-normal text-blue-800">valid reps</span></span>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-1">
                <span className="text-xs font-bold text-emerald-900 uppercase tracking-wider block">Jumping Jacks</span>
                <span className="text-2xl font-extrabold text-emerald-950">72 <span className="text-xs font-normal text-emerald-800">valid reps</span></span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
