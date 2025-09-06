import React from 'react';
import Icon from '../../../components/AppIcon';

const JobDescriptionPanel = ({ jobDescription, onJobDescriptionChange, isLoading }) => {
  const handleTextChange = (e) => {
    onJobDescriptionChange(e?.target?.value);
  };

  const clearText = () => {
    onJobDescriptionChange('');
  };

  const wordCount = jobDescription?.trim() ? jobDescription?.trim()?.split(/\s+/)?.length : 0;
  const charCount = jobDescription?.length;

  return (
    <div className="bg-card border border-border rounded-lg p-6 h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text-primary">Job Description</h3>
        {jobDescription && (
          <button
            onClick={clearText}
            className="text-sm text-text-secondary hover:text-text-primary transition-smooth flex items-center space-x-1"
            disabled={isLoading}
          >
            <Icon name="X" size={14} />
            <span>Clear</span>
          </button>
        )}
      </div>

      <div className="space-y-4 h-full flex flex-col">
        <div className="flex-1 flex flex-col">
          <label className="text-sm font-medium text-text-primary mb-2">
            Target Job Description
          </label>
          <textarea
            value={jobDescription}
            onChange={handleTextChange}
            placeholder="Paste the complete job description here including requirements, responsibilities, and qualifications..."
            className="flex-1 min-h-[300px] w-full px-3 py-2 text-sm border border-border rounded-md bg-background text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
            disabled={isLoading}
          />
          
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center space-x-4 text-xs text-text-secondary">
              <span>{wordCount} words</span>
              <span>{charCount} characters</span>
            </div>
            <div className="flex items-center space-x-2 text-xs text-text-secondary">
              <Icon name="Shield" size={14} />
              <span>Secure processing</span>
            </div>
          </div>
        </div>

        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <div className="w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <Icon name="Lightbulb" size={12} color="var(--color-primary)" />
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-text-primary">Pro Tip</h4>
              <p className="text-xs text-text-secondary leading-relaxed">
                Include the complete job posting for best results. The more detailed the job description, 
                the more accurate your match analysis will be.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDescriptionPanel;