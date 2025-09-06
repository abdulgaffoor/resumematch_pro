import React from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const ProgressIndicator = ({ className = '' }) => {
  const location = useLocation();

  const steps = [
    { 
      path: '/resume-analysis-input', 
      label: 'Upload Resume', 
      icon: 'Upload',
      step: 1 
    },
    { 
      path: '/match-report-dashboard', 
      label: 'Analysis Results', 
      icon: 'BarChart3',
      step: 2 
    },
    { 
      path: '/side-by-side-comparison', 
      label: 'Comparison', 
      icon: 'GitCompare',
      step: 3 
    },
    { 
      path: '/optimized-resume-preview', 
      label: 'Preview', 
      icon: 'Eye',
      step: 4 
    }
  ];

  const getCurrentStep = () => {
    const currentPath = location?.pathname;
    const currentStepData = steps?.find(step => step?.path === currentPath);
    return currentStepData ? currentStepData?.step : 0;
  };

  const currentStep = getCurrentStep();

  if (location?.pathname === '/landing-page') {
    return null;
  }

  return (
    <div className={`bg-surface border-b border-border ${className}`}>
      <div className="max-w-4xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {steps?.map((step, index) => {
            const isActive = step?.step === currentStep;
            const isCompleted = step?.step < currentStep;
            const isUpcoming = step?.step > currentStep;

            return (
              <React.Fragment key={step?.path}>
                <div className="flex items-center space-x-3">
                  <div className={`
                    w-8 h-8 rounded-full flex items-center justify-center transition-smooth
                    ${isActive ? 'bg-primary text-white' : ''}
                    ${isCompleted ? 'bg-success text-white' : ''}
                    ${isUpcoming ? 'bg-muted text-text-secondary' : ''}
                  `}>
                    {isCompleted ? (
                      <Icon name="Check" size={16} />
                    ) : (
                      <Icon name={step?.icon} size={16} />
                    )}
                  </div>
                  <div className="hidden sm:block">
                    <div className={`
                      text-sm font-medium transition-smooth
                      ${isActive ? 'text-primary' : ''}
                      ${isCompleted ? 'text-success' : ''}
                      ${isUpcoming ? 'text-text-secondary' : ''}
                    `}>
                      {step?.label}
                    </div>
                    <div className="text-xs text-text-secondary">
                      Step {step?.step}
                    </div>
                  </div>
                </div>
                {index < steps?.length - 1 && (
                  <div className={`
                    flex-1 h-0.5 mx-4 transition-smooth
                    ${step?.step < currentStep ? 'bg-success' : 'bg-border'}
                  `} />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProgressIndicator;