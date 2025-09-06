import React from 'react';
import Icon from '../../../components/AppIcon';

const KeywordChips = ({ keywords, filterType, onKeywordClick }) => {
  const filteredKeywords = keywords?.filter(keyword => {
    switch (filterType) {
      case 'matched':
        return keyword?.matched;
      case 'missing':
        return !keyword?.matched;
      case 'all':
      default:
        return true;
    }
  });

  if (filteredKeywords?.length === 0) {
    return (
      <div className="text-center py-8 text-text-secondary">
        <Icon name="Search" size={24} className="mx-auto mb-2 opacity-50" />
        <p className="text-sm">No keywords found for the selected filter</p>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      {filteredKeywords?.map((keyword, index) => (
        <button
          key={`${keyword?.term}-${index}`}
          onClick={() => onKeywordClick(keyword)}
          className={`inline-flex items-center space-x-2 px-3 py-2 rounded-full text-sm font-medium transition-smooth hover:scale-105 ${
            keyword?.matched
              ? 'bg-green-100 text-green-800 border border-green-200 hover:bg-green-200' :'bg-red-100 text-red-800 border border-red-200 hover:bg-red-200'
          }`}
        >
          <Icon 
            name={keyword?.matched ? 'Check' : 'X'} 
            size={14} 
            className={keyword?.matched ? 'text-green-600' : 'text-red-600'}
          />
          <span>{keyword?.term}</span>
          {keyword?.frequency && (
            <span className={`px-1.5 py-0.5 rounded-full text-xs ${
              keyword?.matched 
                ? 'bg-green-200 text-green-700' :'bg-red-200 text-red-700'
            }`}>
              {keyword?.frequency}
            </span>
          )}
        </button>
      ))}
    </div>
  );
};

export default KeywordChips;