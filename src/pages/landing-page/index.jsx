import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import HeroSection from './components/HeroSection';
import StepsSection from './components/StepsSection';
import FeaturesSection from './components/FeaturesSection';
import StatsSection from './components/StatsSection';
import TestimonialsSection from './components/TestimonialsSection';
import CTASection from './components/CTASection';

const LandingPage = () => {
  return (
    <>
      <Helmet>
        <title>ResumeMatch Pro - AI-Powered ATS Resume Optimization</title>
        <meta name="description" content="Beat ATS systems with AI-powered resume analysis. Get instant feedback, keyword optimization, and increase your interview chances by up to 73%. Free analysis in 30 seconds." />
        <meta name="keywords" content="ATS resume optimization, resume analysis, job search, interview callbacks, resume keywords, applicant tracking system" />
        <meta property="og:title" content="ResumeMatch Pro - AI-Powered ATS Resume Optimization" />
        <meta property="og:description" content="Transform your resume with AI-powered ATS analysis. Join 50,000+ job seekers who've improved their interview rates." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="/landing-page" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-16">
          <HeroSection />
          <StepsSection />
          <FeaturesSection />
          <StatsSection />
          <TestimonialsSection />
          <CTASection />
        </main>

        {/* Footer */}
        <footer className="bg-text-primary text-white py-12">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8">
              {/* Brand */}
              <div className="md:col-span-2">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">RM</span>
                  </div>
                  <div>
                    <div className="text-lg font-semibold">ResumeMatch Pro</div>
                    <div className="text-xs opacity-75">AI-Powered Resume Optimization</div>
                  </div>
                </div>
                <p className="text-sm opacity-75 max-w-md leading-relaxed">
                  Helping job seekers optimize their resumes for ATS systems and increase their interview chances with AI-powered analysis and recommendations.
                </p>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-2 text-sm opacity-75">
                  <li><a href="#" className="hover:opacity-100 transition-smooth">How It Works</a></li>
                  <li><a href="#" className="hover:opacity-100 transition-smooth">Features</a></li>
                  <li><a href="#" className="hover:opacity-100 transition-smooth">Success Stories</a></li>
                  <li><a href="#" className="hover:opacity-100 transition-smooth">FAQ</a></li>
                </ul>
              </div>

              {/* Support */}
              <div>
                <h4 className="font-semibold mb-4">Support</h4>
                <ul className="space-y-2 text-sm opacity-75">
                  <li><a href="#" className="hover:opacity-100 transition-smooth">Help Center</a></li>
                  <li><a href="#" className="hover:opacity-100 transition-smooth">Privacy Policy</a></li>
                  <li><a href="#" className="hover:opacity-100 transition-smooth">Terms of Service</a></li>
                  <li><a href="#" className="hover:opacity-100 transition-smooth">Contact Us</a></li>
                </ul>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/10 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
              <div className="text-sm opacity-75">
                © {new Date()?.getFullYear()} ResumeMatch Pro. All rights reserved.
              </div>
              <div className="flex items-center space-x-4 mt-4 md:mt-0">
                <div className="text-xs opacity-75">
                  Trusted by 50,000+ professionals
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default LandingPage;