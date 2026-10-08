import { AthleteProfile, PerformanceMetrics, AssessmentAttempt, Notification } from '../types';

export const CURRENT_ATHLETE_PROFILE: AthleteProfile = {
  id: 'ath-profile-cur',
  userId: 'usr-athlete-cur',
  name: 'Aarav Patel',
  age: 18,
  gender: 'Male',
  location: {
    state: 'Gujarat',
    district: 'Ahmedabad',
    city: 'Gandhinagar'
  },
  primarySport: 'Athletics & Track',
  secondarySports: ['Cricket', 'Football / Soccer'],
  khelScore: 78,
  level: 'Bronze',
  avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80',
  bio: 'Grassroots sprinter focusing on 100m acceleration and upper body power conditioning. Target: State Selection 2027.',
  totalAssessments: 8,
  rankGlobal: 142,
  rankState: 14,
  rankDistrict: 3,
  streakDays: 5,
  verifiedStatus: true,
  personalBests: [
    { assessmentId: 'push-ups', assessmentTitle: 'Standard Push-ups Test', score: 84, reps: 26, achievedAt: '2026-08-28' },
    { assessmentId: 'squats', assessmentTitle: 'Air Squats Form & Depth', score: 81, reps: 32, achievedAt: '2026-08-29' },
    { assessmentId: 'vertical-jump', assessmentTitle: 'Vertical Jump Explosiveness', score: 76, reps: 5, achievedAt: '2026-08-25' },
    { assessmentId: 'sprint', assessmentTitle: '10m Shuttle Sprint Velocity', score: 80, reps: 4, achievedAt: '2026-08-30' }
  ],
  achievements: [
    { id: 'ach-1', title: 'First Steps', description: 'Completed first AI camera assessment', icon: 'Award', unlockedAt: '2026-08-20', category: 'Milestone' },
    { id: 'ach-2', title: 'Form Master', description: 'Achieved >85% form rating on squats', icon: 'ShieldCheck', unlockedAt: '2026-08-26', category: 'Technique' },
    { id: 'ach-3', title: '5-Day Streak', description: 'Maintained consecutive testing days', icon: 'Flame', unlockedAt: '2026-08-31', category: 'Consistency' },
    { id: 'ach-4', title: 'District Top 5', description: 'Reached top 5 rank in Ahmedabad', icon: 'Trophy', unlockedAt: '2026-08-29', category: 'Rank' }
  ]
};

export const MOCK_PERFORMANCE_METRICS: PerformanceMetrics = {
  khelScore: 78,
  categoryScores: [
    { category: 'Strength', score: 82, maxScore: 100, percentile: 78 },
    { category: 'Endurance', score: 74, maxScore: 100, percentile: 68 },
    { category: 'Speed', score: 80, maxScore: 100, percentile: 82 },
    { category: 'Mobility', score: 71, maxScore: 100, percentile: 62 },
    { category: 'Balance', score: 76, maxScore: 100, percentile: 72 },
    { category: 'Explosiveness', score: 85, maxScore: 100, percentile: 88 }
  ],
  progressTrend: [
    { date: 'Aug 1', score: 62, reps: 18 },
    { date: 'Aug 7', score: 67, reps: 20 },
    { date: 'Aug 14', score: 71, reps: 22 },
    { date: 'Aug 21', score: 74, reps: 24 },
    { date: 'Aug 28', score: 78, reps: 26 }
  ],
  personalBests: CURRENT_ATHLETE_PROFILE.personalBests,
  recentAssessmentsCount: 8
};

export const MOCK_ASSESSMENT_ATTEMPTS: AssessmentAttempt[] = [
  {
    id: 'att-101',
    assessmentId: 'push-ups',
    assessmentTitle: 'Standard Push-ups Test',
    athleteId: 'ath-profile-cur',
    timestamp: '2026-08-30T14:30:00Z',
    repetitionsCount: 26,
    targetReps: 25,
    formScore: 84,
    consistencyScore: 78,
    speedScore: 76,
    rangeOfMotionScore: 82,
    overallScore: 80,
    bestRepScore: 9.4,
    avgRepScore: 8.2,
    repDetails: [
      { repNumber: 1, formScore: 92, durationSeconds: 2.1, depthAngle: 85, quality: 'Excellent' },
      { repNumber: 2, formScore: 88, durationSeconds: 2.2, depthAngle: 87, quality: 'Excellent' },
      { repNumber: 3, formScore: 85, durationSeconds: 2.3, depthAngle: 89, quality: 'Good' },
      { repNumber: 4, formScore: 81, durationSeconds: 2.5, depthAngle: 92, quality: 'Good' }
    ],
    aiInsights: [
      'Your lower-body control is strong, but your shoulder positioning drifts slightly inward on repetitions 18 to 22.',
      'Core engagement remained steady with less than 4% spinal deviation.'
    ],
    recommendedSteps: [
      'Focus on elbow tucking at 45 degrees relative to torso.',
      'Incorporate 30-second plank holds to stabilize lower back fatigue.'
    ],
    status: 'completed'
  },
  {
    id: 'att-102',
    assessmentId: 'squats',
    assessmentTitle: 'Air Squats Form & Depth',
    athleteId: 'ath-profile-cur',
    timestamp: '2026-08-29T10:15:00Z',
    repetitionsCount: 32,
    targetReps: 30,
    formScore: 86,
    consistencyScore: 80,
    speedScore: 78,
    rangeOfMotionScore: 88,
    overallScore: 83,
    bestRepScore: 9.6,
    avgRepScore: 8.4,
    repDetails: [],
    aiInsights: [
      'Hip depth consistently broke parallel plane.',
      'Excellent heel contact ground stability.'
    ],
    recommendedSteps: [
      'Maintain chest upright posture when descending.'
    ],
    status: 'completed'
  }
];

export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: 'notif-1',
    title: 'Rank Up Alert!',
    message: 'Your district rank moved up +5 places to #3 in Ahmedabad!',
    timestamp: '10 minutes ago',
    read: false,
    type: 'rank_change',
    link: '/app/leaderboard'
  },
  {
    id: 'notif-2',
    title: 'Achievement Unlocked',
    message: 'You earned the "5-Day Streak" consistency badge.',
    timestamp: '2 hours ago',
    read: false,
    type: 'achievement',
    link: '/app/profile'
  },
  {
    id: 'notif-3',
    title: 'New Assessment Ready',
    message: 'Try the 10m Shuttle Sprint Velocity test to boost your Speed score.',
    timestamp: '1 day ago',
    read: true,
    type: 'assessment',
    link: '/app/assessments'
  }
];
