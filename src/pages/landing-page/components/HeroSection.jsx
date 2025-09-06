import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const HeroSection = () => {
  const navigate = useNavigate();

  const handleStartAnalysis = () => {
    navigate('/resume-analysis-input');
  };

  return (
    <section className="relative bg-gradient-to-br from-blue-50 to-indigo-100 py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8">
            <Icon name="Zap" size={16} className="mr-2" />
            Trusted by 50,000+ job seekers
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl lg:text-6xl font-bold text-text-primary mb-6 leading-tight">
            Beat the ATS System with
            <span className="text-primary block">AI-Powered Resume Analysis</span>
          </h1>

          {/* Subheading */}
          <p className="text-xl lg:text-2xl text-text-secondary mb-12 max-w-3xl mx-auto leading-relaxed">
            Get instant feedback on your resume's ATS compatibility. Increase your interview chances by up to 73% with our advanced matching algorithm.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button
              variant="default"
              size="lg"
              onClick={handleStartAnalysis}
              iconName="Upload"
              iconPosition="left"
              className="w-full sm:w-auto"
            >
              Start Free Analysis
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={handleStartAnalysis}
              iconName="FileText"
              iconPosition="left"
              className="w-full sm:w-auto"
            >
              Upload Resume
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-text-secondary">
            <div className="flex items-center">
              <Icon name="Shield" size={20} className="mr-2 text-success" />
              <span className="text-sm">SSL Secured</span>
            </div>
            <div className="flex items-center">
              <Icon name="Clock" size={20} className="mr-2 text-success" />
              <span className="text-sm">Results in 30 seconds</span>
            </div>
            <div className="flex items-center">
              <Icon name="Users" size={20} className="mr-2 text-success" />
              <span className="text-sm">No signup required</span>
            </div>
          </div>
        </div>
      </div>

      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -z-10"></div>
    </section>
  );
};

export default HeroSection;