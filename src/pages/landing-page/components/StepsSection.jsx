import React from 'react';
import Icon from '../../../components/AppIcon';

const StepsSection = () => {
  const steps = [
    {
      id: 1,
      icon: "Upload",
      title: "Upload Your Resume",
      description: "Simply upload your resume in PDF, DOC, or DOCX format. Our system supports all major file types and processes them instantly.",
      color: "text-blue-600"
    },
    {
      id: 2,
      icon: "FileSearch",
      title: "Paste Job Description",
      description: "Copy and paste the job description you\'re targeting. Our AI will analyze the requirements and match them against your resume.",
      color: "text-purple-600"
    },
    {
      id: 3,
      icon: "BarChart3",
      title: "Get Instant Results",
      description: "Receive a detailed match score, keyword analysis, and actionable recommendations to optimize your resume for ATS systems.",
      color: "text-green-600"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
            How It Works
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Get your resume ATS-ready in just three simple steps. No technical knowledge required.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps?.map((step, index) => (
            <div key={step?.id} className="relative">
              {/* Step Card */}
              <div className="bg-card border border-border rounded-xl p-8 text-center hover:shadow-lg transition-smooth">
                {/* Step Number */}
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 text-primary rounded-full text-lg font-bold mb-6">
                  {step?.id}
                </div>

                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-50 mb-6 ${step?.color}`}>
                  <Icon name={step?.icon} size={32} />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-text-primary mb-4">
                  {step?.title}
                </h3>
                <p className="text-text-secondary leading-relaxed">
                  {step?.description}
                </p>
              </div>

              {/* Connector Arrow (Desktop) */}
              {index < steps?.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-6 transform -translate-y-1/2">
                  <Icon name="ArrowRight" size={24} className="text-border" />
                </div>
              )}

              {/* Connector Arrow (Mobile) */}
              {index < steps?.length - 1 && (
                <div className="md:hidden flex justify-center mt-6">
                  <Icon name="ArrowDown" size={24} className="text-border" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-text-secondary mb-4">
            Ready to optimize your resume?
          </p>
          <div className="inline-flex items-center px-6 py-3 bg-success/10 text-success rounded-lg">
            <Icon name="Timer" size={20} className="mr-2" />
            <span className="font-medium">Average analysis time: 30 seconds</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StepsSection;