import { LeaderboardEntry } from '../types';
import { LEADERBOARD_DATA } from '../data/leaderboardData';

export type LeaderboardScope = 'global' | 'state' | 'district' | 'college' | 'friends';

export const leaderboardService = {
  async getLeaderboard(scope: LeaderboardScope = 'global', sportFilter?: string): Promise<LeaderboardEntry[]> {
    let list = [...LEADERBOARD_DATA];

    if (sportFilter && sportFilter !== 'all') {
      list = list.filter(item => item.sport.toLowerCase().includes(sportFilter.toLowerCase()));
    }

    if (scope === 'state') {
      list = list.filter(item => item.location.includes('Gujarat') || item.rank <= 5 || item.isCurrentUser);
    } else if (scope === 'district') {
      list = list.filter(item => item.location.includes('Ahmedabad') || item.rank <= 3 || item.isCurrentUser);
    }

    return list.sort((a, b) => b.khelScore - a.khelScore);
  }
};
