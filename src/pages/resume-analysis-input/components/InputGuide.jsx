import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const InputGuide = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const steps = [
    {
      icon: 'Upload',
      title: 'Upload Your Resume',
      description: 'Upload your resume file (PDF, DOC, DOCX) or paste the text directly',
      tips: [
        'Use your most recent resume version',
        'Ensure all sections are included (experience, skills, education)',
        'PDF format typically provides best parsing results'
      ]
    },
    {
      icon: 'FileText',
      title: 'Add Job Description',
      description: 'Paste the complete job posting you want to apply for',
      tips: [
        'Include the full job description, not just requirements',
        'Copy from the original job posting for accuracy',
        'Include company information if available'
      ]
    },
    {
      icon: 'Zap',
      title: 'Analyze Match',
      description: 'Our AI will analyze compatibility and provide detailed insights',
      tips: [
        'Analysis typically takes 10-30 seconds',
        'Results include match score and improvement suggestions',
        'You can analyze multiple job descriptions with the same resume'
      ]
    }
  ];

  return (
    <div className="bg-surface border border-border rounded-lg overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-muted/50 transition-smooth"
      >
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
            <Icon name="HelpCircle" size={16} color="var(--color-primary)" />
          </div>
          <div className="text-left">
            <h3 className="text-sm font-semibold text-text-primary">How it works</h3>
            <p className="text-xs text-text-secondary">Step-by-step guide to get the best results</p>
          </div>
        </div>
        <Icon 
          name={isExpanded ? 'ChevronUp' : 'ChevronDown'} 
          size={16} 
          color="var(--color-text-secondary)" 
        />
      </button>
      {isExpanded && (
        <div className="px-6 pb-6 space-y-6 animate-in slide-in-from-top-2 duration-300">
          {steps?.map((step, index) => (
            <div key={index} className="flex space-x-4">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-semibold">
                  {index + 1}
                </div>
                {index < steps?.length - 1 && (
                  <div className="w-0.5 h-12 bg-border mt-2" />
                )}
              </div>
              
              <div className="flex-1 space-y-2">
                <div className="flex items-center space-x-2">
                  <Icon name={step?.icon} size={16} color="var(--color-primary)" />
                  <h4 className="text-sm font-semibold text-text-primary">{step?.title}</h4>
                </div>
                <p className="text-sm text-text-secondary">{step?.description}</p>
                
                <ul className="space-y-1">
                  {step?.tips?.map((tip, tipIndex) => (
                    <li key={tipIndex} className="flex items-start space-x-2 text-xs text-text-secondary">
                      <Icon name="Check" size={12} color="var(--color-success)" className="mt-0.5 flex-shrink-0" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InputGuide;