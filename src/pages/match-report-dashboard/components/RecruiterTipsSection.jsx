import React from 'react';
import Icon from '../../../components/AppIcon';

const RecruiterTipsSection = () => {
  const recruiterTips = [
    {
      category: 'Keywords',
      tip: 'Include exact keywords from the job description in your resume, especially in the skills and experience sections.',
      impact: 'high',
      icon: 'Key'
    },
    {
      category: 'Quantification',
      tip: 'Add specific numbers and metrics to your achievements (e.g., "Increased user engagement by 35%").',
      impact: 'high',
      icon: 'TrendingUp'
    },
    {
      category: 'Job Title',
      tip: 'Consider adjusting your current job title to better match the target position if it accurately reflects your role.',
      impact: 'medium',
      icon: 'User'
    },
    {
      category: 'Skills Section',
      tip: 'Create a dedicated skills section with both hard and soft skills mentioned in the job posting.',
      impact: 'high',
      icon: 'Star'
    },
    {
      category: 'Experience Format',
      tip: 'Use action verbs to start each bullet point and focus on achievements rather than just responsibilities.',
      impact: 'medium',
      icon: 'Edit'
    },
    {
      category: 'Length',
      tip: 'Keep your resume to 1-2 pages maximum. Recruiters spend only 6-10 seconds on initial screening.',
      impact: 'medium',
      icon: 'Clock'
    }
  ];

  const getImpactStyle = (impact) => {
    switch (impact) {
      case 'high':
        return {
          bg: 'bg-error/10',
          text: 'text-error',
          badge: 'bg-error text-white'
        };
      case 'medium':
        return {
          bg: 'bg-warning/10',
          text: 'text-warning',
          badge: 'bg-warning text-white'
        };
      case 'low':
        return {
          bg: 'bg-success/10',
          text: 'text-success',
          badge: 'bg-success text-white'
        };
      default:
        return {
          bg: 'bg-muted',
          text: 'text-text-secondary',
          badge: 'bg-muted text-text-secondary'
        };
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon name="Lightbulb" size={24} color="var(--color-primary)" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-text-primary">
            Recruiter Tips
          </h2>
          <p className="text-sm text-text-secondary">
            Expert advice to improve your resume's performance
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {recruiterTips?.map((tip, index) => {
          const style = getImpactStyle(tip?.impact);
          
          return (
            <div
              key={index}
              className="border border-border rounded-lg p-4 hover:shadow-card transition-smooth"
            >
              <div className="flex items-start space-x-3">
                <div className={`
                  w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0
                  ${style?.bg}
                `}>
                  <Icon name={tip?.icon} size={16} color={style?.text?.replace('text-', 'var(--color-')} />
                </div>
                
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-text-primary">
                      {tip?.category}
                    </h4>
                    <span className={`
                      px-2 py-1 text-xs font-medium rounded-full capitalize
                      ${style?.badge}
                    `}>
                      {tip?.impact} impact
                    </span>
                  </div>
                  
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {tip?.tip}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* Additional Resources */}
      <div className="mt-6 pt-6 border-t border-border">
        <h3 className="font-medium text-text-primary mb-3">
          Additional Resources
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <a
            href="#"
            className="flex items-center space-x-2 p-3 bg-primary/5 border border-primary/20 rounded-lg hover:bg-primary/10 transition-smooth"
          >
            <Icon name="BookOpen" size={16} color="var(--color-primary)" />
            <span className="text-sm font-medium text-primary">Resume Templates</span>
          </a>
          
          <a
            href="#"
            className="flex items-center space-x-2 p-3 bg-success/5 border border-success/20 rounded-lg hover:bg-success/10 transition-smooth"
          >
            <Icon name="Video" size={16} color="var(--color-success)" />
            <span className="text-sm font-medium text-success">Video Tutorials</span>
          </a>
          
          <a
            href="#"
            className="flex items-center space-x-2 p-3 bg-warning/5 border border-warning/20 rounded-lg hover:bg-warning/10 transition-smooth"
          >
            <Icon name="MessageCircle" size={16} color="var(--color-warning)" />
            <span className="text-sm font-medium text-warning">Expert Consultation</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default RecruiterTipsSection;