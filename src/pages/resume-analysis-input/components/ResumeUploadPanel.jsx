import React, { useState, useRef } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ResumeUploadPanel = ({ onFileUpload, onTextPaste, uploadedFile, resumeText, isLoading }) => {
  const [dragActive, setDragActive] = useState(false);
  const [inputMode, setInputMode] = useState('upload'); // 'upload' or 'paste'
  const fileInputRef = useRef(null);

  const supportedFormats = ['pdf', 'doc', 'docx'];
  const maxFileSize = 10 * 1024 * 1024; // 10MB

  const handleDrag = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (e?.type === 'dragenter' || e?.type === 'dragover') {
      setDragActive(true);
    } else if (e?.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setDragActive(false);
    
    if (e?.dataTransfer?.files && e?.dataTransfer?.files?.[0]) {
      handleFileValidation(e?.dataTransfer?.files?.[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e?.target?.files && e?.target?.files?.[0]) {
      handleFileValidation(e?.target?.files?.[0]);
    }
  };

  const handleFileValidation = (file) => {
    const fileExtension = file?.name?.split('.')?.pop()?.toLowerCase();
    
    if (!supportedFormats?.includes(fileExtension)) {
      onFileUpload(null, `Unsupported file format. Please upload ${supportedFormats?.join(', ')?.toUpperCase()} files only.`);
      return;
    }

    if (file?.size > maxFileSize) {
      onFileUpload(null, 'File size too large. Please upload files smaller than 10MB.');
      return;
    }

    onFileUpload(file, null);
  };

  const handleTextChange = (e) => {
    onTextPaste(e?.target?.value);
  };

  const triggerFileInput = () => {
    fileInputRef?.current?.click();
  };

  const clearFile = () => {
    onFileUpload(null, null);
    if (fileInputRef?.current) {
      fileInputRef.current.value = '';
    }
  };

  const clearText = () => {
    onTextPaste('');
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text-primary">Your Resume</h3>
        <div className="flex bg-muted rounded-lg p-1">
          <button
            onClick={() => setInputMode('upload')}
            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-smooth ${
              inputMode === 'upload' ?'bg-background text-text-primary shadow-sm' :'text-text-secondary hover:text-text-primary'
            }`}
          >
            Upload File
          </button>
          <button
            onClick={() => setInputMode('paste')}
            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-smooth ${
              inputMode === 'paste' ?'bg-background text-text-primary shadow-sm' :'text-text-secondary hover:text-text-primary'
            }`}
          >
            Paste Text
          </button>
        </div>
      </div>
      {inputMode === 'upload' ? (
        <div className="space-y-4">
          <div
            className={`
              relative border-2 border-dashed rounded-lg p-8 text-center transition-smooth cursor-pointer
              ${dragActive 
                ? 'border-primary bg-primary/5' 
                : uploadedFile 
                  ? 'border-success bg-success/5' :'border-border hover:border-primary hover:bg-primary/5'
              }
            `}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={triggerFileInput}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              className="hidden"
              disabled={isLoading}
            />

            {uploadedFile ? (
              <div className="space-y-3">
                <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mx-auto">
                  <Icon name="FileText" size={24} color="var(--color-success)" />
                </div>
                <div>
                  <p className="text-sm font-medium text-text-primary">{uploadedFile?.name}</p>
                  <p className="text-xs text-text-secondary">
                    {(uploadedFile?.size / 1024 / 1024)?.toFixed(2)} MB
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e?.stopPropagation();
                    clearFile();
                  }}
                  iconName="X"
                  iconPosition="left"
                >
                  Remove
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto">
                  <Icon name="Upload" size={24} color="var(--color-text-secondary)" />
                </div>
                <div>
                  <p className="text-sm font-medium text-text-primary">
                    Drop your resume here or click to browse
                  </p>
                  <p className="text-xs text-text-secondary mt-1">
                    Supports PDF, DOC, DOCX (max 10MB)
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-2 text-xs text-text-secondary">
            <Icon name="Shield" size={14} />
            <span>Your resume is processed securely and never stored permanently</span>
          </div>
        </div>
      ) : (
        <div className="space-y-4 h-full flex flex-col">
          <div className="flex-1 flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-text-primary">
                Paste Resume Text
              </label>
              {resumeText && (
                <button
                  onClick={clearText}
                  className="text-xs text-text-secondary hover:text-text-primary transition-smooth"
                >
                  Clear
                </button>
              )}
            </div>
            <textarea
              value={resumeText}
              onChange={handleTextChange}
              placeholder="Paste your resume content here..."
              className="flex-1 min-h-[300px] w-full px-3 py-2 text-sm border border-border rounded-md bg-background text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
              disabled={isLoading}
            />
            <div className="flex items-center justify-between mt-2">
              <div className="text-xs text-text-secondary">
                {resumeText?.length} characters
              </div>
              <div className="flex items-center space-x-2 text-xs text-text-secondary">
                <Icon name="Shield" size={14} />
                <span>Secure processing</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeUploadPanel;