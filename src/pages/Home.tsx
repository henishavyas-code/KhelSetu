import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Card } from '../components/common/Card';
import { ASSESSMENTS_DATA } from '../data/assessmentsData';
import { SPORTS_DATA } from '../data/sportsData';
import { LEADERBOARD_DATA } from '../data/leaderboardData';
import { LeaderboardRow } from '../components/common/LeaderboardRow';
import {
  ArrowRight,
  ShieldCheck,
  Zap,
  Activity,
  Award,
  Users,
  Building2,
  Brain,
  CheckCircle2,
  Play,
  TrendingUp,
  Camera,
  Target,
  Sparkles,
  Search,
  ChevronRight
} from 'lucide-react';

export const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-24 pb-20">
      {/* 1. Hero Section */}
      <section className="relative pt-10 pb-16 md:pt-16 md:pb-24 bg-gradient-to-b from-white via-[#F8FAF9] to-[#F3F6F4] border-b border-slate-200/60 bg-grid-pattern-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-3.5 py-1.5 rounded-full text-xs font-bold text-emerald-700">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>AI-POWERED SPORTS ASSESSMENT PLATFORM</span>
              </div>

              <h1 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl text-slate-900 tracking-tight leading-none">
                TALENT IS EVERYWHERE. <br />
                <span className="text-emerald-600">OPPORTUNITY ISN'T.</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed mx-auto lg:mx-0 font-medium">
                KhelSetu helps athletes measure their physical performance, improve their abilities, and build a digital performance profile through accessible AI-powered assessment.
              </p>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                <Button
                  variant="primary"
                  size="lg"
                  rightIcon={<ArrowRight className="w-5 h-5" />}
                  onClick={() => navigate('/app/dashboard')}
                >
                  START YOUR ASSESSMENT
                </Button>
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={() => navigate('/sports')}
                >
                  EXPLORE SPORTS
                </Button>
              </div>

              {/* Quick Pillars */}
              <div className="pt-8 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-600 font-bold border-t border-slate-200/80">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Standardized Fitness Tests</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Camera-Based Rep Counting</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>National Scout Discovery</span>
                </div>
              </div>
            </div>

            {/* Right Authentic Sports Photography & AI HUD Overlay */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md bg-white border border-slate-200 rounded-3xl p-3 shadow-xl">
                <div className="relative h-[420px] rounded-2xl overflow-hidden bg-slate-900">
                  <img
                    src="https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=800&q=80"
                    alt="Indian athlete performing training assessment"
                    className="w-full h-full object-cover opacity-85"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/40" />

                  {/* Dark Engine HUD Preview */}
                  <div className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-emerald-500/40 text-xs font-mono text-emerald-400 font-bold flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    AI TRACKING ACTIVE
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 bg-slate-950/90 backdrop-blur-md p-4 rounded-xl border border-slate-800 text-xs flex justify-between items-center text-white">
                    <div>
                      <span className="text-slate-400 block text-[10px] font-bold uppercase">REP COUNTER</span>
                      <span className="font-mono text-2xl font-black text-emerald-400">14 / 20</span>
                    </div>
                    <div className="text-right">
                      <span className="text-slate-400 block text-[10px] font-bold uppercase">FORM SCORE</span>
                      <span className="font-mono text-2xl font-black text-lime-400">88%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Trust / Impact Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-slate-200/80 rounded-3xl p-8 md:p-12 shadow-sm space-y-8">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">PROVABLE METRIC IMPACT</span>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 font-display">
              BUILT FOR THE NEXT GENERATION OF ATHLETES
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="space-y-1">
              <span className="font-display font-black text-3xl md:text-5xl text-emerald-600 block">10K+</span>
              <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">Grassroots Athletes</span>
            </div>
            <div className="space-y-1">
              <span className="font-display font-black text-3xl md:text-5xl text-slate-900 block">25+</span>
              <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">Sports Disciplines</span>
            </div>
            <div className="space-y-1">
              <span className="font-display font-black text-3xl md:text-5xl text-emerald-600 block">50K+</span>
              <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">AI Assessments Logged</span>
            </div>
            <div className="space-y-1">
              <span className="font-display font-black text-3xl md:text-5xl text-slate-900 block">100+</span>
              <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">Performance Metrics</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. How KhelSetu Works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <Badge variant="emerald">Clear 4-Step Process</Badge>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 font-display">
            HOW KHELSETU WORKS
          </h2>
          <p className="text-sm text-slate-600 font-medium">
            From smartphone camera recording to certified national talent discovery.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="space-y-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 font-black text-lg flex items-center justify-center font-display">
              01
            </div>
            <h3 className="text-base font-bold text-slate-900 font-display">CREATE YOUR ATHLETE PROFILE</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Set up your primary sport discipline, age group, and location in under two minutes.
            </p>
          </Card>

          <Card className="space-y-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 font-black text-lg flex items-center justify-center font-display">
              02
            </div>
            <h3 className="text-base font-bold text-slate-900 font-display">CHOOSE YOUR ASSESSMENT</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Select from certified tests including Push-ups, Squats, Sprints, Plank, or Vertical Jump.
            </p>
          </Card>

          <Card className="space-y-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 font-black text-lg flex items-center justify-center font-display">
              03
            </div>
            <h3 className="text-base font-bold text-slate-900 font-display">PERFORM WITH YOUR CAMERA</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Prop your phone camera. Our AI vision tracks key joints and logs valid repetitions.
            </p>
          </Card>

          <Card className="space-y-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 font-black text-lg flex items-center justify-center font-display">
              04
            </div>
            <h3 className="text-base font-bold text-slate-900 font-display">GET YOUR PERFORMANCE SCORE</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Receive instant KhelScore ratings, form feedback, and rank on national scout leaderboards.
            </p>
          </Card>
        </div>
      </section>

      {/* 4. Sports Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <Badge variant="emerald">Multisport Benchmarks</Badge>
            <h2 className="text-3xl font-black text-slate-900 font-display">
              Built For Major Sports Disciplines
            </h2>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/sports')}
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Explore All Sports
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SPORTS_DATA.slice(0, 6).map((sport) => (
            <div
              key={sport.id}
              onClick={() => navigate('/sports')}
              className="group bg-white border border-slate-200/80 rounded-2xl overflow-hidden card-hover-shadow cursor-pointer space-y-4"
            >
              <div className="h-48 overflow-hidden relative">
                <img
                  src={sport.bannerImage}
                  alt={sport.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                <div className="absolute bottom-3 left-3 text-white">
                  <Badge variant="emerald">{sport.category}</Badge>
                  <h3 className="text-lg font-bold font-display mt-1">{sport.name}</h3>
                </div>
              </div>
              <div className="px-5 pb-5 space-y-2">
                <p className="text-xs text-slate-600 line-clamp-2">{sport.description}</p>
                <span className="text-[11px] font-bold text-emerald-600 block">
                  {sport.assessmentCount} Tests Available
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. AI Assessment Feature Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 md:p-14 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <Badge variant="emerald">AI AS A PRODUCT FEATURE</Badge>
            <h2 className="text-3xl md:text-5xl font-black font-display tracking-tight leading-tight">
              AI-POWERED MOVEMENT ASSESSMENT
            </h2>
            <p className="text-sm md:text-base text-slate-300 leading-relaxed font-medium">
              Artificial intelligence helps athletes understand their physical limits. Our vision engine evaluates joint trajectory angle, repetition tempo, and posture control in real time.
            </p>

            <div className="grid grid-cols-2 gap-4 text-xs font-bold">
              <div className="flex items-center gap-2 bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                <Brain className="w-4 h-4 text-emerald-400" />
                <span>AI Movement Analysis</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                <Activity className="w-4 h-4 text-emerald-400" />
                <span>Automated Rep Counting</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Form & Posture Ratings</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                <Award className="w-4 h-4 text-emerald-400" />
                <span>Standardized KhelScore</span>
              </div>
            </div>

            <Button
              variant="primary"
              size="md"
              onClick={() => navigate('/app/dashboard')}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              TRY CAMERA ASSESSMENT
            </Button>
          </div>

          <div className="lg:col-span-5 bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex justify-between items-center text-xs font-bold border-b border-slate-800 pb-3">
              <span className="text-slate-300">LIVE TELEMETRY PREVIEW</span>
              <span className="text-emerald-400 font-mono">98.4% ACCURACY</span>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <div className="flex justify-between bg-slate-900 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-400">ELBOW FLEXION ANGLE</span>
                <span className="text-emerald-400 font-bold">86° (PASSED)</span>
              </div>
              <div className="flex justify-between bg-slate-900 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-400">SPINAL DEVIATION</span>
                <span className="text-lime-400 font-bold">2.4° (STABLE)</span>
              </div>
              <div className="flex justify-between bg-slate-900 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-400">CADENCE FREQUENCY</span>
                <span className="text-white font-bold">1.8 Reps / sec</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Performance Intelligence */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <Badge variant="cyan">Longitudinal Progress</Badge>
          <h2 className="text-3xl font-black text-slate-900 font-display">
            Performance Intelligence Across 6 Pillars
          </h2>
          <p className="text-sm text-slate-600">
            Athletes track their growth across Strength, Endurance, Speed, Mobility, Balance, and Explosiveness.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {['Strength', 'Endurance', 'Speed', 'Mobility', 'Balance', 'Explosiveness'].map((cat, i) => (
            <Card key={cat} className="text-center p-4 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 font-bold mx-auto flex items-center justify-center">
                <Zap className="w-5 h-5" />
              </div>
              <h4 className="text-xs font-bold text-slate-900 font-display">{cat}</h4>
              <span className="text-xs font-mono font-bold text-emerald-600">{80 + i * 2}%</span>
            </Card>
          ))}
        </div>
      </section>

      {/* 7. From Performance to Opportunity */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-emerald-950 text-white rounded-3xl p-8 md:p-14 space-y-8">
        <div className="max-w-3xl space-y-4">
          <Badge variant="emerald">KHELSETU DIFFERENTIATOR</Badge>
          <h2 className="text-3xl md:text-5xl font-black font-display leading-tight">
            FROM PERFORMANCE TO OPPORTUNITY
          </h2>
          <p className="text-sm md:text-base text-emerald-100 leading-relaxed font-medium">
            KhelSetu is not just an assessment app. It is a digital highway connecting grassroots effort directly to scouts, state selection trials, and accredited academies.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
          <div className="bg-emerald-900/60 border border-emerald-800 p-5 rounded-2xl space-y-2">
            <span className="text-xs font-mono text-emerald-400 font-bold block">STAGE 1</span>
            <h4 className="text-base font-bold font-display">Athlete Profile</h4>
            <p className="text-xs text-emerald-200">Digital baseline registration.</p>
          </div>

          <div className="bg-emerald-900/60 border border-emerald-800 p-5 rounded-2xl space-y-2">
            <span className="text-xs font-mono text-emerald-400 font-bold block">STAGE 2</span>
            <h4 className="text-base font-bold font-display">Verified Assessments</h4>
            <p className="text-xs text-emerald-200">Camera AI movement logs.</p>
          </div>

          <div className="bg-emerald-900/60 border border-emerald-800 p-5 rounded-2xl space-y-2">
            <span className="text-xs font-mono text-emerald-400 font-bold block">STAGE 3</span>
            <h4 className="text-base font-bold font-display">Performance Record</h4>
            <p className="text-xs text-emerald-200">Provable score portfolio.</p>
          </div>

          <div className="bg-emerald-900/60 border border-emerald-800 p-5 rounded-2xl space-y-2">
            <span className="text-xs font-mono text-emerald-400 font-bold block">STAGE 4</span>
            <h4 className="text-base font-bold font-display">Scout Discoverability</h4>
            <p className="text-xs text-emerald-200">Trial invitations & recruitment.</p>
          </div>
        </div>
      </section>

      {/* 8. For Organizations (BUILD A STRONGER SPORTS PIPELINE) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-slate-200 pb-8">
          <div className="space-y-3 max-w-2xl">
            <Badge variant="emerald">FOR SPORTS BODIES & ACADEMIES</Badge>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 font-display">
              BUILD A STRONGER SPORTS PIPELINE
            </h2>
            <p className="text-sm text-slate-600 font-medium">
              KhelSetu enables sports organizations, academies, schools, and talent programs to assess athletes at scale using standardized digital performance data.
            </p>
          </div>
          <Button variant="primary" size="md" onClick={() => navigate('/organizations')}>
            EXPLORE SCOUTING SOLUTIONS
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="space-y-3">
            <Building2 className="w-6 h-6 text-emerald-600" />
            <h3 className="text-base font-bold text-slate-900 font-display">Sports Authorities</h3>
            <p className="text-xs text-slate-600 leading-relaxed">Mass fitness screening drives across districts with automated anti-cheat hashes.</p>
          </Card>

          <Card className="space-y-3">
            <Award className="w-6 h-6 text-emerald-600" />
            <h3 className="text-base font-bold text-slate-900 font-display">Sports Academies</h3>
            <p className="text-xs text-slate-600 leading-relaxed">Standardize intake selection trials with biomechanical objective scores.</p>
          </Card>

          <Card className="space-y-3">
            <Users className="w-6 h-6 text-emerald-600" />
            <h3 className="text-base font-bold text-slate-900 font-display">Schools & Colleges</h3>
            <p className="text-xs text-slate-600 leading-relaxed">Track student athletic development year-over-year.</p>
          </Card>

          <Card className="space-y-3">
            <Search className="w-6 h-6 text-emerald-600" />
            <h3 className="text-base font-bold text-slate-900 font-display">Talent Scouts</h3>
            <p className="text-xs text-slate-600 leading-relaxed">Filter talent profiles by state, age, KhelScore, and fitness categories.</p>
          </Card>
        </div>
      </section>

      {/* 9. National Leaderboard Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <h2 className="text-2xl font-black text-slate-900 font-display">Top Ranked Athletes</h2>
            <p className="text-xs text-slate-600 font-medium">Verified KhelScores across national assessments.</p>
          </div>
          <Button variant="outline" size="sm" onClick={() => navigate('/leaderboard')} rightIcon={<ChevronRight className="w-4 h-4" />}>
            View Full Leaderboard
          </Button>
        </div>

        <div className="space-y-3">
          {LEADERBOARD_DATA.slice(0, 4).map((entry) => (
            <LeaderboardRow key={entry.id} entry={entry} />
          ))}
        </div>
      </section>

      {/* 10. Final Call to Action */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-emerald-600 to-emerald-800 text-white rounded-3xl p-10 md:p-14 text-center space-y-6 shadow-xl">
          <h2 className="text-3xl md:text-5xl font-black font-display">
            Start Your AI Sports Assessment Today
          </h2>
          <p className="text-sm md:text-base text-emerald-100 max-w-xl mx-auto font-medium">
            Join thousands of athletes measuring their performance and unlocking opportunities.
          </p>
          <Button
            variant="primary"
            size="lg"
            className="bg-white hover:bg-slate-100 text-slate-950 font-black shadow-lg"
            onClick={() => navigate('/app/dashboard')}
          >
            START ASSESSMENT NOW
          </Button>
        </div>
      </section>
    </div>
  );
};
