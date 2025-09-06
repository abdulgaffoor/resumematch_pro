import React from 'react';
import Icon from '../../../components/AppIcon';

const JobTitleAlignmentTab = () => {
  const alignmentData = {
    currentTitle: "Frontend Developer",
    targetTitle: "Senior React Developer",
    alignment: 85,
    recommendations: [
      {
        type: 'match',
        text: 'Your current title aligns well with the target position',
        icon: 'CheckCircle',
        color: 'success'
      },
      {
        type: 'suggestion',
        text: 'Consider highlighting "Senior" level experience in your summary',
        icon: 'Lightbulb',
        color: 'warning'
      },
      {
        type: 'improvement',
        text: 'Add React-specific achievements to strengthen alignment',
        icon: 'TrendingUp',
        color: 'primary'
      }
    ],
    titleProgression: [
      { title: 'Junior Frontend Developer', years: '2020-2021', status: 'completed' },
      { title: 'Frontend Developer', years: '2021-2024', status: 'current' },
      { title: 'Senior React Developer', years: 'Target', status: 'target' }
    ]
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-success';
      case 'current': return 'text-primary';
      case 'target': return 'text-warning';
      default: return 'text-text-secondary';
    }
  };

  const getRecommendationStyle = (color) => {
    switch (color) {
      case 'success': return 'bg-success/10 border-success/20 text-success';
      case 'warning': return 'bg-warning/10 border-warning/20 text-warning';
      case 'primary': return 'bg-primary/10 border-primary/20 text-primary';
      default: return 'bg-muted border-border text-text-secondary';
    }
  };

  return (
    <div className="space-y-6">
      {/* Title Comparison */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">
          Title Alignment Analysis
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="text-sm text-text-secondary font-medium">Current Title</div>
            <div className="text-xl font-semibold text-text-primary">
              {alignmentData?.currentTitle}
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="text-sm text-text-secondary font-medium">Target Title</div>
            <div className="text-xl font-semibold text-text-primary">
              {alignmentData?.targetTitle}
            </div>
          </div>
        </div>

        {/* Alignment Score */}
        <div className="mt-6 pt-6 border-t border-border">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-text-secondary">Alignment Score</span>
            <span className="text-lg font-bold text-success">{alignmentData?.alignment}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-success h-2 rounded-full transition-all duration-1000"
              style={{ width: `${alignmentData?.alignment}%` }}
            />
          </div>
        </div>
      </div>
      {/* Career Progression */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">
          Career Progression
        </h3>
        
        <div className="space-y-4">
          {alignmentData?.titleProgression?.map((item, index) => (
            <div key={index} className="flex items-center space-x-4">
              <div className={`
                w-3 h-3 rounded-full
                ${item?.status === 'completed' ? 'bg-success' : ''}
                ${item?.status === 'current' ? 'bg-primary' : ''}
                ${item?.status === 'target' ? 'bg-warning' : ''}
              `} />
              <div className="flex-1">
                <div className={`font-medium ${getStatusColor(item?.status)}`}>
                  {item?.title}
                </div>
                <div className="text-sm text-text-secondary">{item?.years}</div>
              </div>
              {item?.status === 'current' && (
                <div className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                  Current
                </div>
              )}
              {item?.status === 'target' && (
                <div className="px-2 py-1 bg-warning/10 text-warning text-xs font-medium rounded-full">
                  Goal
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      {/* Recommendations */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-text-primary">
          Recommendations
        </h3>
        
        {alignmentData?.recommendations?.map((rec, index) => (
          <div
            key={index}
            className={`
              flex items-start space-x-3 p-4 rounded-lg border
              ${getRecommendationStyle(rec?.color)}
            `}
          >
            <Icon name={rec?.icon} size={20} />
            <p className="text-sm font-medium flex-1">{rec?.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobTitleAlignmentTab;