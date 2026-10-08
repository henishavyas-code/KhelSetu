import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ASSESSMENTS_DATA } from '../data/assessmentsData';
import { AssessmentCard } from '../components/common/AssessmentCard';
import { Badge } from '../components/common/Badge';
import { Input } from '../components/common/Input';
import { Select } from '../components/common/Select';
import { Search } from 'lucide-react';

export const AssessmentsPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');

  const filteredAssessments = ASSESSMENTS_DATA.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'all' || item.difficulty === selectedDifficulty;

    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'Strength', label: 'Strength' },
    { value: 'Endurance', label: 'Endurance' },
    { value: 'Speed', label: 'Speed' },
    { value: 'Mobility', label: 'Mobility' },
    { value: 'Balance', label: 'Balance' },
    { value: 'Explosiveness', label: 'Explosiveness' }
  ];

  const difficulties = [
    { value: 'all', label: 'All Difficulties' },
    { value: 'Beginner', label: 'Beginner' },
    { value: 'Intermediate', label: 'Intermediate' },
    { value: 'Advanced', label: 'Advanced' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Header */}
      <div className="space-y-4 text-center max-w-3xl mx-auto">
        <Badge variant="cyan">Standardized Physical Benchmarks</Badge>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 font-display">
          Assessment Library
        </h1>
        <p className="text-sm text-slate-600 font-medium">
          Browse certified fitness and biomechanical tests engineered for grassroots and elite athletic discovery.
        </p>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white border border-slate-200/80 p-4 rounded-2xl shadow-xs grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
        <div className="md:col-span-2">
          <Input
            placeholder="Search test by name or movement type..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            leftIcon={<Search className="w-4 h-4" />}
          />
        </div>

        <Select
          options={categories}
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        />

        <Select
          options={difficulties}
          value={selectedDifficulty}
          onChange={(e) => setSelectedDifficulty(e.target.value)}
        />
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAssessments.map((assessment) => (
          <AssessmentCard
            key={assessment.id}
            assessment={assessment}
            onStart={() => navigate('/app/dashboard')}
          />
        ))}
      </div>
    </div>
  );
};
