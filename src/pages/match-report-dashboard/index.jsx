import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import ProgressIndicator from '../../components/ui/ProgressIndicator';
import ActionButtonCluster from '../../components/ui/ActionButtonCluster';
import MatchScoreCircle from './components/MatchScoreCircle';
import SkillsAnalysisTab from './components/SkillsAnalysisTab';
import JobTitleAlignmentTab from './components/JobTitleAlignmentTab';
import EducationAlignmentTab from './components/EducationAlignmentTab';
import FormattingIssuesTab from './components/FormattingIssuesTab';
import RecruiterTipsSection from './components/RecruiterTipsSection';
import SkillsComparisonChart from './components/SkillsComparisonChart';
import Icon from '../../components/AppIcon';

const MatchReportDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('skills');
  const [isLoading, setIsLoading] = useState(false);
  const [analysisData, setAnalysisData] = useState(null);
  const [stats, setStats] = useState({
    matchScore: 72,
    keywordsMatched: 8,
    totalKeywords: 12,
    atsCompatibility: 'Good',
    formatIssues: 3,
    educationMatch: 75
  });

  useEffect(() => {
    // Load analysis results from sessionStorage
    const loadAnalysisResults = () => {
      try {
        const stored = sessionStorage?.getItem('analysisResults');
        if (stored) {
          const data = JSON.parse(stored);
          setAnalysisData(data);
          
          // Update stats with real data
          const keywordsMatched = data?.keywords?.filter(k => k?.resumeFreq > 0)?.length || 8;
          const totalKeywords = data?.keywords?.length || 12;
          const formatIssuesCount = data?.formatting?.length || 3;
          const educationScore = data?.sections?.education?.score || 75;
          
          setStats({
            matchScore: data?.matchScore || 72,
            keywordsMatched,
            totalKeywords,
            atsCompatibility: data?.atsCompatibility?.score >= 80 ? 'Excellent' : 
                              data?.atsCompatibility?.score >= 60 ? 'Good' : 
                              data?.atsCompatibility?.score >= 40 ? 'Fair' : 'Poor',
            formatIssues: formatIssuesCount,
            educationMatch: educationScore
          });
        }
      } catch (error) {
        console.error('Error loading analysis results:', error);
      }
    };

    loadAnalysisResults();
  }, []);

  const tabs = [
    { id: 'skills', label: 'Skills Analysis', icon: 'Target' },
    { id: 'title', label: 'Job Title', icon: 'User' },
    { id: 'education', label: 'Education', icon: 'GraduationCap' },
    { id: 'formatting', label: 'Formatting', icon: 'FileText' }
  ];

  const handleNavigation = async (path) => {
    setIsLoading(true);
    try {
      navigate(path);
    } finally {
      setTimeout(() => setIsLoading(false), 300);
    }
  };

  const actionButtons = [
    {
      key: 'comparison',
      label: 'Detailed Comparison',
      variant: 'outline',
      iconName: 'GitCompare',
      iconPosition: 'left',
      onClick: () => handleNavigation('/side-by-side-comparison'),
      className: 'hidden sm:flex'
    },
    {
      key: 'preview',
      label: 'Preview Optimized Resume',
      variant: 'default',
      iconName: 'Eye',
      iconPosition: 'left',
      onClick: () => handleNavigation('/optimized-resume-preview')
    },
    {
      key: 'new-analysis',
      label: 'Try Another Job',
      variant: 'secondary',
      iconName: 'Plus',
      iconPosition: 'left',
      onClick: () => handleNavigation('/resume-analysis-input'),
      className: 'hidden md:flex'
    }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'skills':
        return <SkillsAnalysisTab />;
      case 'title':
        return <JobTitleAlignmentTab />;
      case 'education':
        return <EducationAlignmentTab />;
      case 'formatting':
        return <FormattingIssuesTab />;
      default:
        return <SkillsAnalysisTab />;
    }
  };

  // Get job info for display
  const getJobInfo = () => {
    if (analysisData?.jobDescription) {
      // Try to extract job title and company from job description
      const lines = analysisData?.jobDescription?.split('\n')?.filter(line => line?.trim());
      return {
        title: lines?.[0] || 'Position Analysis',
        company: lines?.[1]?.includes('Company') || lines?.[1]?.includes('Corp') ? lines?.[1] : 'Job Analysis'
      };
    }
    return {
      title: 'Resume Analysis Results',
      company: 'AI-Powered Analysis'
    };
  };

  const jobInfo = getJobInfo();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <ProgressIndicator className="mt-16" />
      <main className="pt-6 pb-12">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              <div>
                <h1 className="text-3xl font-bold text-text-primary mb-2">
                  {jobInfo?.title}
                </h1>
                <p className="text-text-secondary">
                  {analysisData?.summary || `Comprehensive ATS compatibility analysis for ${jobInfo?.company} position`}
                </p>
              </div>
              
              {/* Mobile Action Buttons */}
              <div className="flex lg:hidden space-x-2">
                <button
                  onClick={() => handleNavigation('/side-by-side-comparison')}
                  className="flex items-center space-x-2 px-3 py-2 bg-surface border border-border rounded-lg text-sm font-medium text-text-primary hover:bg-muted transition-smooth"
                >
                  <Icon name="GitCompare" size={16} />
                  <span>Compare</span>
                </button>
                <button
                  onClick={() => handleNavigation('/resume-analysis-input')}
                  className="flex items-center space-x-2 px-3 py-2 bg-surface border border-border rounded-lg text-sm font-medium text-text-primary hover:bg-muted transition-smooth"
                >
                  <Icon name="Plus" size={16} />
                  <span>New</span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
            {/* Left Column - Match Score & Chart */}
            <div className="xl:col-span-1 space-y-6">
              {/* Match Score */}
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="text-center">
                  <MatchScoreCircle score={stats?.matchScore} size={180} />
                  <div className="mt-4 pt-4 border-t border-border">
                    <div className="text-sm text-text-secondary mb-2">
                      Analysis completed on
                    </div>
                    <div className="text-sm font-medium text-text-primary">
                      {analysisData?.timestamp ? 
                        new Date(analysisData?.timestamp)?.toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        }) :
                        new Date()?.toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })
                      }
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-semibold text-text-primary mb-4">Quick Stats</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-text-secondary">Keywords Matched</span>
                    <span className="font-medium text-success">{stats?.keywordsMatched}/{stats?.totalKeywords}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-text-secondary">ATS Compatibility</span>
                    <span className={`font-medium ${
                      stats?.atsCompatibility === 'Excellent' ? 'text-success' :
                      stats?.atsCompatibility === 'Good' ? 'text-warning' :
                      stats?.atsCompatibility === 'Fair' ? 'text-warning' : 'text-error'
                    }`}>
                      {stats?.atsCompatibility}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-text-secondary">Format Issues</span>
                    <span className={`font-medium ${stats?.formatIssues > 0 ? 'text-error' : 'text-success'}`}>
                      {stats?.formatIssues > 0 ? `${stats?.formatIssues} Found` : 'None'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-text-secondary">Education Match</span>
                    <span className="font-medium text-success">{stats?.educationMatch}%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Detailed Analysis */}
            <div className="xl:col-span-3 space-y-6">
              {/* Tab Navigation */}
              <div className="bg-card border border-border rounded-lg">
                <div className="border-b border-border">
                  <div className="flex overflow-x-auto">
                    {tabs?.map((tab) => (
                      <button
                        key={tab?.id}
                        onClick={() => setActiveTab(tab?.id)}
                        className={`
                          flex items-center space-x-2 px-6 py-4 text-sm font-medium whitespace-nowrap transition-smooth
                          ${activeTab === tab?.id
                            ? 'text-primary border-b-2 border-primary bg-primary/5' :'text-text-secondary hover:text-text-primary hover:bg-muted/50'
                          }
                        `}
                      >
                        <Icon name={tab?.icon} size={16} />
                        <span>{tab?.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Tab Content */}
                <div className="p-6">
                  {renderTabContent()}
                </div>
              </div>

              {/* Skills Comparison Chart */}
              <SkillsComparisonChart />

              {/* Recruiter Tips */}
              <RecruiterTipsSection />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 pt-8 border-t border-border">
            <ActionButtonCluster
              actions={actionButtons}
              alignment="right"
              spacing="normal"
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default MatchReportDashboard;