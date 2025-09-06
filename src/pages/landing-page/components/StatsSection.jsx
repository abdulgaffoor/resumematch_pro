import React from 'react';
import Icon from '../../../components/AppIcon';

const StatsSection = () => {
  const stats = [
    {
      id: 1,
      icon: "Users",
      value: "50,000+",
      label: "Job Seekers Helped",
      description: "Professionals who\'ve optimized their resumes"
    },
    {
      id: 2,
      icon: "TrendingUp",
      value: "73%",
      label: "Average Improvement",
      description: "Increase in interview callback rates"
    },
    {
      id: 3,
      icon: "Clock",
      value: "30 sec",
      label: "Analysis Time",
      description: "Get instant results in seconds"
    },
    {
      id: 4,
      icon: "Award",
      value: "94%",
      label: "Success Rate",
      description: "Users who land interviews within 30 days"
    }
  ];

  return (
    <section className="py-20 bg-primary text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Proven Results That Speak for Themselves
          </h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Join the thousands of professionals who've transformed their job search with our AI-powered analysis
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats?.map((stat) => (
            <div key={stat?.id} className="text-center">
              {/* Icon */}
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mb-6">
                <Icon name={stat?.icon} size={32} className="text-white" />
              </div>

              {/* Value */}
              <div className="text-4xl lg:text-5xl font-bold mb-2">
                {stat?.value}
              </div>

              {/* Label */}
              <div className="text-xl font-semibold mb-2 opacity-90">
                {stat?.label}
              </div>

              {/* Description */}
              <p className="text-sm opacity-75 leading-relaxed">
                {stat?.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center px-6 py-3 bg-white/10 rounded-lg backdrop-blur-sm">
            <Icon name="Shield" size={20} className="mr-3" />
            <span className="font-medium">100% Free • No Credit Card Required • SSL Secured</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;