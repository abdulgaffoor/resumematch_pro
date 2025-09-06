import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const CTASection = () => {
  const navigate = useNavigate();

  const handleStartAnalysis = () => {
    navigate('/resume-analysis-input');
  };

  return (
    <section className="py-20 bg-gradient-to-br from-primary to-primary/90 text-white">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
        {/* Main CTA Content */}
        <div className="mb-12">
          <h2 className="text-3xl lg:text-5xl font-bold mb-6 leading-tight">
            Transform Your Resume Today
          </h2>
          <p className="text-xl lg:text-2xl opacity-90 mb-8 leading-relaxed">
            Don't let your dream job slip away because of an ATS-incompatible resume. Get instant analysis and optimization recommendations in just 30 seconds.
          </p>

          {/* Primary CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button
              variant="secondary"
              size="xl"
              onClick={handleStartAnalysis}
              iconName="Zap"
              iconPosition="left"
              className="w-full sm:w-auto bg-white text-primary hover:bg-gray-50"
            >
              Start Free Analysis Now
            </Button>
            <Button
              variant="outline"
              size="xl"
              onClick={handleStartAnalysis}
              iconName="Upload"
              iconPosition="left"
              className="w-full sm:w-auto border-white text-white hover:bg-white/10"
            >
              Upload Resume
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
            <div className="flex items-center justify-center">
              <Icon name="Shield" size={20} className="mr-2" />
              <span className="text-sm opacity-90">SSL Secured</span>
            </div>
            <div className="flex items-center justify-center">
              <Icon name="Clock" size={20} className="mr-2" />
              <span className="text-sm opacity-90">30-Second Analysis</span>
            </div>
            <div className="flex items-center justify-center">
              <Icon name="CreditCard" size={20} className="mr-2" />
              <span className="text-sm opacity-90">No Credit Card Required</span>
            </div>
          </div>
        </div>

        {/* Success Metrics */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">50,000+</div>
              <div className="text-sm opacity-90">Resumes Analyzed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">73%</div>
              <div className="text-sm opacity-90">Average Improvement</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">94%</div>
              <div className="text-sm opacity-90">Success Rate</div>
            </div>
          </div>
        </div>

        {/* Final Encouragement */}
        <div className="mt-12">
          <p className="text-lg opacity-90 mb-4">
            Join thousands of professionals who've already optimized their resumes
          </p>
          <div className="flex items-center justify-center">
            <Icon name="ArrowRight" size={16} className="mr-2" />
            <span className="text-sm opacity-75">Get started in less than 60 seconds</span>
          </div>
        </div>
      </div>

      {/* Background Decoration */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  );
};

export default CTASection;