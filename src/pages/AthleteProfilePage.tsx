import React from 'react';
import { CURRENT_ATHLETE_PROFILE } from '../data/mockProfiles';
import { AthleteAvatar } from '../components/common/AthleteAvatar';
import { Badge } from '../components/common/Badge';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { MapPin, Award, Trophy, Share2, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const AthleteProfilePage: React.FC = () => {
  const profile = CURRENT_ATHLETE_PROFILE;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header Profile Hero */}
      <div className="bg-[#11161E] border border-slate-800 rounded-2xl p-6 md:p-8 relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <AthleteAvatar src={profile.avatar} name={profile.name} size="xl" level={profile.level} verified />

          <div className="space-y-2 text-center md:text-left flex-1">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
              <h1 className="text-2xl md:text-3xl font-black text-white font-display">{profile.name}</h1>
              <Badge variant="emerald">VERIFIED ATHLETE</Badge>
              <Badge variant="amber">{profile.level} TIER</Badge>
            </div>

            <p className="text-xs text-slate-400 font-medium flex items-center justify-center md:justify-start gap-1">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              <span>
                {profile.location.district}, {profile.location.state} · Age {profile.age}
              </span>
            </p>

            <p className="text-xs text-slate-300 max-w-xl leading-relaxed">{profile.bio}</p>
          </div>

          <Button
            variant="outline"
            size="sm"
            leftIcon={<Share2 className="w-4 h-4" />}
            onClick={() => alert('Shareable athlete card link copied!')}
          >
            Share Profile
          </Button>
        </div>
      </div>

      {/* Stats Summary Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="text-center p-4">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">KhelScore</span>
          <span className="font-display font-black text-2xl text-emerald-400">{profile.khelScore}</span>
        </Card>

        <Card className="text-center p-4">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">State Rank</span>
          <span className="font-display font-black text-2xl text-white">#{profile.rankState}</span>
        </Card>

        <Card className="text-center p-4">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">District Rank</span>
          <span className="font-display font-black text-2xl text-lime-400">#{profile.rankDistrict}</span>
        </Card>

        <Card className="text-center p-4">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Tests Done</span>
          <span className="font-display font-black text-2xl text-white">{profile.totalAssessments}</span>
        </Card>
      </div>

      {/* Badges & Achievements */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white font-display flex items-center gap-2">
          <Award className="w-5 h-5 text-amber-400" />
          <span>Earned Achievements & Badges</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {profile.achievements.map((ach) => (
            <Card key={ach.id} className="space-y-2 text-center p-4">
              <div className="w-10 h-10 rounded-full bg-amber-500/10 text-amber-400 mx-auto flex items-center justify-center font-bold">
                <Trophy className="w-5 h-5" />
              </div>
              <h4 className="text-xs font-bold text-white font-display">{ach.title}</h4>
              <p className="text-[11px] text-slate-400">{ach.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
