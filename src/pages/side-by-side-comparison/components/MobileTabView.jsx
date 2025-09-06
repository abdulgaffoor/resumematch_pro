import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import KeywordChips from './KeywordChips';

const MobileTabView = ({ 
  resumeContent, 
  jobContent, 
  keywords, 
  filterType, 
  searchTerm,
  onSearchChange,
  onKeywordClick
}) => {
  const [activeTab, setActiveTab] = useState('resume');

  const tabs = [
    { 
      id: 'resume', 
      label: 'Resume', 
      icon: 'FileText',
      content: resumeContent
    },
    { 
      id: 'job', 
      label: 'Job Description', 
      icon: 'Briefcase',
      content: jobContent
    },
    { 
      id: 'keywords', 
      label: 'Keywords', 
      icon: 'Tag',
      content: null
    }
  ];

  const highlightText = (text) => {
    if (!text) return '';
    
    let highlightedText = text;
    
    // Highlight keywords
    keywords?.forEach(keyword => {
      const regex = new RegExp(`\\b(${keyword.term})\\b`, 'gi');
      const className = keyword?.matched ? 'bg-green-100 text-green-800 px-1 rounded' : 'bg-red-100 text-red-800 px-1 rounded';
      highlightedText = highlightedText?.replace(regex, `<span class="${className}">$1</span>`);
    });

    // Highlight search term
    if (searchTerm && searchTerm?.trim()) {
      const searchRegex = new RegExp(`(${searchTerm.trim()})`, 'gi');
      highlightedText = highlightedText?.replace(searchRegex, '<mark class="bg-yellow-200">$1</mark>');
    }

    return highlightedText;
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Tab Navigation */}
      <div className="flex border-b border-border bg-surface">
        {tabs?.map(tab => (
          <button
            key={tab?.id}
            onClick={() => setActiveTab(tab?.id)}
            className={`flex-1 flex items-center justify-center space-x-2 py-4 px-3 text-sm font-medium transition-smooth ${
              activeTab === tab?.id
                ? 'text-primary border-b-2 border-primary bg-white' :'text-text-secondary hover:text-text-primary'
            }`}
          >
            <Icon name={tab?.icon} size={16} />
            <span>{tab?.label}</span>
          </button>
        ))}
      </div>
      {/* Search Bar */}
      {activeTab !== 'keywords' && (
        <div className="p-4 border-b border-border">
          <div className="relative">
            <Icon 
              name="Search" 
              size={16} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" 
            />
            <input
              type="text"
              placeholder={`Search in ${activeTab === 'resume' ? 'resume' : 'job description'}...`}
              value={searchTerm}
              onChange={(e) => onSearchChange(e?.target?.value)}
              className="w-full pl-10 pr-4 py-3 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            {searchTerm && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-text-secondary hover:text-text-primary"
              >
                <Icon name="X" size={16} />
              </button>
            )}
          </div>
        </div>
      )}
      {/* Tab Content */}
      <div className="flex-1 overflow-auto">
        {activeTab === 'keywords' ? (
          <div className="p-4">
            <KeywordChips 
              keywords={keywords}
              filterType={filterType}
              onKeywordClick={onKeywordClick}
            />
          </div>
        ) : (
          <div className="p-4">
            <div 
              className="prose prose-sm max-w-none text-text-primary leading-relaxed"
              dangerouslySetInnerHTML={{ 
                __html: highlightText(activeTab === 'resume' ? resumeContent : jobContent) 
              }}
            />
          </div>
        )}
      </div>
      {/* Stats Footer */}
      <div className="p-4 border-t border-border bg-surface">
        <div className="flex items-center justify-between text-sm text-text-secondary">
          <span>
            {keywords?.filter(k => k?.matched)?.length} of {keywords?.length} keywords matched
          </span>
          <span className="text-primary font-medium">
            {keywords?.length > 0 ? Math.round((keywords?.filter(k => k?.matched)?.length / keywords?.length) * 100) : 0}% Match
          </span>
        </div>
      </div>
    </div>
  );
};

export default MobileTabView;