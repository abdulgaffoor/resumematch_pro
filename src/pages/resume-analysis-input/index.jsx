import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import ProgressIndicator from '../../components/ui/ProgressIndicator';
import ResumeUploadPanel from './components/ResumeUploadPanel';
import JobDescriptionPanel from './components/JobDescriptionPanel';
import AnalyzeButton from './components/AnalyzeButton';
import ValidationMessage from './components/ValidationMessage';
import InputGuide from './components/InputGuide';
import { analyzeResumeCompatibility } from '../../services/resumeAnalysisService';

const ResumeAnalysisInput = () => {
  const navigate = useNavigate();
  
  // Resume state
  const [uploadedFile, setUploadedFile] = useState(null);
  const [resumeText, setResumeText] = useState('');
  const [fileError, setFileError] = useState(null);
  
  // Job description state
  const [jobDescription, setJobDescription] = useState('');
  
  // UI state
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [validationMessage, setValidationMessage] = useState(null);

  const handleFileUpload = (file, error) => {
    setUploadedFile(file);
    setFileError(error);
    if (error) {
      setValidationMessage({ type: 'error', message: error });
    } else if (file) {
      setValidationMessage({ type: 'success', message: `Resume "${file?.name}" uploaded successfully!` });
      // Clear resume text when file is uploaded
      setResumeText('');
    } else {
      setValidationMessage(null);
    }
  };

  const handleTextPaste = (text) => {
    setResumeText(text);
    if (text?.trim()) {
      // Clear uploaded file when text is pasted
      setUploadedFile(null);
      setFileError(null);
      setValidationMessage({ type: 'success', message: 'Resume text added successfully!' });
    } else {
      setValidationMessage(null);
    }
  };

  const handleJobDescriptionChange = (text) => {
    setJobDescription(text);
  };

  const handleAnalyze = async () => {
    // Validation
    if (!hasResumeData()) {
      setValidationMessage({ 
        type: 'error', 
        message: 'Please upload your resume or paste resume text before analyzing.' 
      });
      return;
    }

    if (!jobDescription?.trim()) {
      setValidationMessage({ 
        type: 'error', 
        message: 'Please add the job description before analyzing.' 
      });
      return;
    }

    if (jobDescription?.trim()?.split(/\s+/)?.length < 50) {
      setValidationMessage({ 
        type: 'warning', 
        message: 'Job description seems too short. Please include the complete job posting for better results.' 
      });
      return;
    }

    // Check for API key
    if (!import.meta.env?.VITE_GEMINI_API_KEY || import.meta.env?.VITE_GEMINI_API_KEY === 'your-gemini-api-key-here') {
      setValidationMessage({ 
        type: 'error', 
        message: 'Gemini API key not configured. Please add your VITE_GEMINI_API_KEY to the .env file.' 
      });
      return;
    }

    setIsAnalyzing(true);
    setValidationMessage({ 
      type: 'info', 
      message: 'Analyzing your resume compatibility with Gemini AI... This may take a few moments.' 
    });

    try {
      // Use actual Gemini AI analysis instead of mock data
      const resumeInput = uploadedFile || resumeText;
      const analysisResults = await analyzeResumeCompatibility(resumeInput, jobDescription);
      
      // Store analysis results in sessionStorage for the next page
      sessionStorage.setItem('analysisResults', JSON.stringify({
        ...analysisResults,
        resumeData: uploadedFile ? uploadedFile?.name : 'Pasted Resume Text',
        resumeText: resumeText || `Resume file: ${uploadedFile?.name}`,
        jobDescription: jobDescription
      }));

      setValidationMessage({ 
        type: 'success', 
        message: `Analysis complete! Match score: ${analysisResults?.matchScore}%` 
      });

      // Navigate to results page after a brief delay
      setTimeout(() => {
        navigate('/match-report-dashboard');
      }, 1500);

    } catch (error) {
      console.error('Analysis error:', error);
      setValidationMessage({ 
        type: 'error', 
        message: `Analysis failed: ${error?.message}. Please check your API key and try again.` 
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const hasResumeData = () => {
    return uploadedFile || resumeText?.trim();
  };

  const dismissValidationMessage = () => {
    setValidationMessage(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <ProgressIndicator className="mt-16" />
      <main className="pt-6 pb-12">
        <div className="max-w-7xl mx-auto px-6">
          {/* Page Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-text-primary mb-2">
              AI-Powered Resume Analysis
            </h1>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Upload your resume and paste the job description to get instant ATS compatibility analysis 
              powered by Gemini 2.5 Pro with actionable insights to improve your match score.
            </p>
          </div>

          {/* Validation Message */}
          {validationMessage && (
            <div className="mb-6">
              <ValidationMessage
                type={validationMessage?.type}
                message={validationMessage?.message}
                onDismiss={dismissValidationMessage}
              />
            </div>
          )}

          {/* Input Guide */}
          <div className="mb-8">
            <InputGuide />
          </div>

          {/* Main Input Section */}
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* Resume Upload Panel */}
            <div className="lg:col-span-1">
              <ResumeUploadPanel
                onFileUpload={handleFileUpload}
                onTextPaste={handleTextPaste}
                uploadedFile={uploadedFile}
                resumeText={resumeText}
                isLoading={isAnalyzing}
              />
            </div>

            {/* Job Description Panel */}
            <div className="lg:col-span-1">
              <JobDescriptionPanel
                jobDescription={jobDescription}
                onJobDescriptionChange={handleJobDescriptionChange}
                isLoading={isAnalyzing}
              />
            </div>
          </div>

          {/* Analyze Button Section */}
          <div className="bg-card border border-border rounded-lg">
            <AnalyzeButton
              onAnalyze={handleAnalyze}
              isLoading={isAnalyzing}
              disabled={fileError !== null}
              hasResumeData={hasResumeData()}
              hasJobDescription={jobDescription?.trim()?.length > 0}
            />
          </div>

          {/* Additional Information - Updated with Gemini branding */}
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            <div className="bg-surface border border-border rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-primary font-bold text-sm">AI</span>
              </div>
              <h3 className="text-sm font-semibold text-text-primary mb-2">Gemini 2.5 Pro Powered</h3>
              <p className="text-xs text-text-secondary">
                Advanced AI analysis with industry expertise and ATS optimization
              </p>
            </div>

            <div className="bg-surface border border-border rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-success font-bold text-lg">&lt;60s</span>
              </div>
              <h3 className="text-sm font-semibold text-text-primary mb-2">Analysis Time</h3>
              <p className="text-xs text-text-secondary">
                Get comprehensive results with detailed recommendations
              </p>
            </div>

            <div className="bg-surface border border-border rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-warning/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-warning font-bold text-lg">100%</span>
              </div>
              <h3 className="text-sm font-semibold text-text-primary mb-2">Secure & Private</h3>
              <p className="text-xs text-text-secondary">
                Your data is processed securely and never stored permanently
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ResumeAnalysisInput;