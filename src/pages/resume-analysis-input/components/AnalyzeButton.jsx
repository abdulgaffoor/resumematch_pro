import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const AnalyzeButton = ({ 
  onAnalyze, 
  isLoading, 
  disabled, 
  hasResumeData, 
  hasJobDescription 
}) => {
  const getButtonText = () => {
    if (isLoading) return 'Analyzing...';
    if (!hasResumeData) return 'Upload Resume First';
    if (!hasJobDescription) return 'Add Job Description';
    return 'Analyze Match';
  };

  const getProgressText = () => {
    if (!hasResumeData && !hasJobDescription) {
      return 'Upload your resume and add job description to start';
    }
    if (!hasResumeData) {
      return 'Upload your resume to continue';
    }
    if (!hasJobDescription) {
      return 'Add job description to continue';
    }
    return 'Ready to analyze your resume match';
  };

  const isReady = hasResumeData && hasJobDescription && !disabled;

  return (
    <div className="flex flex-col items-center space-y-4 py-8">
      {/* Progress Indicators */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <div className={`
            w-3 h-3 rounded-full transition-smooth
            ${hasResumeData ? 'bg-success' : 'bg-border'}
          `} />
          <span className={`
            text-sm font-medium transition-smooth
            ${hasResumeData ? 'text-success' : 'text-text-secondary'}
          `}>
            Resume
          </span>
        </div>
        
        <div className={`
          w-8 h-0.5 transition-smooth
          ${hasResumeData && hasJobDescription ? 'bg-success' : 'bg-border'}
        `} />
        
        <div className="flex items-center space-x-2">
          <div className={`
            w-3 h-3 rounded-full transition-smooth
            ${hasJobDescription ? 'bg-success' : 'bg-border'}
          `} />
          <span className={`
            text-sm font-medium transition-smooth
            ${hasJobDescription ? 'text-success' : 'text-text-secondary'}
          `}>
            Job Description
          </span>
        </div>
      </div>

      {/* Status Text */}
      <p className="text-sm text-text-secondary text-center max-w-md">
        {getProgressText()}
      </p>

      {/* Analyze Button */}
      <Button
        variant={isReady ? 'default' : 'secondary'}
        size="lg"
        onClick={onAnalyze}
        disabled={!isReady || isLoading}
        loading={isLoading}
        iconName={isLoading ? 'Loader2' : 'Zap'}
        iconPosition="left"
        className="px-8 py-3 text-base font-semibold"
      >
        {getButtonText()}
      </Button>

      {/* Loading Progress */}
      {isLoading && (
        <div className="space-y-3 text-center">
          <div className="flex items-center justify-center space-x-2">
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
          <p className="text-xs text-text-secondary">
            Processing your resume and analyzing match compatibility...
          </p>
        </div>
      )}

      {/* Security Notice */}
      {!isLoading && (
        <div className="flex items-center space-x-2 text-xs text-text-secondary bg-muted rounded-lg px-3 py-2">
          <Icon name="Shield" size={14} />
          <span>Your data is processed securely and never stored permanently</span>
        </div>
      )}
    </div>
  );
};

export default AnalyzeButton;