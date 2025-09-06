import React from 'react';
import Icon from '../../../components/AppIcon';

const FeaturesSection = () => {
  const features = [
    {
      id: 1,
      icon: "Zap",
      title: "Instant ATS Analysis",
      description: "Get real-time compatibility scores and detailed feedback on how well your resume performs against Applicant Tracking Systems.",
      benefits: ["Match percentage scoring", "Keyword density analysis", "Format compatibility check"]
    },
    {
      id: 2,
      icon: "Target",
      title: "Smart Keyword Matching",
      description: "Our AI identifies missing keywords and suggests optimal placement to maximize your resume's visibility to recruiters.",
      benefits: ["Missing keyword detection", "Synonym suggestions", "Industry-specific terms"]
    },
    {
      id: 3,
      icon: "GitCompare",
      title: "Side-by-Side Comparison",
      description: "Compare your resume directly against job requirements with visual highlighting of matched and missing elements.",
      benefits: ["Visual text comparison", "Highlighted matches", "Gap analysis"]
    },
    {
      id: 4,
      icon: "FileText",
      title: "Resume Optimization",
      description: "Receive actionable recommendations to improve your resume's structure, content, and formatting for better ATS performance.",
      benefits: ["Formatting suggestions", "Content improvements", "Structure optimization"]
    },
    {
      id: 5,
      icon: "Download",
      title: "Export Options",
      description: "Download your optimized resume in multiple formats including PDF and Word, ready for job applications.",
      benefits: ["PDF export", "Word format", "ATS-friendly layouts"]
    },
    {
      id: 6,
      icon: "BarChart3",
      title: "Detailed Analytics",
      description: "Access comprehensive reports with charts, graphs, and insights to understand your resume's performance metrics.",
      benefits: ["Visual analytics", "Performance metrics", "Improvement tracking"]
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
            Powerful Features for Resume Success
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Everything you need to create ATS-optimized resumes that get noticed by recruiters and hiring managers
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features?.map((feature) => (
            <div key={feature?.id} className="bg-card border border-border rounded-xl p-8 hover:shadow-lg transition-smooth">
              {/* Icon */}
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 text-primary rounded-lg mb-6">
                <Icon name={feature?.icon} size={24} />
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold text-text-primary mb-4">
                {feature?.title}
              </h3>

              {/* Description */}
              <p className="text-text-secondary mb-6 leading-relaxed">
                {feature?.description}
              </p>

              {/* Benefits List */}
              <ul className="space-y-2">
                {feature?.benefits?.map((benefit, index) => (
                  <li key={index} className="flex items-center text-sm text-text-secondary">
                    <Icon name="Check" size={16} className="text-success mr-2 flex-shrink-0" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl p-8 lg:p-12">
            <h3 className="text-2xl lg:text-3xl font-bold text-text-primary mb-4">
              Ready to Optimize Your Resume?
            </h3>
            <p className="text-lg text-text-secondary mb-8 max-w-2xl mx-auto">
              Join thousands of successful job seekers who've improved their interview rates with our AI-powered analysis
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="flex items-center text-text-secondary">
                <Icon name="Clock" size={16} className="mr-2 text-success" />
                <span className="text-sm">Results in 30 seconds</span>
              </div>
              <div className="flex items-center text-text-secondary">
                <Icon name="Shield" size={16} className="mr-2 text-success" />
                <span className="text-sm">100% Free to use</span>
              </div>
              <div className="flex items-center text-text-secondary">
                <Icon name="Users" size={16} className="mr-2 text-success" />
                <span className="text-sm">No signup required</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;