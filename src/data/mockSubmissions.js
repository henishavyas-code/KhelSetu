// KHELSETU DEMO AUDIT SUBMISSIONS DATASET
export const mockSubmissions = [
  {
    id: "KS-2026-001482",
    athleteId: "ATH-2026-0091",
    athleteName: "Aarav Patel",
    district: "Kheda",
    state: "Gujarat",
    exercise: "Push-up",
    reps: 34,
    score: 87.4,
    formAccuracy: 92,
    cadence: 1.8, // reps/sec
    risk: "Low", // Low, Medium, High
    status: "Verified", // Verified, Pending Audit, Flagged, Rejected
    timestamp: "2026-08-14 16:42:10 IST",
    device: "Redmi Note 12 5G (Android 13)",
    gpsLocation: "22.7500° N, 72.8667° E (Kheda District)",
    videoHash: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    flaggedReason: null,
    telemetryTimeline: [
      { time: "00:00", rep: 0, elbowAngle: 175, state: "READY", cadence: 0.0, confidence: 0.98 },
      { time: "00:02", rep: 1, elbowAngle: 84, state: "DOWN", cadence: 1.7, confidence: 0.96 },
      { time: "00:04", rep: 2, elbowAngle: 172, state: "UP", cadence: 1.8, confidence: 0.97 },
      { time: "00:06", rep: 3, elbowAngle: 86, state: "DOWN", cadence: 1.8, confidence: 0.95 },
      { time: "00:08", rep: 4, elbowAngle: 174, state: "UP", cadence: 1.8, confidence: 0.96 }
    ]
  },
  {
    id: "KS-2026-001490",
    athleteId: "ATH-2026-0142",
    athleteName: "Sunita Mahato",
    district: "Bhubaneswar",
    state: "Odisha",
    exercise: "Sit-up",
    reps: 52,
    score: 86.8,
    formAccuracy: 95,
    cadence: 2.1,
    risk: "Low",
    status: "Verified",
    timestamp: "2026-08-15 11:20:05 IST",
    device: "Samsung Galaxy M34 (Android 14)",
    gpsLocation: "20.2961° N, 85.8245° E (Bhubaneswar)",
    videoHash: "7d12a98f12c34098efab22301984210a5e8f4c2b1890efcd432a11b980fc87aa",
    flaggedReason: null,
    telemetryTimeline: [
      { time: "00:00", rep: 0, torsoAngle: 180, state: "READY", cadence: 0.0, confidence: 0.99 },
      { time: "00:02", rep: 1, torsoAngle: 45, state: "UP", cadence: 2.0, confidence: 0.97 },
      { time: "00:04", rep: 2, torsoAngle: 178, state: "DOWN", cadence: 2.1, confidence: 0.98 }
    ]
  },
  {
    id: "KS-2026-001501",
    athleteId: "ATH-2026-0881",
    athleteName: "Devendra Singh",
    district: "Vadodara",
    state: "Gujarat",
    exercise: "Push-up",
    reps: 45,
    score: 72.1,
    formAccuracy: 64,
    cadence: 3.8, // unnaturally high cadence
    risk: "High",
    status: "Flagged",
    timestamp: "2026-08-16 09:15:33 IST",
    device: "Realme Narzo 50 (Android 12)",
    gpsLocation: "22.3072° N, 73.1812° E (Vadodara)",
    videoHash: "90ab87cf21890ef1234a56b7890cd12ef45678ab9012cd34ef567890ab12cd34",
    flaggedReason: "Rep cadence exceeds expected maximum threshold (3.8 reps/s detected)",
    telemetryTimeline: [
      { time: "00:00", rep: 0, elbowAngle: 170, state: "READY", cadence: 0.0, confidence: 0.81 },
      { time: "00:01", rep: 3, elbowAngle: 110, state: "DOWN", cadence: 3.5, confidence: 0.65 },
      { time: "00:02", rep: 7, elbowAngle: 160, state: "UP", cadence: 4.1, confidence: 0.58 }
    ]
  },
  {
    id: "KS-2026-001509",
    athleteId: "ATH-2026-0922",
    athleteName: "Priya Sharma",
    district: "Anand",
    state: "Gujarat",
    exercise: "Push-up",
    reps: 30,
    score: 79.5,
    formAccuracy: 81,
    cadence: 1.6,
    risk: "Medium",
    status: "Pending Audit",
    timestamp: "2026-08-16 14:02:19 IST",
    device: "POCO X5 Pro (Android 13)",
    gpsLocation: "22.5645° N, 72.9289° E (Anand)",
    videoHash: "1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
    flaggedReason: "Unusual lighting condition causing low skeleton landmark confidence (0.72)",
    telemetryTimeline: [
      { time: "00:00", rep: 0, elbowAngle: 175, state: "READY", cadence: 0.0, confidence: 0.75 },
      { time: "00:03", rep: 1, elbowAngle: 90, state: "DOWN", cadence: 1.5, confidence: 0.70 },
      { time: "00:06", rep: 2, elbowAngle: 170, state: "UP", cadence: 1.6, confidence: 0.72 }
    ]
  },
  {
    id: "KS-2026-001514",
    athleteId: "ATH-2026-1044",
    athleteName: "Manish Verma",
    district: "Patna",
    state: "Bihar",
    exercise: "Sit-up",
    reps: 60,
    score: 68.0,
    formAccuracy: 58,
    cadence: 2.9,
    risk: "High",
    status: "Flagged",
    timestamp: "2026-08-16 18:30:00 IST",
    device: "Vivo T2x 5G (Android 13)",
    gpsLocation: "25.5941° N, 85.1376° E (Patna)",
    videoHash: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855", // Duplicate hash with Aarav!
    flaggedReason: "Duplicate video SHA-256 fingerprint matching previously verified submission",
    telemetryTimeline: [
      { time: "00:00", rep: 0, torsoAngle: 180, state: "READY", cadence: 0.0, confidence: 0.95 },
      { time: "00:02", rep: 2, torsoAngle: 50, state: "UP", cadence: 2.8, confidence: 0.89 }
    ]
  }
];
