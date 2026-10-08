export type UserRole = 'athlete' | 'coach' | 'scout' | 'admin';

export type AthleteLevel = 'Bronze' | 'Silver' | 'Gold' | 'Elite';

export type FitnessCategory = 
  | 'Strength'
  | 'Endurance'
  | 'Speed'
  | 'Mobility'
  | 'Balance'
  | 'Explosiveness';

export type AssessmentDifficulty = 'Beginner' | 'Intermediate' | 'Advanced';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  createdAt: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt: string;
  category: string;
}

export interface PersonalBest {
  assessmentId: string;
  assessmentTitle: string;
  score: number;
  reps: number;
  achievedAt: string;
}

export interface AthleteProfile {
  id: string;
  userId: string;
  name: string;
  age: number;
  gender: string;
  location: {
    state: string;
    district: string;
    city: string;
  };
  primarySport: string;
  secondarySports: string[];
  khelScore: number;
  level: AthleteLevel;
  avatar: string;
  bio: string;
  totalAssessments: number;
  rankGlobal: number;
  rankState: number;
  rankDistrict: number;
  streakDays: number;
  personalBests: PersonalBest[];
  achievements: Achievement[];
  verifiedStatus: boolean;
}

export interface Sport {
  id: string;
  name: string;
  category: string;
  iconName: string;
  bannerImage: string;
  description: string;
  assessmentCount: number;
  athletesCount: number;
  popularAssessments: string[];
}

export interface Assessment {
  id: string;
  title: string;
  sportId: string;
  sportName: string;
  category: FitnessCategory;
  difficulty: AssessmentDifficulty;
  durationSeconds: number;
  targetReps: number;
  description: string;
  instructions: string[];
  equipmentNeeded: string;
  keypointsTracked: string[];
  thumbnail: string;
}

export interface RepDetail {
  repNumber: number;
  formScore: number;
  durationSeconds: number;
  depthAngle: number;
  quality: 'Excellent' | 'Good' | 'Needs Work';
}

export interface AssessmentAttempt {
  id: string;
  assessmentId: string;
  assessmentTitle: string;
  athleteId: string;
  timestamp: string;
  repetitionsCount: number;
  targetReps: number;
  formScore: number;
  consistencyScore: number;
  speedScore: number;
  rangeOfMotionScore: number;
  overallScore: number;
  bestRepScore: number;
  avgRepScore: number;
  repDetails: RepDetail[];
  aiInsights: string[];
  recommendedSteps: string[];
  status: 'completed' | 'in_progress' | 'cancelled';
}

export interface AssessmentResult {
  attempt: AssessmentAttempt;
  breakdown: {
    form: number;
    consistency: number;
    speed: number;
    rangeOfMotion: number;
  };
  nextSteps: string[];
}

export interface CategoryScore {
  category: FitnessCategory;
  score: number;
  maxScore: number;
  percentile: number;
}

export interface ProgressTrendPoint {
  date: string;
  score: number;
  reps: number;
}

export interface PerformanceMetrics {
  khelScore: number;
  categoryScores: CategoryScore[];
  progressTrend: ProgressTrendPoint[];
  personalBests: PersonalBest[];
  recentAssessmentsCount: number;
}

export interface LeaderboardEntry {
  id: string;
  athleteId: string;
  athleteName: string;
  athleteAvatar: string;
  sport: string;
  location: string;
  khelScore: number;
  level: AthleteLevel;
  rank: number;
  rankChange: number; // +2, -1, 0
  assessmentsCompleted: number;
  isCurrentUser?: boolean;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'assessment' | 'achievement' | 'rank_change' | 'system';
  link?: string;
}

export interface PoseKeypoint {
  name: string;
  x: number; // 0..1
  y: number; // 0..1
  z?: number;
  visibility?: number;
}

export type MovementState = 
  | 'IDLE'
  | 'GET_READY'
  | 'START'
  | 'DOWN'
  | 'UP'
  | 'HOLD'
  | 'REPETITION_COMPLETE';

export interface CameraState {
  hasPermission: boolean | null;
  isStreaming: boolean;
  error: string | null;
  activeDeviceId: string | null;
  availableDevices: MediaDeviceInfo[];
}
