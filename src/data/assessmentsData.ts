import { Assessment } from '../types';

export const ASSESSMENTS_DATA: Assessment[] = [
  {
    id: 'push-ups',
    title: 'Standard Push-ups Test',
    sportId: 'athletics',
    sportName: 'Athletics & General Physicality',
    category: 'Strength',
    difficulty: 'Intermediate',
    durationSeconds: 60,
    targetReps: 25,
    description: 'Measures upper-body pushing endurance, chest/tricep strength, and core spinal alignment using elbow joint trajectory tracking.',
    instructions: [
      'Position device horizontally at chest height 2-3 meters away.',
      'Maintain rigid plank line from shoulders to ankles.',
      'Lower chest until elbow flexes to 90 degrees or below.',
      'Extend arms completely to log valid repetition.'
    ],
    equipmentNeeded: 'Yoga Mat / Flat Floor',
    keypointsTracked: ['Shoulder (11, 12)', 'Elbow (13, 14)', 'Wrist (15, 16)', 'Hip (23, 24)'],
    thumbnail: 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'squats',
    title: 'Air Squats Form & Depth',
    sportId: 'kabaddi',
    sportName: 'Kabaddi & Multi-Sport',
    category: 'Explosiveness',
    difficulty: 'Beginner',
    durationSeconds: 60,
    targetReps: 30,
    description: 'Evaluates lower-body quadricep/glute endurance, hip hinge mobility, and knee valgus alignment.',
    instructions: [
      'Stand facing camera full-body in frame.',
      'Feet shoulder-width apart, toes slightly flared.',
      'Descend until hip crease drops below parallel (knee angle <= 90°).',
      'Drive up through heels to full standing position.'
    ],
    equipmentNeeded: 'None',
    keypointsTracked: ['Hip (23, 24)', 'Knee (25, 26)', 'Ankle (27, 28)'],
    thumbnail: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'sit-ups',
    title: 'Core Sit-ups Endurance',
    sportId: 'football',
    sportName: 'Football & Combat',
    category: 'Strength',
    difficulty: 'Beginner',
    durationSeconds: 60,
    targetReps: 30,
    description: 'Assesses rectus abdominis strength and trunk flexion control via neck-hip angle differential.',
    instructions: [
      'Lie on back with knees bent at 90 degrees.',
      'Keep feet flat on ground in full camera view.',
      'Elevate torso until elbows touch knees.',
      'Return back under control until shoulder blades contact mat.'
    ],
    equipmentNeeded: 'Floor Mat',
    keypointsTracked: ['Shoulder (11, 12)', 'Hip (23, 24)', 'Knee (25, 26)'],
    thumbnail: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'plank',
    title: 'Isometric Plank Hold',
    sportId: 'wrestling',
    sportName: 'Wrestling & Swimming',
    category: 'Endurance',
    difficulty: 'Intermediate',
    durationSeconds: 90,
    targetReps: 1,
    description: 'Measures deep core trunk stability and endurance without lumbar sagging or hip elevation.',
    instructions: [
      'Place forearms flat on floor shoulder-width apart.',
      'Extend legs straight back, resting on toes.',
      'Maintain horizontal spine alignment within 5-degree threshold.',
      'Hold position continuously until timer expires.'
    ],
    equipmentNeeded: 'Mat',
    keypointsTracked: ['Shoulder (11, 12)', 'Hip (23, 24)', 'Ankle (27, 28)'],
    thumbnail: 'https://images.unsplash.com/photo-1566241142559-40e1dab266c6?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'vertical-jump',
    title: 'Vertical Jump Explosiveness',
    sportId: 'basketball',
    sportName: 'Basketball & Volleyball',
    category: 'Explosiveness',
    difficulty: 'Advanced',
    durationSeconds: 30,
    targetReps: 5,
    description: 'Calculates vertical leap displacement height (cm) and ground reaction flight duration.',
    instructions: [
      'Stand facing side profile to camera.',
      'Dip into countermovement squat with arm swing back.',
      'Explode upward reaching highest point.',
      'Land softly on balls of feet absorbing impact.'
    ],
    equipmentNeeded: 'Clear High Ceiling Area',
    keypointsTracked: ['Hip (23, 24)', 'Ankle (27, 28)', 'Wrist (15, 16)'],
    thumbnail: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'sprint',
    title: '10m Shuttle Sprint Velocity',
    sportId: 'athletics',
    sportName: 'Athletics & Cricket',
    category: 'Speed',
    difficulty: 'Advanced',
    durationSeconds: 45,
    targetReps: 4,
    description: 'Tracks acceleration rate, stride cadence, and directional turn responsiveness.',
    instructions: [
      'Mark 10 meter boundary points clearly visible to camera.',
      'Start behind initial line in athletic ready position.',
      'Sprint maximum speed to far line, touch floor, and return.',
      'Repeat for target laps.'
    ],
    equipmentNeeded: 'Open 10m Corridor / Field',
    keypointsTracked: ['Ankle (27, 28)', 'Hip (23, 24)'],
    thumbnail: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'long-run',
    title: 'Cardiovascular Cadence Test',
    sportId: 'swimming',
    sportName: 'Football & Distance Athletics',
    category: 'Endurance',
    difficulty: 'Intermediate',
    durationSeconds: 180,
    targetReps: 1,
    description: 'Monitors sustained high-frequency high-knees / shuttle cadence to gauge aerobic stamina.',
    instructions: [
      'Maintain high knees running gait in fixed frame.',
      'Keep knees lifting above hip height level.',
      'Sustain rhythm without drop in cadence below 120 bpm.'
    ],
    equipmentNeeded: 'Floor Space',
    keypointsTracked: ['Knee (25, 26)', 'Hip (23, 24)'],
    thumbnail: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'balance',
    title: 'Single-Leg Balance Index',
    sportId: 'badminton',
    sportName: 'Badminton & Gymnastics',
    category: 'Balance',
    difficulty: 'Beginner',
    durationSeconds: 45,
    targetReps: 2,
    description: 'Evaluates proprioception, ankle joint stability, and center of mass sway velocity.',
    instructions: [
      'Stand on right leg with hands on hips.',
      'Lift left foot 15cm off floor.',
      'Hold motionless for 20 seconds, then repeat on left leg.',
      'Minimize lateral hip sway and foot micro-adjustments.'
    ],
    equipmentNeeded: 'Flat Level Floor',
    keypointsTracked: ['Hip (23, 24)', 'Knee (25, 26)', 'Ankle (27, 28)'],
    thumbnail: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=800&q=80'
  }
];
