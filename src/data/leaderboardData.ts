import { LeaderboardEntry } from '../types';

export const LEADERBOARD_DATA: LeaderboardEntry[] = [
  {
    id: 'lb-1',
    athleteId: 'ath-101',
    athleteName: 'Priya Sharma',
    athleteAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    sport: 'Athletics & Track',
    location: 'Haryana / Rohtak',
    khelScore: 94,
    level: 'Elite',
    rank: 1,
    rankChange: 0,
    assessmentsCompleted: 34
  },
  {
    id: 'lb-2',
    athleteId: 'ath-102',
    athleteName: 'Vikram Singh',
    athleteAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    sport: 'Kabaddi',
    location: 'Punjab / Ludhiana',
    khelScore: 92,
    level: 'Elite',
    rank: 2,
    rankChange: 1,
    assessmentsCompleted: 29
  },
  {
    id: 'lb-3',
    athleteId: 'ath-103',
    athleteName: 'Ananya Reddy',
    athleteAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    sport: 'Badminton',
    location: 'Telangana / Hyderabad',
    khelScore: 90,
    level: 'Gold',
    rank: 3,
    rankChange: -1,
    assessmentsCompleted: 26
  },
  {
    id: 'lb-4',
    athleteId: 'ath-104',
    athleteName: 'Rohan Deshmukh',
    athleteAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    sport: 'Cricket',
    location: 'Maharashtra / Pune',
    khelScore: 88,
    level: 'Gold',
    rank: 4,
    rankChange: 2,
    assessmentsCompleted: 22
  },
  {
    id: 'lb-5',
    athleteId: 'ath-105',
    athleteName: 'Sunita Devi',
    athleteAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    sport: 'Football / Soccer',
    location: 'Manipur / Imphal',
    khelScore: 86,
    level: 'Gold',
    rank: 5,
    rankChange: 0,
    assessmentsCompleted: 19
  },
  {
    id: 'lb-6',
    athleteId: 'ath-106',
    athleteName: 'Karan Nair',
    athleteAvatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80',
    sport: 'Basketball',
    location: 'Kerala / Kochi',
    khelScore: 84,
    level: 'Silver',
    rank: 6,
    rankChange: -2,
    assessmentsCompleted: 17
  },
  {
    id: 'lb-current',
    athleteId: 'current-athlete',
    athleteName: 'Aarav Patel',
    athleteAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80',
    sport: 'Athletics & Track',
    location: 'Gujarat / Ahmedabad',
    khelScore: 78,
    level: 'Bronze',
    rank: 142,
    rankChange: 5,
    assessmentsCompleted: 8,
    isCurrentUser: true
  }
];
