import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import ProgressIndicator from '../../components/ui/ProgressIndicator';
import ResumePreview from './components/ResumePreview';
import ModificationsSummary from './components/ModificationsSummary';
import ActionPanel from './components/ActionPanel';
import DownloadConfirmation from './components/DownloadConfirmation';

const OptimizedResumePreview = () => {
  const navigate = useNavigate();
  const [downloadLoading, setDownloadLoading] = useState({
    pdf: false,
    docx: false
  });
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [lastDownload, setLastDownload] = useState(null);

  // Mock data for optimized resume
  const originalResume = {
    personalInfo: {
      name: "Sarah Johnson",
      email: "sarah.johnson@email.com",
      phone: "(555) 123-4567",
      location: "San Francisco, CA",
      linkedin: "linkedin.com/in/sarahjohnson"
    },
    summary: `Experienced software engineer with 5 years of expertise in full-stack development. Proficient in JavaScript, React, and Node.js with a track record of delivering scalable web applications.`,
    skills: {
      programming: ["JavaScript", "Python", "Java"],
      frontend: ["React", "HTML", "CSS"],
      backend: ["Node.js", "Express", "MongoDB"],
      tools: ["Git", "Docker", "AWS"]
    },
    experience: [
      {
        title: "Senior Software Engineer",
        company: "TechCorp Inc.",
        duration: "2021 - Present",
        location: "San Francisco, CA",
        achievements: [
          "Developed and maintained web applications using React and Node.js",
          "Collaborated with cross-functional teams to deliver features",
          "Improved application performance by 30%"
        ]
      },
      {
        title: "Software Developer",
        company: "StartupXYZ",
        duration: "2019 - 2021",
        location: "San Francisco, CA",
        achievements: [
          "Built responsive web interfaces using modern JavaScript frameworks",
          "Implemented RESTful APIs and database integrations",
          "Participated in code reviews and agile development processes"
        ]
      }
    ],
    education: [
      {
        degree: "Bachelor of Science in Computer Science",
        institution: "University of California, Berkeley",
        year: "2019",
        location: "Berkeley, CA",
        gpa: "3.8"
      }
    ],
    certifications: [
      {
        name: "AWS Certified Developer",
        year: "2022"
      }
    ]
  };

  const optimizedResume = {
    ...originalResume,
    summary: `Results-driven Senior Software Engineer with 5+ years of expertise in full-stack development and cloud architecture. Proven track record of building scalable web applications using React, Node.js, and AWS, with demonstrated ability to improve system performance by 30% and lead cross-functional teams in agile environments.`,
    skills: {
      programming: ["JavaScript", "Python", "Java", "TypeScript"],
      frontend: ["React", "Vue.js", "HTML5", "CSS3", "Responsive Design"],
      backend: ["Node.js", "Express", "MongoDB", "PostgreSQL", "RESTful APIs"],
      cloud: ["AWS", "Docker", "Kubernetes", "CI/CD"],
      tools: ["Git", "Jira", "Agile", "Scrum"]
    },
    experience: [
      {
        ...originalResume?.experience?.[0],
        achievements: [
          "Architected and developed scalable web applications using React, Node.js, and AWS, serving 100K+ daily active users",
          "Led cross-functional team of 5 developers in agile environment, delivering 15+ features on schedule",
          "Optimized application performance through code refactoring and database optimization, achieving 30% improvement in load times",
          "Implemented CI/CD pipelines using Docker and AWS, reducing deployment time by 50%"
        ]
      },
      {
        ...originalResume?.experience?.[1],
        achievements: [
          "Developed responsive web interfaces using React and Vue.js, ensuring cross-browser compatibility",
          "Built and maintained RESTful APIs using Node.js and Express, handling 1M+ requests daily",
          "Collaborated in agile development processes, participating in daily standups and sprint planning",
          "Mentored junior developers and conducted code reviews to maintain high code quality standards"
        ]
      }
    ],
    certifications: [
      {
        name: "AWS Certified Developer - Associate",
        year: "2022"
      },
      {
        name: "Certified Scrum Master (CSM)",
        year: "2023"
      }
    ]
  };

  const modifications = {
    totalChanges: 12,
    stats: {
      keywordsAdded: 8,
      formattingFixed: 3,
      matchImprovement: 15
    },
    sections: {
      keywords: {
        title: "Keywords & Skills",
        changes: [
          {
            type: "added",
            title: "Added TypeScript",
            description: "Added TypeScript to programming skills to match job requirements",
            impact: "+3% match score"
          },
          {
            type: "added",
            title: "Added Vue.js",
            description: "Included Vue.js experience to demonstrate frontend framework versatility",
            impact: "+2% match score"
          },
          {
            type: "added",
            title: "Added Cloud Technologies",
            description: "Expanded cloud skills section with Kubernetes and CI/CD",
            impact: "+4% match score"
          },
          {
            type: "added",
            title: "Added Agile Methodologies",
            description: "Highlighted Scrum and Agile experience in tools section",
            impact: "+2% match score"
          }
        ]
      },
      formatting: {
        title: "Formatting & Structure",
        changes: [
          {
            type: "modified",
            title: "Enhanced Professional Summary",
            description: "Restructured summary to include quantifiable achievements and key technologies",
            impact: "+2% match score"
          },
          {
            type: "modified",
            title: "Improved Experience Descriptions",
            description: "Added specific metrics and quantifiable results to work experience",
            impact: "+3% match score"
          },
          {
            type: "added",
            title: "Added Certification Details",
            description: "Included full certification names and added recent Scrum Master certification",
            impact: "+1% match score"
          }
        ]
      },
      content: {
        title: "Content Enhancement",
        changes: [
          {
            type: "added",
            title: "Quantified Achievements",
            description: "Added specific numbers and metrics to demonstrate impact (100K+ users, 30% performance improvement)",
            impact: "+4% match score"
          },
          {
            type: "modified",
            title: "Leadership Experience",
            description: "Highlighted team leadership and mentoring experience",
            impact: "+2% match score"
          }
        ]
      }
    }
  };

  const matchScore = 87;

  const handleDownload = async (format) => {
    setDownloadLoading(prev => ({ ...prev, [format]: true }));
    
    try {
      // Simulate download process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const fileName = `Sarah_Johnson_Resume_Optimized.${format}`;
      setLastDownload({ type: format, fileName });
      setShowConfirmation(true);
    } catch (error) {
      console.error('Download failed:', error);
    } finally {
      setDownloadLoading(prev => ({ ...prev, [format]: false }));
    }
  };

  const handleTryAnother = () => {
    navigate('/resume-analysis-input');
  };

  const handleBackToReport = () => {
    navigate('/match-report-dashboard');
  };

  const handleCloseConfirmation = () => {
    setShowConfirmation(false);
    setLastDownload(null);
  };

  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <ProgressIndicator className="mt-16" />
      
      <main className="pt-8 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-text-primary mb-2">
              Optimized Resume Preview
            </h1>
            <p className="text-text-secondary">
              Review your enhanced resume with applied optimizations and download when ready
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Preview Area */}
            <div className="lg:col-span-2 space-y-6">
              <ResumePreview
                originalResume={originalResume}
                optimizedResume={optimizedResume}
                modifications={modifications}
                onDownload={handleDownload}
                downloadLoading={downloadLoading}
              />
            </div>

            {/* Side Panel */}
            <div className="space-y-6">
              <ModificationsSummary modifications={modifications} />
              
              <ActionPanel
                onDownload={handleDownload}
                onTryAnother={handleTryAnother}
                onBackToReport={handleBackToReport}
                downloadLoading={downloadLoading}
                matchScore={matchScore}
              />
            </div>
          </div>
        </div>
      </main>

      {/* Download Confirmation Modal */}
      <DownloadConfirmation
        isVisible={showConfirmation}
        onClose={handleCloseConfirmation}
        downloadType={lastDownload?.type}
        fileName={lastDownload?.fileName}
        onTryAnother={handleTryAnother}
      />
    </div>
  );
};

export default OptimizedResumePreview;