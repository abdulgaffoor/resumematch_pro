import React from 'react';
import Icon from '../../../components/AppIcon';

const FormattingIssuesTab = () => {
  const formattingIssues = [
    {
      type: 'critical',
      title: 'ATS-Unfriendly Format',
      description: 'Your resume uses complex formatting that ATS systems cannot parse properly',
      recommendation: 'Use a simple, single-column layout with standard fonts',
      icon: 'AlertTriangle',
      priority: 'high'
    },
    {
      type: 'warning',
      title: 'Missing Contact Information',
      description: 'Phone number is not clearly visible in the header section',
      recommendation: 'Add your phone number prominently in the contact section',
      icon: 'Phone',
      priority: 'medium'
    },
    {
      type: 'info',
      title: 'Inconsistent Date Formatting',
      description: 'Employment dates use different formats throughout the resume',
      recommendation: 'Use consistent MM/YYYY format for all dates',
      icon: 'Calendar',
      priority: 'low'
    },
    {
      type: 'warning',
      title: 'Non-Standard Section Headers',
      description: 'Some section headers may not be recognized by ATS systems',
      recommendation: 'Use standard headers like "Experience", "Education", "Skills"',
      icon: 'Type',
      priority: 'medium'
    },
    {
      type: 'info',
      title: 'File Format Optimization',
      description: 'PDF format is good, but ensure it\'s text-based, not image-based',
      recommendation: 'Save as a text-based PDF to ensure ATS compatibility',
      icon: 'FileText',
      priority: 'low'
    }
  ];

  const getIssueStyle = (type) => {
    switch (type) {
      case 'critical':
        return {
          bg: 'bg-error/5',
          border: 'border-error/20',
          icon: 'var(--color-error)',
          badge: 'bg-error text-white'
        };
      case 'warning':
        return {
          bg: 'bg-warning/5',
          border: 'border-warning/20',
          icon: 'var(--color-warning)',
          badge: 'bg-warning text-white'
        };
      case 'info':
        return {
          bg: 'bg-primary/5',
          border: 'border-primary/20',
          icon: 'var(--color-primary)',
          badge: 'bg-primary text-white'
        };
      default:
        return {
          bg: 'bg-muted',
          border: 'border-border',
          icon: 'var(--color-muted-foreground)',
          badge: 'bg-muted text-text-secondary'
        };
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-error';
      case 'medium': return 'text-warning';
      case 'low': return 'text-success';
      default: return 'text-text-secondary';
    }
  };

  const criticalIssues = formattingIssues?.filter(issue => issue?.type === 'critical')?.length;
  const warningIssues = formattingIssues?.filter(issue => issue?.type === 'warning')?.length;
  const infoIssues = formattingIssues?.filter(issue => issue?.type === 'info')?.length;

  return (
    <div className="space-y-6">
      {/* Issues Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-error/10 rounded-lg flex items-center justify-center">
              <Icon name="AlertTriangle" size={20} color="var(--color-error)" />
            </div>
            <div>
              <div className="text-2xl font-bold text-error">{criticalIssues}</div>
              <div className="text-sm text-text-secondary">Critical Issues</div>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
              <Icon name="AlertCircle" size={20} color="var(--color-warning)" />
            </div>
            <div>
              <div className="text-2xl font-bold text-warning">{warningIssues}</div>
              <div className="text-sm text-text-secondary">Warnings</div>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="Info" size={20} color="var(--color-primary)" />
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">{infoIssues}</div>
              <div className="text-sm text-text-secondary">Suggestions</div>
            </div>
          </div>
        </div>
      </div>
      {/* Issues List */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-text-primary">
          Formatting Analysis
        </h3>
        
        {formattingIssues?.map((issue, index) => {
          const style = getIssueStyle(issue?.type);
          
          return (
            <div
              key={index}
              className={`
                border rounded-lg p-4 transition-smooth
                ${style?.bg} ${style?.border}
              `}
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <Icon
                    name={issue?.icon}
                    size={24}
                    color={style?.icon}
                  />
                </div>
                
                <div className="flex-1 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-text-primary mb-1">
                        {issue?.title}
                      </h4>
                      <p className="text-sm text-text-secondary">
                        {issue?.description}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      <span className={`
                        px-2 py-1 text-xs font-medium rounded-full capitalize
                        ${style?.badge}
                      `}>
                        {issue?.type}
                      </span>
                      <span className={`
                        text-xs font-medium capitalize
                        ${getPriorityColor(issue?.priority)}
                      `}>
                        {issue?.priority}
                      </span>
                    </div>
                  </div>
                  
                  <div className="bg-white/50 rounded-lg p-3 border border-white/20">
                    <div className="flex items-start space-x-2">
                      <Icon name="Lightbulb" size={16} color="var(--color-primary)" className="mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="text-xs font-medium text-primary mb-1">
                          Recommendation:
                        </div>
                        <div className="text-sm text-text-primary">
                          {issue?.recommendation}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* Quick Fix Guide */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">
          Quick Fix Guide
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <h4 className="font-medium text-text-primary flex items-center space-x-2">
              <Icon name="CheckCircle" size={16} color="var(--color-success)" />
              <span>ATS-Friendly Practices</span>
            </h4>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li>• Use standard fonts (Arial, Calibri, Times New Roman)</li>
              <li>• Keep formatting simple and clean</li>
              <li>• Use standard section headers</li>
              <li>• Save as text-based PDF</li>
            </ul>
          </div>
          
          <div className="space-y-3">
            <h4 className="font-medium text-text-primary flex items-center space-x-2">
              <Icon name="XCircle" size={16} color="var(--color-error)" />
              <span>Avoid These Elements</span>
            </h4>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li>• Tables and complex layouts</li>
              <li>• Images and graphics</li>
              <li>• Unusual fonts or colors</li>
              <li>• Headers and footers</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormattingIssuesTab;