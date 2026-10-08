import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LEADERBOARD_DATA } from '../data/leaderboardData';
import { AthleteAvatar } from '../components/common/AthleteAvatar';
import { Badge } from '../components/common/Badge';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { MapPin, ArrowRight } from 'lucide-react';

export const AthletesPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <Badge variant="emerald">Grassroots Talent Roster</Badge>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 font-display">
          Verified Athlete Showcase
        </h1>
        <p className="text-sm text-slate-600 font-medium">
          Discover high-performance athletes across India with authenticated KhelScore biometrics.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {LEADERBOARD_DATA.map((athlete) => (
          <Card key={athlete.id} hoverEffect className="space-y-4 text-center flex flex-col items-center">
            <AthleteAvatar
              src={athlete.athleteAvatar}
              name={athlete.athleteName}
              size="xl"
              level={athlete.level}
              verified
            />
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-slate-900 font-display">{athlete.athleteName}</h3>
              <div className="flex items-center justify-center gap-1 text-xs text-slate-500 font-semibold">
                <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                <span>{athlete.location}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <Badge variant="emerald">{athlete.sport}</Badge>
              <Badge variant="amber">{athlete.level} Level</Badge>
            </div>

            <div className="w-full grid grid-cols-2 gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs my-2">
              <div>
                <span className="text-slate-500 font-bold block text-[10px]">KHELSCORE</span>
                <span className="font-display font-black text-lg text-emerald-600">{athlete.khelScore}</span>
              </div>
              <div>
                <span className="text-slate-500 font-bold block text-[10px]">NATL RANK</span>
                <span className="font-display font-black text-lg text-slate-900">#{athlete.rank}</span>
              </div>
            </div>

            <Button
              variant="secondary"
              size="sm"
              className="w-full"
              rightIcon={<ArrowRight className="w-4 h-4" />}
              onClick={() => navigate('/app/profile')}
            >
              View Full Profile
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};
