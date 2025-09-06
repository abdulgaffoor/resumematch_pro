import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import ScrollToTop from './components/ScrollToTop';

// Existing pages
import LandingPage from './pages/landing-page';
import MatchReportDashboard from './pages/match-report-dashboard';
import ResumeAnalysisInput from './pages/resume-analysis-input';
import SideBySideComparison from './pages/side-by-side-comparison';
import OptimizedResumePreview from './pages/optimized-resume-preview';
import NotFound from './pages/NotFound';

// New auth pages
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          {/* Existing routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/landing-page" element={<LandingPage />} />
          <Route path="/match-report-dashboard" element={<MatchReportDashboard />} />
          <Route path="/resume-analysis-input" element={<ResumeAnalysisInput />} />
          <Route path="/side-by-side-comparison" element={<SideBySideComparison />} />
          <Route path="/optimized-resume-preview" element={<OptimizedResumePreview />} />
          
          {/* Auth routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* 404 route */}
          <Route path="*" element={<NotFound />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;