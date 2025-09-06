import React from 'react';
import Icon from '../../../components/AppIcon';

const ValidationMessage = ({ type, message, onDismiss }) => {
  if (!message) return null;

  const getIconAndStyles = () => {
    switch (type) {
      case 'error':
        return {
          icon: 'AlertCircle',
          bgColor: 'bg-error/10',
          borderColor: 'border-error/20',
          textColor: 'text-error',
          iconColor: 'var(--color-error)'
        };
      case 'warning':
        return {
          icon: 'AlertTriangle',
          bgColor: 'bg-warning/10',
          borderColor: 'border-warning/20',
          textColor: 'text-warning',
          iconColor: 'var(--color-warning)'
        };
      case 'success':
        return {
          icon: 'CheckCircle',
          bgColor: 'bg-success/10',
          borderColor: 'border-success/20',
          textColor: 'text-success',
          iconColor: 'var(--color-success)'
        };
      case 'info':
      default:
        return {
          icon: 'Info',
          bgColor: 'bg-primary/10',
          borderColor: 'border-primary/20',
          textColor: 'text-primary',
          iconColor: 'var(--color-primary)'
        };
    }
  };

  const styles = getIconAndStyles();

  return (
    <div className={`
      ${styles?.bgColor} ${styles?.borderColor} border rounded-lg p-4 
      transition-smooth animate-in slide-in-from-top-2 duration-300
    `}>
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          <Icon 
            name={styles?.icon} 
            size={18} 
            color={styles?.iconColor} 
          />
        </div>
        <div className="flex-1">
          <p className={`text-sm font-medium ${styles?.textColor}`}>
            {message}
          </p>
        </div>
        {onDismiss && (
          <button
            onClick={onDismiss}
            className={`
              flex-shrink-0 ${styles?.textColor} hover:opacity-70 
              transition-smooth p-1 -m-1
            `}
          >
            <Icon name="X" size={14} />
          </button>
        )}
      </div>
    </div>
  );
};

export default ValidationMessage;