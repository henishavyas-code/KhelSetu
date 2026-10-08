import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SPORTS_DATA } from '../data/sportsData';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { ArrowRight } from 'lucide-react';

export const SportsPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <Badge variant="emerald">Multisport Benchmarks</Badge>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 font-display">
          Sports Disciplines Catalog
        </h1>
        <p className="text-sm text-slate-600 font-medium">
          KhelSetu adapts biomechanical movement scoring for major Olympic, national, and regional sports.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {SPORTS_DATA.map((sport) => (
          <Card key={sport.id} hoverEffect className="space-y-4">
            <div className="h-48 rounded-xl overflow-hidden relative bg-slate-100">
              <img src={sport.bannerImage} alt={sport.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3">
                <Badge variant="emerald">{sport.category}</Badge>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-slate-900 font-display">{sport.name}</h3>
                <span className="text-xs font-mono text-emerald-600 font-bold">
                  {sport.athletesCount.toLocaleString()} Athletes
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">{sport.description}</p>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500 font-semibold">
                Popular: {sport.popularAssessments.join(', ')}
              </span>
              <Button
                variant="outline"
                size="sm"
                rightIcon={<ArrowRight className="w-4 h-4" />}
                onClick={() => navigate('/assessments')}
              >
                View Tests
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
