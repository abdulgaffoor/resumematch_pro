import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const DocumentPanel = ({ 
  title, 
  content, 
  highlightedKeywords = [], 
  searchTerm = '', 
  onSearchChange,
  type = 'resume' // 'resume' or 'job'
}) => {
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);
  const contentRef = useRef(null);

  useEffect(() => {
    setLocalSearchTerm(searchTerm);
  }, [searchTerm]);

  const handleSearchSubmit = (e) => {
    e?.preventDefault();
    onSearchChange(localSearchTerm);
  };

  const highlightText = (text) => {
    if (!text) return '';
    
    let highlightedText = text;
    
    // Highlight keywords
    highlightedKeywords?.forEach(keyword => {
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
    <div className="flex flex-col h-full bg-white border border-border rounded-lg">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-surface">
        <div className="flex items-center space-x-3">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
            type === 'resume' ? 'bg-blue-100 text-blue-600' : 'bg-purple-100 text-purple-600'
          }`}>
            <Icon name={type === 'resume' ? 'FileText' : 'Briefcase'} size={16} />
          </div>
          <h3 className="text-lg font-semibold text-text-primary">{title}</h3>
        </div>
        
        {/* Search */}
        <form onSubmit={handleSearchSubmit} className="flex items-center space-x-2">
          <div className="relative">
            <Icon 
              name="Search" 
              size={16} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" 
            />
            <input
              type="text"
              placeholder="Search in document..."
              value={localSearchTerm}
              onChange={(e) => setLocalSearchTerm(e?.target?.value)}
              className="pl-10 pr-4 py-2 w-64 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          {localSearchTerm && (
            <button
              type="button"
              onClick={() => {
                setLocalSearchTerm('');
                onSearchChange('');
              }}
              className="p-2 text-text-secondary hover:text-text-primary transition-smooth"
            >
              <Icon name="X" size={16} />
            </button>
          )}
        </form>
      </div>
      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        <div 
          ref={contentRef}
          className="prose prose-sm max-w-none text-text-primary leading-relaxed"
          dangerouslySetInnerHTML={{ __html: highlightText(content) }}
        />
      </div>
      {/* Stats Footer */}
      <div className="p-4 border-t border-border bg-surface">
        <div className="flex items-center justify-between text-sm text-text-secondary">
          <span>
            {highlightedKeywords?.filter(k => k?.matched)?.length} of {highlightedKeywords?.length} keywords matched
          </span>
          <span>
            {content ? content?.split(' ')?.length : 0} words
          </span>
        </div>
      </div>
    </div>
  );
};

export default DocumentPanel;