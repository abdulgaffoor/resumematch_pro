import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import ActionButtonCluster from '../../../components/ui/ActionButtonCluster';

const ActionPanel = ({ 
  onDownload, 
  onTryAnother, 
  onBackToReport,
  downloadLoading,
  matchScore 
}) => {
  const downloadActions = [
    {
      key: 'word',
      label: 'Download Word',
      variant: 'outline',
      iconName: 'FileText',
      iconPosition: 'left',
      onClick: () => onDownload('docx'),
      loading: downloadLoading?.docx
    },
    {
      key: 'pdf',
      label: 'Download PDF',
      variant: 'default',
      iconName: 'Download',
      iconPosition: 'left',
      onClick: () => onDownload('pdf'),
      loading: downloadLoading?.pdf
    }
  ];

  const navigationActions = [
    {
      key: 'back',
      label: 'Back to Report',
      variant: 'ghost',
      iconName: 'ArrowLeft',
      iconPosition: 'left',
      onClick: onBackToReport
    },
    {
      key: 'another',
      label: 'Try Another Job',
      variant: 'secondary',
      iconName: 'RefreshCw',
      iconPosition: 'left',
      onClick: onTryAnother
    }
  ];

  return (
    <div className="bg-white rounded-lg border border-border shadow-card">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-text-primary">
              Ready to Download
            </h3>
            <p className="text-sm text-text-secondary mt-1">
              Your resume has been optimized for better ATS compatibility
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-12 h-12 bg-success rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-sm">
                {matchScore}%
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* Download Section */}
      <div className="p-6 space-y-6">
        {/* Format Selection */}
        <div>
          <h4 className="font-medium text-text-primary mb-3">
            Choose Download Format
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Word Format */}
            <div className="border border-border rounded-lg p-4 hover:border-primary transition-smooth cursor-pointer">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                  <Icon name="FileText" size={20} className="text-blue-600" />
                </div>
                <div className="flex-1">
                  <h5 className="font-medium text-text-primary">Word Document</h5>
                  <p className="text-sm text-text-secondary mt-1">
                    Editable format for further customization
                  </p>
                  <div className="mt-3">
                    <Button
                      variant="outline"
                      size="sm"
                      fullWidth
                      onClick={() => onDownload('docx')}
                      loading={downloadLoading?.docx}
                      iconName="Download"
                      iconPosition="left"
                    >
                      Download .docx
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* PDF Format */}
            <div className="border border-border rounded-lg p-4 hover:border-primary transition-smooth cursor-pointer">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
                  <Icon name="File" size={20} className="text-red-600" />
                </div>
                <div className="flex-1">
                  <h5 className="font-medium text-text-primary">PDF Document</h5>
                  <p className="text-sm text-text-secondary mt-1">
                    Professional format for job applications
                  </p>
                  <div className="mt-3">
                    <Button
                      variant="default"
                      size="sm"
                      fullWidth
                      onClick={() => onDownload('pdf')}
                      loading={downloadLoading?.pdf}
                      iconName="Download"
                      iconPosition="left"
                    >
                      Download .pdf
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Tips */}
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Icon name="Lightbulb" size={20} className="text-blue-600 mt-0.5" />
            <div>
              <h5 className="font-medium text-blue-900 mb-2">Pro Tips</h5>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Use PDF format for online applications</li>
                <li>• Use Word format when uploading to job portals</li>
                <li>• Keep file names professional (FirstName_LastName_Resume.pdf)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* Navigation Actions */}
      <div className="p-6 border-t border-border">
        <ActionButtonCluster
          actions={navigationActions}
          alignment="between"
          spacing="normal"
        />
      </div>
    </div>
  );
};

export default ActionPanel;