import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DownloadConfirmation = ({ 
  isVisible, 
  onClose, 
  downloadType, 
  fileName,
  onTryAnother 
}) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-modal max-w-md w-full">
        {/* Header */}
        <div className="p-6 text-center">
          <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="CheckCircle" size={32} color="white" />
          </div>
          <h3 className="text-xl font-semibold text-text-primary mb-2">
            Download Complete!
          </h3>
          <p className="text-text-secondary">
            Your optimized resume has been successfully downloaded as a {downloadType?.toUpperCase()} file.
          </p>
        </div>

        {/* File Info */}
        <div className="px-6 pb-4">
          <div className="bg-muted rounded-lg p-4 flex items-center space-x-3">
            <Icon 
              name={downloadType === 'pdf' ? 'FileText' : 'File'} 
              size={20} 
              className="text-primary"
            />
            <div className="flex-1 min-w-0">
              <p className="font-medium text-text-primary truncate">
                {fileName}
              </p>
              <p className="text-sm text-text-secondary">
                {downloadType === 'pdf' ? 'PDF Document' : 'Word Document'} • Ready for ATS systems
              </p>
            </div>
          </div>
        </div>

        {/* Security Note */}
        <div className="px-6 pb-6">
          <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
            <Icon name="Shield" size={16} className="text-blue-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-blue-900">
                Secure Download
              </p>
              <p className="text-xs text-blue-700">
                Your resume data is processed locally and not stored on our servers.
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="px-6 pb-6 space-y-3">
          <Button
            variant="default"
            fullWidth
            onClick={onTryAnother}
            iconName="RefreshCw"
            iconPosition="left"
          >
            Analyze Another Job
          </Button>
          
          <Button
            variant="ghost"
            fullWidth
            onClick={onClose}
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DownloadConfirmation;