import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import ProgressIndicator from '../../components/ui/ProgressIndicator';
import ComparisonHeader from './components/ComparisonHeader';
import DocumentPanel from './components/DocumentPanel';
import KeywordFilterPanel from './components/KeywordFilterPanel';
import MobileTabView from './components/MobileTabView';

const SideBySideComparison = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [filterType, setFilterType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isExporting, setIsExporting] = useState(false);

  // Mock data for demonstration
  const mockData = {
    resumeContent: `John Smith\nSenior Software Engineer\n\nPROFESSIONAL SUMMARY\nExperienced software engineer with 8+ years of expertise in full-stack development, specializing in React, Node.js, and cloud technologies. Proven track record of leading cross-functional teams and delivering scalable web applications that serve millions of users.\n\nTECHNICAL SKILLS\n• Programming Languages: JavaScript, TypeScript, Python, Java\n• Frontend: React, Vue.js, HTML5, CSS3, Tailwind CSS\n• Backend: Node.js, Express.js, Django, Spring Boot\n• Databases: PostgreSQL, MongoDB, Redis\n• Cloud: AWS, Docker, Kubernetes\n• Tools: Git, Jenkins, JIRA, Figma\n\nPROFESSIONAL EXPERIENCE\n\nSenior Software Engineer | TechCorp Inc. | 2020 - Present\n• Led development of customer-facing web applications using React and Node.js\n• Implemented microservices architecture reducing system latency by 40%\n• Mentored junior developers and conducted code reviews\n• Collaborated with product managers and designers on feature specifications\n\nSoftware Engineer | StartupXYZ | 2018 - 2020\n• Developed responsive web applications using Vue.js and Django\n• Integrated third-party APIs and payment gateways\n• Optimized database queries improving application performance by 25%\n• Participated in agile development processes and sprint planning\n\nEDUCATION\nBachelor of Science in Computer Science\nUniversity of Technology | 2014 - 2018\n\nCERTIFICATIONS\n• AWS Certified Solutions Architect\n• Certified Kubernetes Administrator`,

    jobDescription: `Senior Full Stack Developer - Remote\nTechInnovate Solutions\n\nJOB DESCRIPTION\nWe are seeking a highly skilled Senior Full Stack Developer to join our dynamic engineering team. The ideal candidate will have extensive experience in modern web technologies and a passion for building scalable, high-performance applications.\n\nKEY RESPONSIBILITIES\n• Design and develop full-stack web applications using React and Node.js\n• Build and maintain RESTful APIs and microservices\n• Collaborate with cross-functional teams including product, design, and QA\n• Implement automated testing and CI/CD pipelines\n• Optimize application performance and ensure scalability\n• Mentor junior developers and participate in code reviews\n• Stay current with emerging technologies and industry best practices\n\nREQUIRED QUALIFICATIONS\n• 5+ years of experience in full-stack development\n• Expert-level proficiency in JavaScript and TypeScript\n• Strong experience with React.js and modern frontend frameworks\n• Proficiency in Node.js and Express.js for backend development\n• Experience with relational databases (PostgreSQL, MySQL)\n• Knowledge of cloud platforms (AWS, Azure, or GCP)\n• Experience with containerization (Docker) and orchestration (Kubernetes)\n• Familiarity with version control systems (Git)\n• Strong problem-solving skills and attention to detail\n• Excellent communication and teamwork abilities\n\nPREFERRED QUALIFICATIONS\n• Experience with GraphQL and Apollo\n• Knowledge of NoSQL databases (MongoDB, Redis)\n• Experience with automated testing frameworks (Jest, Cypress)\n• Familiarity with CI/CD tools (Jenkins, GitHub Actions)\n• Experience with monitoring and logging tools\n• Bachelor's degree in Computer Science or related field\n\nWHAT WE OFFER\n• Competitive salary and equity package\n• Comprehensive health, dental, and vision insurance\n• Flexible work arrangements and remote-first culture\n• Professional development opportunities\n• Modern tech stack and cutting-edge projects`,

    keywords: [
      { term: 'React', matched: true, frequency: 3 },
      { term: 'Node.js', matched: true, frequency: 2 },
      { term: 'JavaScript', matched: true, frequency: 2 },
      { term: 'TypeScript', matched: true, frequency: 1 },
      { term: 'Express.js', matched: true, frequency: 1 },
      { term: 'PostgreSQL', matched: true, frequency: 1 },
      { term: 'AWS', matched: true, frequency: 1 },
      { term: 'Docker', matched: true, frequency: 1 },
      { term: 'Kubernetes', matched: true, frequency: 1 },
      { term: 'Git', matched: true, frequency: 1 },
      { term: 'GraphQL', matched: false, frequency: 0 },
      { term: 'Apollo', matched: false, frequency: 0 },
      { term: 'MySQL', matched: false, frequency: 0 },
      { term: 'Azure', matched: false, frequency: 0 },
      { term: 'GCP', matched: false, frequency: 0 },
      { term: 'Jest', matched: false, frequency: 0 },
      { term: 'Cypress', matched: false, frequency: 0 },
      { term: 'GitHub Actions', matched: false, frequency: 0 }
    ]
  };

  const matchedCount = mockData?.keywords?.filter(k => k?.matched)?.length;
  const missingCount = mockData?.keywords?.filter(k => !k?.matched)?.length;
  const totalCount = mockData?.keywords?.length;
  const matchScore = Math.round((matchedCount / totalCount) * 100);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleBackToDashboard = () => {
    navigate('/match-report-dashboard');
  };

  const handleProceedToOptimization = () => {
    navigate('/optimized-resume-preview');
  };

  const handleExportReport = async () => {
    setIsExporting(true);
    try {
      // Simulate export process
      await new Promise(resolve => setTimeout(resolve, 2000));
      // In real implementation, this would generate and download a detailed report
      console.log('Exporting detailed report...');
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportSummary = async () => {
    // Simulate summary export
    console.log('Exporting summary...');
  };

  const handleKeywordClick = (keyword) => {
    setSearchTerm(keyword?.term);
  };

  const filteredKeywords = mockData?.keywords?.filter(keyword => {
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

  return (
    <>
      <Helmet>
        <title>Side-by-Side Comparison - ResumeMatch Pro</title>
        <meta name="description" content="Compare your resume against job requirements with detailed keyword analysis and highlighting" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        <ProgressIndicator className="mt-16" />
        
        <ComparisonHeader
          matchScore={matchScore}
          onBackToDashboard={handleBackToDashboard}
          onProceedToOptimization={handleProceedToOptimization}
        />

        <main className="relative">
          {/* Desktop View */}
          {!isMobile ? (
            <div className="flex h-[calc(100vh-200px)]">
              {/* Left Panel - Resume */}
              <div className="flex-1 p-6">
                <DocumentPanel
                  title="Your Resume"
                  content={mockData?.resumeContent}
                  highlightedKeywords={filteredKeywords}
                  searchTerm={searchTerm}
                  onSearchChange={setSearchTerm}
                  type="resume"
                />
              </div>

              {/* Right Panel - Job Description */}
              <div className="flex-1 p-6 pl-0">
                <DocumentPanel
                  title="Job Description"
                  content={mockData?.jobDescription}
                  highlightedKeywords={filteredKeywords}
                  searchTerm={searchTerm}
                  onSearchChange={setSearchTerm}
                  type="job"
                />
              </div>
            </div>
          ) : (
            /* Mobile View */
            (<div className="h-[calc(100vh-200px)]">
              <MobileTabView
                resumeContent={mockData?.resumeContent}
                jobContent={mockData?.jobDescription}
                keywords={filteredKeywords}
                filterType={filterType}
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                onKeywordClick={handleKeywordClick}
              />
            </div>)
          )}

          {/* Floating Filter Panel - Desktop Only */}
          {!isMobile && (
            <KeywordFilterPanel
              filterType={filterType}
              onFilterChange={setFilterType}
              matchedCount={matchedCount}
              missingCount={missingCount}
              totalCount={totalCount}
              onExportReport={handleExportReport}
              onExportSummary={handleExportSummary}
              isExporting={isExporting}
            />
          )}

          {/* Mobile Filter Bar */}
          {isMobile && (
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border p-4 z-40">
              <div className="flex items-center justify-between">
                <div className="flex space-x-2">
                  {['all', 'matched', 'missing']?.map(type => (
                    <button
                      key={type}
                      onClick={() => setFilterType(type)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-smooth ${
                        filterType === type
                          ? 'bg-primary text-white' :'bg-surface text-text-secondary hover:bg-border'
                      }`}
                    >
                      {type === 'all' ? 'All' : type === 'matched' ? 'Matched' : 'Missing'}
                      <span className="ml-1">
                        ({type === 'all' ? totalCount : type === 'matched' ? matchedCount : missingCount})
                      </span>
                    </button>
                  ))}
                </div>
                <div className="text-sm font-medium text-primary">
                  {matchScore}% Match
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default SideBySideComparison;