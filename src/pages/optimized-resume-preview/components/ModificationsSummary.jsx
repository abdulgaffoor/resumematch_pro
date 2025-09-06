import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const ModificationsSummary = ({ modifications }) => {
  const [expandedSections, setExpandedSections] = useState({
    keywords: true,
    formatting: false,
    content: false
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev?.[section]
    }));
  };

  const getSectionIcon = (type) => {
    switch (type) {
      case 'keywords':
        return 'Tag';
      case 'formatting':
        return 'Layout';
      case 'content':
        return 'FileText';
      default:
        return 'Info';
    }
  };

  const getSectionColor = (type) => {
    switch (type) {
      case 'keywords':
        return 'text-blue-600 bg-blue-50';
      case 'formatting':
        return 'text-green-600 bg-green-50';
      case 'content':
        return 'text-purple-600 bg-purple-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="bg-white rounded-lg border border-border shadow-card">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-success rounded-lg flex items-center justify-center">
            <Icon name="Sparkles" size={18} color="white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-text-primary">
              Optimization Summary
            </h3>
            <p className="text-sm text-text-secondary">
              {modifications?.totalChanges} improvements applied
            </p>
          </div>
        </div>
      </div>
      {/* Modifications List */}
      <div className="p-4 space-y-4">
        {Object.entries(modifications?.sections)?.map(([sectionKey, section]) => (
          <div key={sectionKey} className="border border-border rounded-lg overflow-hidden">
            {/* Section Header */}
            <button
              onClick={() => toggleSection(sectionKey)}
              className="w-full p-4 flex items-center justify-between hover:bg-muted transition-smooth"
            >
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getSectionColor(sectionKey)}`}>
                  <Icon name={getSectionIcon(sectionKey)} size={16} />
                </div>
                <div className="text-left">
                  <h4 className="font-medium text-text-primary">{section?.title}</h4>
                  <p className="text-sm text-text-secondary">
                    {section?.changes?.length} changes made
                  </p>
                </div>
              </div>
              <Icon 
                name={expandedSections?.[sectionKey] ? "ChevronUp" : "ChevronDown"} 
                size={20} 
                className="text-text-secondary"
              />
            </button>

            {/* Section Content */}
            {expandedSections?.[sectionKey] && (
              <div className="px-4 pb-4 space-y-3">
                {section?.changes?.map((change, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-muted rounded-lg">
                    <div className="flex-shrink-0 mt-0.5">
                      <Icon 
                        name={change?.type === 'added' ? 'Plus' : change?.type === 'modified' ? 'Edit' : 'AlertTriangle'} 
                        size={16} 
                        className={
                          change?.type === 'added' ? 'text-success' :
                          change?.type === 'modified' ? 'text-warning' : 'text-error'
                        }
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-text-primary mb-1">
                        {change?.title}
                      </p>
                      <p className="text-sm text-text-secondary">
                        {change?.description}
                      </p>
                      {change?.impact && (
                        <div className="mt-2 flex items-center space-x-2">
                          <Icon name="TrendingUp" size={14} className="text-success" />
                          <span className="text-xs text-success font-medium">
                            {change?.impact}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Summary Stats */}
      <div className="p-4 border-t border-border bg-muted">
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-lg font-semibold text-success">
              +{modifications?.stats?.keywordsAdded}
            </div>
            <div className="text-xs text-text-secondary">Keywords Added</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-warning">
              {modifications?.stats?.formattingFixed}
            </div>
            <div className="text-xs text-text-secondary">Format Issues Fixed</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-primary">
              {modifications?.stats?.matchImprovement}%
            </div>
            <div className="text-xs text-text-secondary">Match Improvement</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModificationsSummary;