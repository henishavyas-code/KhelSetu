import React from 'react';
import { useLeaderboard } from '../hooks/useLeaderboard';
import { LeaderboardRow } from '../components/common/LeaderboardRow';
import { Badge } from '../components/common/Badge';
import { Tabs } from '../components/common/Tabs';
import { Select } from '../components/common/Select';
import { SPORTS_DATA } from '../data/sportsData';

export const PublicLeaderboardPage: React.FC = () => {
  const { entries, scope, setScope, sportFilter, setSportFilter } = useLeaderboard();

  const scopeTabs = [
    { id: 'global', label: 'Global' },
    { id: 'state', label: 'State' },
    { id: 'district', label: 'District' },
    { id: 'college', label: 'College / School' },
    { id: 'friends', label: 'Friends' }
  ];

  const sportOptions = [
    { value: 'all', label: 'All Sports Disciplines' },
    ...SPORTS_DATA.map((s) => ({ value: s.name, label: s.name }))
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <Badge variant="emerald">Authenticated Rankings</Badge>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 font-display">
          National Sports Leaderboard
        </h1>
        <p className="text-sm text-slate-600 font-medium">
          Rankings are calculated dynamically based on verified AI camera assessment attempts.
        </p>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        <Tabs tabs={scopeTabs} activeTab={scope} onChange={(id) => setScope(id as any)} />
        <div className="w-full md:w-64">
          <Select
            options={sportOptions}
            value={sportFilter}
            onChange={(e) => setSportFilter(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-3">
        {entries.map((entry) => (
          <LeaderboardRow key={entry.id} entry={entry} />
        ))}
      </div>
    </div>
  );
};
