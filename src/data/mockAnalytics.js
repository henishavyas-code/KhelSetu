// KHELSETU DEMO ANALYTICS DATASET
export const mockAnalytics = {
  summary: {
    totalAthletes: 12842,
    totalAssessments: 28419,
    verifiedCount: 25906,
    flaggedCount: 2513,
    activeDistricts: 142,
    avgKhelScore: 78.6,
    verificationRatePct: 91.2
  },

  assessmentsTrend: [
    { month: "Jan 2026", assessments: 2400, verified: 2210, flagged: 190 },
    { month: "Feb 2026", assessments: 3800, verified: 3500, flagged: 300 },
    { month: "Mar 2026", assessments: 5100, verified: 4680, flagged: 420 },
    { month: "Apr 2026", assessments: 6200, verified: 5700, flagged: 500 },
    { month: "May 2026", assessments: 7900, verified: 7200, flagged: 700 },
    { month: "Jun 2026", assessments: 9400, verified: 8600, flagged: 800 },
    { month: "Jul 2026", assessments: 11800, verified: 10800, flagged: 1000 },
    { month: "Aug 2026", assessments: 14200, verified: 12900, flagged: 1300 }
  ],

  stateBreakdown: [
    { state: "Gujarat", assessments: 4842, verified: 4480, avgScore: 81.2 },
    { state: "Bihar", assessments: 3808, verified: 3410, avgScore: 79.4 },
    { state: "Rajasthan", assessments: 3126, verified: 2890, avgScore: 80.1 },
    { state: "Odisha", assessments: 2986, verified: 2750, avgScore: 82.3 },
    { state: "Assam", assessments: 2742, verified: 2510, avgScore: 77.8 },
    { state: "Maharashtra", assessments: 2410, verified: 2200, avgScore: 79.0 },
    { state: "Uttar Pradesh", assessments: 4505, verified: 4010, avgScore: 76.5 }
  ],

  riskDistribution: [
    { name: "Low Risk (Verified)", value: 25906, color: "#10B981" },
    { name: "Medium Risk (Pending)", value: 1840, color: "#F59E0B" },
    { name: "High Risk (Anomaly)", value: 673, color: "#EF4444" }
  ],

  exerciseDistribution: [
    { name: "Push-up Test", percentage: 58, count: 16483 },
    { name: "Sit-up Test", percentage: 42, count: 11936 }
  ],

  scoreDistribution: [
    { range: "50-60", count: 1200 },
    { range: "60-70", count: 4500 },
    { range: "70-80", count: 11800 },
    { range: "80-90", count: 8900 },
    { range: "90-100", count: 2019 }
  ]
};
