import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TestimonialsSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Chen",
      role: "Software Engineer",
      company: "Google",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      content: `ResumeMatch Pro helped me identify exactly what keywords I was missing. After optimizing my resume, I got 3x more interview calls. The ATS analysis was spot-on and the recommendations were actionable.`,
      rating: 5,
      matchImprovement: "From 45% to 89% match rate"
    },
    {
      id: 2,
      name: "Michael Rodriguez",
      role: "Marketing Manager",
      company: "Microsoft",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      content: `I was struggling to get past the initial screening. This tool showed me exactly how to format my resume for ATS systems. Within two weeks, I landed my dream job at Microsoft!`,
      rating: 5,
      matchImprovement: "From 52% to 94% match rate"
    },
    {
      id: 3,
      name: "Emily Johnson",
      role: "Data Scientist",
      company: "Amazon",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      content: `The side-by-side comparison feature is incredible. I could see exactly what skills and keywords I needed to add. My resume went from being ignored to getting multiple offers.`,
      rating: 5,
      matchImprovement: "From 38% to 87% match rate"
    }
  ];

  const companyLogos = [
    { name: "Google", logo: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=120&h=60&fit=crop" },
    { name: "Microsoft", logo: "https://images.unsplash.com/photo-1633409361618-c73427e4e206?w=120&h=60&fit=crop" },
    { name: "Amazon", logo: "https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?w=120&h=60&fit=crop" },
    { name: "Apple", logo: "https://images.unsplash.com/photo-1621768216002-5ac171876625?w=120&h=60&fit=crop" },
    { name: "Meta", logo: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=120&h=60&fit=crop" },
    { name: "Netflix", logo: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=120&h=60&fit=crop" }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials?.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials?.length) % testimonials?.length);
  };

  const currentData = testimonials?.[currentTestimonial];

  return (
    <section className="py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
            Success Stories
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Join thousands of job seekers who've landed their dream jobs with optimized resumes
          </p>
        </div>

        {/* Main Testimonial */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-card border border-border rounded-2xl p-8 lg:p-12 shadow-card">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              {/* Avatar and Info */}
              <div className="flex-shrink-0 text-center lg:text-left">
                <div className="w-24 h-24 mx-auto lg:mx-0 mb-4 rounded-full overflow-hidden">
                  <Image 
                    src={currentData?.avatar} 
                    alt={currentData?.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="text-lg font-semibold text-text-primary">
                  {currentData?.name}
                </h4>
                <p className="text-text-secondary">
                  {currentData?.role}
                </p>
                <p className="text-primary font-medium">
                  {currentData?.company}
                </p>
                
                {/* Rating */}
                <div className="flex justify-center lg:justify-start mt-2">
                  {[...Array(currentData?.rating)]?.map((_, i) => (
                    <Icon key={i} name="Star" size={16} className="text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1">
                <blockquote className="text-lg lg:text-xl text-text-primary leading-relaxed mb-6">
                  "{currentData?.content}"
                </blockquote>
                
                {/* Improvement Badge */}
                <div className="inline-flex items-center px-4 py-2 bg-success/10 text-success rounded-lg">
                  <Icon name="TrendingUp" size={16} className="mr-2" />
                  <span className="font-medium">{currentData?.matchImprovement}</span>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-8 border-t border-border">
              <button
                onClick={prevTestimonial}
                className="flex items-center px-4 py-2 text-text-secondary hover:text-primary transition-smooth"
              >
                <Icon name="ChevronLeft" size={20} className="mr-1" />
                Previous
              </button>

              {/* Dots */}
              <div className="flex space-x-2">
                {testimonials?.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-2 h-2 rounded-full transition-smooth ${
                      index === currentTestimonial ? 'bg-primary' : 'bg-border'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={nextTestimonial}
                className="flex items-center px-4 py-2 text-text-secondary hover:text-primary transition-smooth"
              >
                Next
                <Icon name="ChevronRight" size={20} className="ml-1" />
              </button>
            </div>
          </div>
        </div>

        {/* Company Logos */}
        <div className="text-center">
          <p className="text-text-secondary mb-8">
            Our users have been hired by top companies
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center opacity-60">
            {companyLogos?.map((company, index) => (
              <div key={index} className="flex items-center justify-center h-12">
                <Image 
                  src={company?.logo} 
                  alt={`${company?.name} logo`}
                  className="max-h-8 w-auto object-contain grayscale hover:grayscale-0 transition-smooth"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;