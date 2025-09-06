import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const KeywordFilterPanel = ({ 
  filterType, 
  onFilterChange, 
  matchedCount, 
  missingCount, 
  totalCount,
  onExportReport,
  onExportSummary,
  isExporting = false
}) => {
  const filterOptions = [
    { 
      value: 'all', 
      label: 'All Keywords', 
      count: totalCount,
      icon: 'List',
      color: 'text-text-primary'
    },
    { 
      value: 'matched', 
      label: 'Matched', 
      count: matchedCount,
      icon: 'CheckCircle',
      color: 'text-green-600'
    },
    { 
      value: 'missing', 
      label: 'Missing', 
      count: missingCount,
      icon: 'AlertCircle',
      color: 'text-red-600'
    }
  ];

  return (
    <div className="fixed top-20 right-6 z-40 bg-white border border-border rounded-lg shadow-modal p-4 w-80">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm font-semibold text-text-primary">Keyword Analysis</h4>
        <div className="flex items-center space-x-1 text-xs text-text-secondary">
          <Icon name="Filter" size={14} />
          <span>Filters</span>
        </div>
      </div>
      {/* Filter Options */}
      <div className="space-y-2 mb-4">
        {filterOptions?.map(option => (
          <button
            key={option?.value}
            onClick={() => onFilterChange(option?.value)}
            className={`w-full flex items-center justify-between p-3 rounded-lg border transition-smooth ${
              filterType === option?.value
                ? 'border-primary bg-primary/5 text-primary' :'border-border hover:border-primary/30 hover:bg-surface'
            }`}
          >
            <div className="flex items-center space-x-3">
              <Icon 
                name={option?.icon} 
                size={16} 
                className={filterType === option?.value ? 'text-primary' : option?.color}
              />
              <span className="text-sm font-medium">{option?.label}</span>
            </div>
            <div className={`px-2 py-1 rounded-full text-xs font-medium ${
              filterType === option?.value
                ? 'bg-primary text-white' :'bg-muted text-text-secondary'
            }`}>
              {option?.count}
            </div>
          </button>
        ))}
      </div>
      {/* Match Score */}
      <div className="mb-4 p-3 bg-surface rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-text-primary">Match Score</span>
          <span className="text-lg font-bold text-primary">
            {totalCount > 0 ? Math.round((matchedCount / totalCount) * 100) : 0}%
          </span>
        </div>
        <div className="w-full bg-border rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-500"
            style={{ width: `${totalCount > 0 ? (matchedCount / totalCount) * 100 : 0}%` }}
          />
        </div>
      </div>
      {/* Export Actions */}
      <div className="space-y-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onExportReport}
          loading={isExporting}
          iconName="Download"
          iconPosition="left"
          className="w-full"
        >
          Export Detailed Report
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={onExportSummary}
          iconName="FileText"
          iconPosition="left"
          className="w-full"
        >
          Export Summary
        </Button>
      </div>
    </div>
  );
};

export default KeywordFilterPanel;