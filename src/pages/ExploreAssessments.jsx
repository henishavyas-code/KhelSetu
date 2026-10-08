import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Play, CheckCircle2, Layers } from 'lucide-react';

export const ExploreAssessments = () => {
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

  const filtered = assessmentsCatalog.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSport = selectedSport === 'All' || item.sport.includes(selectedSport);
    const matchesBody = selectedBodyArea === 'All' || item.category === selectedBodyArea;
    const matchesDifficulty = selectedDifficulty === 'All' || item.difficulty === selectedDifficulty;
    const matchesType = selectedType === 'All' || item.type.includes(selectedType);
    return matchesSearch && matchesSport && matchesBody && matchesDifficulty && matchesType;
  });

  return (
    <div className="bg-slate-50 min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="px-3.5 py-1 rounded-full bg-orange-100 text-orange-800 text-xs font-bold uppercase tracking-wider">
            Assessment Catalog
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">Explore Sports Assessments</h1>
          <p className="text-sm text-slate-600">Discover standardized movement and fitness assessments for athletes across India.</p>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-6">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Filter className="w-4 h-4 text-orange-600" />
              Filter Available Tests
            </h2>
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by test name or body area..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-orange-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-medium">
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Body Area</label>
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
              <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Difficulty</label>
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
              <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Type</label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-700"
              >
                <option value="All">All Types</option>
                <option value="Strength">Strength</option>
                <option value="Mobility">Mobility</option>
                <option value="Endurance">Endurance</option>
                <option value="Coordination">Coordination</option>
              </select>
            </div>

            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Sport</label>
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
        </div>

        {/* Assessment Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filtered.map(item => (
            <div key={item.id} className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-6 flex flex-col justify-between card-hover-shadow">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-bold rounded-full border border-slate-200">
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

      </div>
    </div>
  );
};
