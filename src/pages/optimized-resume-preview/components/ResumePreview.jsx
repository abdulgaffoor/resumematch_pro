import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ResumePreview = ({ 
  originalResume, 
  optimizedResume, 
  modifications,
  onDownload,
  downloadLoading 
}) => {
  const [viewMode, setViewMode] = useState('optimized'); // 'original' | 'optimized'
  const [zoomLevel, setZoomLevel] = useState(100);

  const currentResume = viewMode === 'optimized' ? optimizedResume : originalResume;

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 10, 150));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 10, 50));
  };

  const handleResetZoom = () => {
    setZoomLevel(100);
  };

  return (
    <div className="bg-white rounded-lg border border-border shadow-card">
      {/* Preview Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-4">
          <h3 className="text-lg font-semibold text-text-primary">Resume Preview</h3>
          
          {/* View Toggle */}
          <div className="flex items-center bg-muted rounded-lg p-1">
            <button
              onClick={() => setViewMode('original')}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-smooth ${
                viewMode === 'original' ?'bg-white text-primary shadow-sm' :'text-text-secondary hover:text-text-primary'
              }`}
            >
              Original
            </button>
            <button
              onClick={() => setViewMode('optimized')}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-smooth ${
                viewMode === 'optimized' ?'bg-white text-primary shadow-sm' :'text-text-secondary hover:text-text-primary'
              }`}
            >
              Optimized
            </button>
          </div>
        </div>

        {/* Zoom Controls */}
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleZoomOut}
            disabled={zoomLevel <= 50}
          >
            <Icon name="ZoomOut" size={16} />
          </Button>
          
          <span className="text-sm font-medium text-text-secondary min-w-[50px] text-center">
            {zoomLevel}%
          </span>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={handleZoomIn}
            disabled={zoomLevel >= 150}
          >
            <Icon name="ZoomIn" size={16} />
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={handleResetZoom}
          >
            <Icon name="RotateCcw" size={16} />
          </Button>
        </div>
      </div>
      {/* Preview Content */}
      <div className="relative">
        <div className="h-[600px] overflow-auto bg-gray-50 p-6">
          <div 
            className="bg-white shadow-lg mx-auto transition-smooth"
            style={{ 
              transform: `scale(${zoomLevel / 100})`,
              transformOrigin: 'top center',
              width: '8.5in',
              minHeight: '11in',
              padding: '1in'
            }}
          >
            {/* Resume Content */}
            <div className="space-y-6">
              {/* Header Section */}
              <div className="text-center border-b border-gray-200 pb-4">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  {currentResume?.personalInfo?.name}
                </h1>
                <div className="flex justify-center items-center space-x-4 text-sm text-gray-600">
                  <span>{currentResume?.personalInfo?.email}</span>
                  <span>•</span>
                  <span>{currentResume?.personalInfo?.phone}</span>
                  <span>•</span>
                  <span>{currentResume?.personalInfo?.location}</span>
                </div>
                {currentResume?.personalInfo?.linkedin && (
                  <div className="mt-2 text-sm text-blue-600">
                    {currentResume?.personalInfo?.linkedin}
                  </div>
                )}
              </div>

              {/* Professional Summary */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-300 pb-1">
                  Professional Summary
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {currentResume?.summary}
                </p>
              </div>

              {/* Skills Section */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-300 pb-1">
                  Technical Skills
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(currentResume?.skills)?.map(([category, skills]) => (
                    <div key={category}>
                      <h3 className="font-medium text-gray-800 mb-2 capitalize">
                        {category}:
                      </h3>
                      <p className="text-gray-700 text-sm">
                        {skills?.join(', ')}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Experience Section */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-300 pb-1">
                  Professional Experience
                </h2>
                <div className="space-y-4">
                  {currentResume?.experience?.map((job, index) => (
                    <div key={index}>
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold text-gray-900">{job?.title}</h3>
                          <p className="text-gray-700 font-medium">{job?.company}</p>
                        </div>
                        <div className="text-right text-sm text-gray-600">
                          <p>{job?.duration}</p>
                          <p>{job?.location}</p>
                        </div>
                      </div>
                      <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm ml-4">
                        {job?.achievements?.map((achievement, achIndex) => (
                          <li key={achIndex}>{achievement}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Education Section */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-300 pb-1">
                  Education
                </h2>
                <div className="space-y-3">
                  {currentResume?.education?.map((edu, index) => (
                    <div key={index} className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-gray-900">{edu?.degree}</h3>
                        <p className="text-gray-700">{edu?.institution}</p>
                        {edu?.gpa && (
                          <p className="text-sm text-gray-600">GPA: {edu?.gpa}</p>
                        )}
                      </div>
                      <div className="text-right text-sm text-gray-600">
                        <p>{edu?.year}</p>
                        <p>{edu?.location}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Certifications */}
              {currentResume?.certifications && currentResume?.certifications?.length > 0 && (
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-300 pb-1">
                    Certifications
                  </h2>
                  <ul className="space-y-2">
                    {currentResume?.certifications?.map((cert, index) => (
                      <li key={index} className="flex justify-between items-center">
                        <span className="text-gray-700">{cert?.name}</span>
                        <span className="text-sm text-gray-600">{cert?.year}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Optimization Indicators */}
        {viewMode === 'optimized' && (
          <div className="absolute top-4 right-4 bg-success text-white px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-2">
            <Icon name="CheckCircle" size={16} />
            <span>Optimized</span>
          </div>
        )}
      </div>
      {/* Download Section */}
      <div className="p-4 border-t border-border bg-muted">
        <div className="flex items-center justify-between">
          <div className="text-sm text-text-secondary">
            Ready to download your optimized resume
          </div>
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onDownload('docx')}
              loading={downloadLoading?.docx}
              iconName="FileText"
              iconPosition="left"
            >
              Download Word
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={() => onDownload('pdf')}
              loading={downloadLoading?.pdf}
              iconName="Download"
              iconPosition="left"
            >
              Download PDF
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;