import React from 'react';
import Button from './Button';

const ActionButtonCluster = ({ 
  actions = [], 
  alignment = 'right', 
  spacing = 'normal',
  className = '' 
}) => {
  const getAlignmentClass = () => {
    switch (alignment) {
      case 'left':
        return 'justify-start';
      case 'center':
        return 'justify-center';
      case 'between':
        return 'justify-between';
      case 'right':
      default:
        return 'justify-end';
    }
  };

  const getSpacingClass = () => {
    switch (spacing) {
      case 'tight':
        return 'space-x-2';
      case 'loose':
        return 'space-x-6';
      case 'normal':
      default:
        return 'space-x-4';
    }
  };

  if (!actions || actions?.length === 0) {
    return null;
  }

  return (
    <div className={`
      flex items-center ${getAlignmentClass()} ${getSpacingClass()}
      flex-wrap gap-y-2 ${className}
    `}>
      {actions?.map((action, index) => (
        <Button
          key={action?.key || index}
          variant={action?.variant || 'default'}
          size={action?.size || 'default'}
          onClick={action?.onClick}
          disabled={action?.disabled}
          loading={action?.loading}
          iconName={action?.iconName}
          iconPosition={action?.iconPosition}
          className={action?.className}
        >
          {action?.label}
        </Button>
      ))}
    </div>
  );
};

export default ActionButtonCluster;