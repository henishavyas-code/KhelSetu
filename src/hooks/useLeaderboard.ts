import { useState, useEffect } from 'react';
import { LeaderboardEntry } from '../types';
import { leaderboardService, LeaderboardScope } from '../services/leaderboardService';

export function useLeaderboard(initialScope: LeaderboardScope = 'global', initialSport = 'all') {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [scope, setScope] = useState<LeaderboardScope>(initialScope);
  const [sportFilter, setSportFilter] = useState(initialSport);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    leaderboardService.getLeaderboard(scope, sportFilter).then((data) => {
      setEntries(data);
      setIsLoading(false);
    });
  }, [scope, sportFilter]);

  return {
    entries,
    scope,
    setScope,
    sportFilter,
    setSportFilter,
    isLoading
  };
}
