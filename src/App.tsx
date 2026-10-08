import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import { PublicLayout } from './layouts/PublicLayout';
import { AthleteAppLayout } from './layouts/AthleteAppLayout';

// Public Pages
import { Home } from './pages/Home';
import { HowItWorks } from './pages/HowItWorks';
import { AssessmentsPage } from './pages/AssessmentsPage';
import { SportsPage } from './pages/SportsPage';
import { AthletesPage } from './pages/AthletesPage';
import { OrganizationsPage } from './pages/OrganizationsPage';
import { AboutPage } from './pages/AboutPage';
import { PublicLeaderboardPage } from './pages/PublicLeaderboardPage';
import { FAQPage } from './pages/FAQPage';
import { ContactPage } from './pages/ContactPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsPage } from './pages/TermsPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Athlete Portal Pages
import { AthleteDashboardPage } from './pages/AthleteDashboardPage';
import { AthleteAssessmentRunnerPage } from './pages/AthleteAssessmentRunnerPage';
import { AthletePerformancePage } from './pages/AthletePerformancePage';
import { AthleteHistoryPage } from './pages/AthleteHistoryPage';
import { AthleteProfilePage } from './pages/AthleteProfilePage';
import { AthleteSettingsPage } from './pages/AthleteSettingsPage';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public Commercial Web Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/assessments" element={<AssessmentsPage />} />
          <Route path="/sports" element={<SportsPage />} />
          <Route path="/athletes" element={<AthletesPage />} />
          <Route path="/organizations" element={<OrganizationsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/leaderboard" element={<PublicLeaderboardPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/privacy" element={<PrivacyPolicyPage />} />
          <Route path="/terms" element={<TermsPage />} />

          {/* Legacy / Alias fallbacks */}
          <Route path="/explore" element={<AssessmentsPage />} />
          <Route path="/platform" element={<HowItWorks />} />
          <Route path="/resources" element={<FAQPage />} />
        </Route>

        {/* Logged-In Athlete Application Routes */}
        <Route path="/app" element={<AthleteAppLayout />}>
          <Route index element={<Navigate to="/app/dashboard" replace />} />
          <Route path="dashboard" element={<AthleteDashboardPage />} />
          <Route path="assessments" element={<AthleteAssessmentRunnerPage />} />
          <Route path="performance" element={<AthletePerformancePage />} />
          <Route path="leaderboard" element={<PublicLeaderboardPage />} />
          <Route path="history" element={<AthleteHistoryPage />} />
          <Route path="profile" element={<AthleteProfilePage />} />
          <Route path="settings" element={<AthleteSettingsPage />} />
        </Route>

        {/* Backward Compatibility Athlete Paths */}
        <Route path="/athlete/home" element={<Navigate to="/app/dashboard" replace />} />
        <Route path="/athlete/assessment" element={<Navigate to="/app/assessments" replace />} />
        <Route path="/athlete/history" element={<Navigate to="/app/history" replace />} />
        <Route path="/athlete/profile" element={<Navigate to="/app/profile" replace />} />
        <Route path="/athlete/login" element={<Navigate to="/login" replace />} />
        <Route path="/athlete/register" element={<Navigate to="/signup" replace />} />

        {/* 404 Catch-All */}
        <Route element={<PublicLayout />}>
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  );
}
