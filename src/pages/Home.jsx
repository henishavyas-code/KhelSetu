import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Play, ArrowRight, Activity, Search, Filter, CheckCircle2, ShieldCheck, Smartphone, Award, Target, Sparkles, TrendingUp, Layers, HelpCircle, Users } from 'lucide-react';
import { PoseSkeleton } from '../components/common/PoseSkeleton';

export const Home = () => {
  const navigate = useNavigate();

  // Search & Filter state for "Find the right assessment for you"
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSport, setSelectedSport] = useState('All');
  const [selectedBodyArea, setSelectedBodyArea] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [selectedType, setSelectedType] = useState('All');

  const assessmentsCatalog = [
    {
      id: 'pushups',
      title: 'Push-Ups',
      category: 'Upper Body',
      sport: 'Athletics & General',
      difficulty: 'Intermediate',
      type: 'Strength',
      measures: ['Valid repetitions', 'Elbow movement', 'Body alignment', 'Form accuracy', 'Consistency'],
      path: '/assessment?exercise=Push-Ups'
    },
    {
      id: 'squats',
      title: 'Squats',
      category: 'Lower Body',
      sport: 'Football & Athletics',
      difficulty: 'Beginner',
      type: 'Mobility & Strength',
      measures: ['Squat depth', 'Knee alignment', 'Hip movement', 'Posture', 'Consistency'],
      path: '/assessment?exercise=Squats'
    },
    {
      id: 'jumping-jacks',
      title: 'Jumping Jacks',
      category: 'Full Body',
      sport: 'Badminton & Fitness',
      difficulty: 'Beginner',
      type: 'Endurance & Coordination',
      measures: ['Arm extension', 'Leg separation', 'Movement rhythm', 'Valid cycles', 'Consistency'],
      path: '/assessment?exercise=Jumping Jacks'
    }
  ];

  const filteredAssessments = assessmentsCatalog.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSport = selectedSport === 'All' || item.sport.includes(selectedSport);
    const matchesBody = selectedBodyArea === 'All' || item.category === selectedBodyArea;
    const matchesDifficulty = selectedDifficulty === 'All' || item.difficulty === selectedDifficulty;
    const matchesType = selectedType === 'All' || item.type.includes(selectedType);
    return matchesSearch && matchesSport && matchesBody && matchesDifficulty && matchesType;
  });

  return (
    <div className="bg-[#F8FAFC] space-y-20 pb-20">
      
      {/* 1. HERO SECTION */}
      <section className="relative bg-gradient-to-b from-[#0B192C] via-[#1E3A8A] to-[#0B192C] text-white pt-16 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-orange-400 text-xs font-semibold backdrop-blur-md border border-white/10">
              <Sparkles className="w-3.5 h-3.5 text-orange-400" />
              <span>Standardized Digital Sports Infrastructure</span>
            </span>

            <h1 className="font-display text-4xl sm:text-6xl lg:text-6xl font-extrabold tracking-tight leading-[1.08] text-white">
              Discover What Your Movement Can Tell You.
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              AI-powered sports assessment that helps athletes measure movement, form and performance using a smartphone camera.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                to="/assessment"
                className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-sm transition-all shadow-lg shadow-orange-600/30"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Start an Assessment</span>
              </Link>
              <Link
                to="/explore"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-sm transition-colors"
              >
                <span>Explore Assessments</span>
              </Link>
            </div>
          </div>

          {/* Right Hero Visual with Subtle Overlay */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md bg-slate-900/90 border border-white/20 rounded-3xl p-5 shadow-2xl backdrop-blur-sm">
              <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs">
                <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                  <Activity className="w-4 h-4 text-emerald-400" />
                  Live Movement Tracking
                </span>
                <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded text-[10px] font-bold">
                  Pose Assessment
                </span>
              </div>

              <div className="h-[260px] relative my-3">
                <PoseSkeleton exercise="Push-Ups" state="MOVING UP" repCount={14} angle={95} />
              </div>

              <div className="grid grid-cols-3 gap-2 font-mono text-center text-xs">
                <div className="bg-white/5 p-2.5 rounded-xl border border-white/10">
                  <span className="text-slate-400 text-[10px] block">Valid Reps</span>
                  <span className="font-extrabold text-white text-lg">14</span>
                </div>
                <div className="bg-white/5 p-2.5 rounded-xl border border-white/10">
                  <span className="text-slate-400 text-[10px] block">Form</span>
                  <span className="font-extrabold text-emerald-400 text-lg">92%</span>
                </div>
                <div className="bg-white/5 p-2.5 rounded-xl border border-white/10">
                  <span className="text-slate-400 text-[10px] block">KhelScore</span>
                  <span className="font-extrabold text-orange-400 text-lg">87</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>


      {/* 2. QUICK ACTION / SERVICE DISCOVERY (MY BHARAT INSPIRED) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-lg">
          <div className="text-center max-w-xl mx-auto mb-8 space-y-1">
            <span className="text-xs font-bold text-orange-600 uppercase tracking-wider">Quick Actions</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">What would you like to do?</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <Link
              to="/assessment"
              className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-orange-500 hover:bg-orange-50/30 card-hover-shadow transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Play className="w-6 h-6 fill-orange-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-orange-600 transition-colors">Take an Assessment</h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">Measure your movement, form, and performance using your camera.</p>
              <span className="text-xs font-bold text-orange-600 flex items-center gap-1">
                Start Now <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>

            <Link
              to="/athlete/home"
              className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-blue-500 hover:bg-blue-50/30 card-hover-shadow transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">View Your Results</h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">Track previous assessments, certificates, and KhelScore breakdown.</p>
              <span className="text-xs font-bold text-blue-600 flex items-center gap-1">
                View Results <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>

            <Link
              to="/explore"
              className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/30 card-hover-shadow transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-emerald-600 transition-colors">Explore Assessments</h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">Choose from available upper body, lower body, and full body tests.</p>
              <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                Explore Catalog <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>

            <Link
              to="/athlete/history"
              className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-purple-500 hover:bg-purple-50/30 card-hover-shadow transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-purple-600 transition-colors">Track Your Progress</h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">Understand how your athletic performance changes over time.</p>
              <span className="text-xs font-bold text-purple-600 flex items-center gap-1">
                Track History <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>

          </div>
        </div>
      </section>


      {/* 3. ASSESSMENTS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-orange-600 uppercase tracking-wider">Standardized Tests</span>
          <h2 className="text-3xl font-extrabold text-slate-900">Choose Your Assessment</h2>
          <p className="text-sm text-slate-600">Start with a standardized movement assessment designed to measure performance, form and consistency.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {assessmentsCatalog.map((item) => (
            <div key={item.id} className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-6 flex flex-col justify-between card-hover-shadow">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold rounded-full">
                    {item.category}
                  </span>
                  <span className="text-xs font-semibold text-slate-400">{item.difficulty}</span>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-slate-900">{item.title}</h3>
                  <p className="text-xs font-semibold text-orange-600 mt-0.5">{item.type} Assessment</p>
                </div>

                <div className="space-y-2">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Measures:</span>
                  <ul className="space-y-1.5 text-xs text-slate-600">
                    {item.measures.map((m, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{m}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <Link
                  to={item.path}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#0B192C] hover:bg-blue-900 text-white font-bold text-xs transition-colors shadow-sm"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>Start Assessment</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* 4. SEARCH + FILTER EXPERIENCE (MY BHARAT INSPIRED) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-6">
            <div>
              <span className="text-xs font-bold text-orange-600 uppercase tracking-wider">Search & Filter</span>
              <h2 className="text-2xl font-bold text-slate-900">Find the Right Assessment for You</h2>
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search assessments..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-orange-500"
              />
            </div>
          </div>

          {/* Filter Options */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-medium">
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Body Area</label>
              <select
                value={selectedBodyArea}
                onChange={(e) => setSelectedBodyArea(e.target.value)}
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-700"
              >
                <option value="All">All Body Areas</option>
                <option value="Upper Body">Upper Body</option>
                <option value="Lower Body">Lower Body</option>
                <option value="Full Body">Full Body</option>
              </select>
            </div>

            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Difficulty</label>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-700"
              >
                <option value="All">All Difficulties</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>

            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Type</label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-700"
              >
                <option value="All">All Assessment Types</option>
                <option value="Strength">Strength</option>
                <option value="Mobility">Mobility</option>
                <option value="Endurance">Endurance</option>
                <option value="Coordination">Coordination</option>
              </select>
            </div>

            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Sport</label>
              <select
                value={selectedSport}
                onChange={(e) => setSelectedSport(e.target.value)}
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-700"
              >
                <option value="All">All Sports</option>
                <option value="Athletics">Athletics</option>
                <option value="Football">Football</option>
                <option value="Badminton">Badminton</option>
              </select>
            </div>
          </div>

          {/* Filtered List Result */}
          <div className="pt-4 border-t border-slate-100">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {filteredAssessments.map(item => (
                <div key={item.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{item.title}</h4>
                    <p className="text-[11px] text-slate-500">{item.category} · {item.type}</p>
                  </div>
                  <Link to={item.path} className="px-3 py-1.5 bg-[#0B192C] text-white text-xs font-bold rounded-lg hover:bg-blue-900">
                    Start
                  </Link>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>


      {/* 5. HOW IT WORKS (VISUAL JOURNEY) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-bold text-orange-600 uppercase tracking-wider">Visual Journey</span>
          <h2 className="text-3xl font-extrabold text-slate-900">How KhelSetu Works</h2>
          <p className="text-sm text-slate-600">A clear 6-step assessment journey designed for athletes.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          {[
            { num: '1', title: 'Prepare', desc: 'Choose your assessment and position your device.' },
            { num: '2', title: 'Capture', desc: 'Your camera observes the movement.' },
            { num: '3', title: 'Analyze', desc: 'Pose estimation detects body landmarks and movement.' },
            { num: '4', title: 'Assess', desc: 'The system identifies valid repetitions and evaluates form.' },
            { num: '5', title: 'Understand', desc: 'Receive performance metrics and KhelScore.' },
            { num: '6', title: 'Improve', desc: 'Track your progress through your profile.' }
          ].map(item => (
            <div key={item.num} className="bg-white border border-slate-200 rounded-2xl p-5 space-y-2 card-hover-shadow">
              <div className="w-8 h-8 rounded-lg bg-orange-100 text-orange-600 font-extrabold flex items-center justify-center text-sm">
                {item.num}
              </div>
              <h3 className="font-bold text-slate-900 text-sm">{item.title}</h3>
              <p className="text-[11px] text-slate-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>


      {/* 6. AI EXPLANATION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-10 space-y-8 shadow-sm">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-bold text-orange-600 uppercase tracking-wider">Technology Architecture</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">From Movement to Measurable Performance</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-7 gap-3 text-center">
            {[
              'Camera',
              'Pose Estimation',
              'Movement Analysis',
              'Valid Rep Detection',
              'Form & Consistency',
              'Performance Metrics',
              'KhelScore'
            ].map((step, idx) => (
              <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col items-center justify-center">
                <span className="text-xs font-bold text-slate-800">{step}</span>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* 7. ATHLETE JOURNEY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-1">
          <span className="text-xs font-bold text-orange-600 uppercase tracking-wider">User Flow</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Your Assessment Journey</h2>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 flex flex-wrap items-center justify-between gap-3 text-xs font-bold text-slate-700">
          <span>1. Register</span>
          <ArrowRight className="w-4 h-4 text-slate-300 hidden sm:inline" />
          <span>2. Choose Assessment</span>
          <ArrowRight className="w-4 h-4 text-slate-300 hidden sm:inline" />
          <span>3. Read Instructions</span>
          <ArrowRight className="w-4 h-4 text-slate-300 hidden sm:inline" />
          <span>4. Set Up Camera</span>
          <ArrowRight className="w-4 h-4 text-slate-300 hidden sm:inline" />
          <span>5. Perform Exercise</span>
          <ArrowRight className="w-4 h-4 text-slate-300 hidden sm:inline" />
          <span>6. AI Analysis</span>
          <ArrowRight className="w-4 h-4 text-slate-300 hidden sm:inline" />
          <span>7. View Results</span>
          <ArrowRight className="w-4 h-4 text-slate-300 hidden sm:inline" />
          <span>8. Track Progress</span>
        </div>
      </section>


      {/* 8. INDIA / GRASSROOTS FOCUS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0B192C] text-white rounded-3xl p-8 sm:p-12 space-y-6 relative overflow-hidden">
          <span className="text-xs font-bold text-orange-400 uppercase tracking-wider">Grassroots Vision</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold">Sporting Potential Exists Everywhere</h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
            "Access to structured assessment should not depend entirely on proximity to formal training infrastructure."
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 text-xs">
            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-orange-400 font-bold block text-sm">Rural Athlete</span>
              <p className="text-slate-300 text-[11px] mt-1">Camera assessment on village training grounds.</p>
            </div>
            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-orange-400 font-bold block text-sm">Small-Town Athlete</span>
              <p className="text-slate-300 text-[11px] mt-1">Standardized measurement without expensive sports labs.</p>
            </div>
            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-orange-400 font-bold block text-sm">School Athlete</span>
              <p className="text-slate-300 text-[11px] mt-1">Physical education assessment and tracking.</p>
            </div>
            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-orange-400 font-bold block text-sm">Academy Athlete</span>
              <p className="text-slate-300 text-[11px] mt-1">Objective form quality & repetition logging.</p>
            </div>
          </div>
        </div>
      </section>


      {/* 9. MOBILE APP VISION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs font-bold text-orange-600 uppercase tracking-wider">Long-Term Architecture</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Built for the Device Athletes Already Carry</h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              The web platform demonstrates the experience. The long-term product is a mobile-first assessment application target built with Flutter for on-device pose assessment, offline-first workflow, local storage, and secure synchronization.
            </p>
          </div>

          <div className="lg:col-span-5 flex justify-center">
            <div className="w-64 bg-slate-900 p-4 rounded-[36px] border-4 border-slate-800 shadow-2xl text-white space-y-4">
              <div className="w-16 h-4 bg-slate-800 rounded-full mx-auto"></div>
              <div className="bg-slate-950 p-4 rounded-2xl text-center space-y-2">
                <Smartphone className="w-8 h-8 text-orange-500 mx-auto" />
                <p className="text-xs font-bold">KhelSetu Mobile App</p>
                <p className="text-[10px] text-slate-400">On-Device Flutter Pose Engine</p>
              </div>
              <div className="w-12 h-1 bg-slate-800 rounded-full mx-auto"></div>
            </div>
          </div>
        </div>
      </section>


      {/* 10. WHY KHELSETU TRUST SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-bold text-orange-600 uppercase tracking-wider">Core Pillars</span>
          <h2 className="text-3xl font-extrabold text-slate-900">Why KhelSetu?</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {[
            { title: 'Accessible', desc: 'Assessment using a device athletes already carry.' },
            { title: 'Structured', desc: 'Standardized assessment workflow and scoring.' },
            { title: 'Movement-Aware', desc: 'Looks beyond simple repetition counting.' },
            { title: 'Trackable', desc: 'Performance history and progress over time.' },
            { title: 'Scalable', desc: 'Designed to support more assessments and athletes.' }
          ].map((pillar, idx) => (
            <div key={idx} className="bg-white border border-slate-200 p-5 rounded-2xl space-y-2 card-hover-shadow">
              <div className="w-3 h-3 rounded-full bg-orange-500"></div>
              <h3 className="font-bold text-slate-900 text-sm">{pillar.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{pillar.desc}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
