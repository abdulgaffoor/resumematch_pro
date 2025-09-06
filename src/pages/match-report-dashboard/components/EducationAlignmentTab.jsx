import React from 'react';
import Icon from '../../../components/AppIcon';

const EducationAlignmentTab = () => {
  const educationData = {
    requirements: [
      {
        requirement: "Bachelor\'s degree in Computer Science or related field",
        status: 'matched',
        userEducation: "Bachelor of Science in Computer Science",
        match: true
      },
      {
        requirement: "Master\'s degree preferred",
        status: 'missing',
        userEducation: null,
        match: false
      },
      {
        requirement: "3+ years of relevant experience",
        status: 'matched',
        userEducation: "4 years of frontend development experience",
        match: true
      },
      {
        requirement: "Certification in React or similar framework",
        status: 'missing',
        userEducation: null,
        match: false
      }
    ],
    userEducation: [
      {
        degree: "Bachelor of Science in Computer Science",
        institution: "University of California, Berkeley",
        year: "2020",
        gpa: "3.7/4.0",
        relevant: true
      },
      {
        degree: "High School Diploma",
        institution: "Lincoln High School",
        year: "2016",
        gpa: "3.9/4.0",
        relevant: false
      }
    ],
    certifications: [
      {
        name: "AWS Certified Developer",
        issuer: "Amazon Web Services",
        year: "2023",
        relevant: true
      },
      {
        name: "Google Analytics Certified",
        issuer: "Google",
        year: "2022",
        relevant: false
      }
    ]
  };

  const matchedRequirements = educationData?.requirements?.filter(req => req?.match)?.length;
  const totalRequirements = educationData?.requirements?.length;
  const matchPercentage = Math.round((matchedRequirements / totalRequirements) * 100);

  return (
    <div className="space-y-6">
      {/* Education Match Summary */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-text-primary">
            Education Requirements Match
          </h3>
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-primary">{matchPercentage}%</span>
            <Icon 
              name={matchPercentage >= 75 ? "CheckCircle" : "AlertCircle"} 
              size={20} 
              color={matchPercentage >= 75 ? "var(--color-success)" : "var(--color-warning)"}
            />
          </div>
        </div>
        
        <div className="w-full bg-muted rounded-full h-2 mb-4">
          <div 
            className={`h-2 rounded-full transition-all duration-1000 ${
              matchPercentage >= 75 ? 'bg-success' : 'bg-warning'
            }`}
            style={{ width: `${matchPercentage}%` }}
          />
        </div>
        
        <div className="text-sm text-text-secondary">
          {matchedRequirements} of {totalRequirements} requirements met
        </div>
      </div>
      {/* Requirements Analysis */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-text-primary">
          Requirement Analysis
        </h3>
        
        {educationData?.requirements?.map((req, index) => (
          <div
            key={index}
            className={`
              border rounded-lg p-4 transition-smooth
              ${req?.match 
                ? 'bg-success/5 border-success/20' :'bg-error/5 border-error/20'
              }
            `}
          >
            <div className="flex items-start space-x-3">
              <Icon
                name={req?.match ? "CheckCircle" : "XCircle"}
                size={20}
                color={req?.match ? "var(--color-success)" : "var(--color-error)"}
                className="mt-0.5 flex-shrink-0"
              />
              <div className="flex-1 space-y-2">
                <div className="font-medium text-text-primary">
                  {req?.requirement}
                </div>
                {req?.userEducation && (
                  <div className="text-sm text-text-secondary bg-white/50 rounded p-2">
                    <strong>Your qualification:</strong> {req?.userEducation}
                  </div>
                )}
                {!req?.match && (
                  <div className="text-sm text-error font-medium">
                    Consider adding this qualification to strengthen your profile
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Your Education */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">
          Your Education Background
        </h3>
        
        <div className="space-y-4">
          {educationData?.userEducation?.map((edu, index) => (
            <div
              key={index}
              className={`
                flex items-start space-x-3 p-3 rounded-lg border
                ${edu?.relevant 
                  ? 'bg-primary/5 border-primary/20' :'bg-muted border-border'
                }
              `}
            >
              <Icon
                name="GraduationCap"
                size={20}
                color={edu?.relevant ? "var(--color-primary)" : "var(--color-muted-foreground)"}
                className="mt-0.5 flex-shrink-0"
              />
              <div className="flex-1">
                <div className="font-medium text-text-primary">{edu?.degree}</div>
                <div className="text-sm text-text-secondary">{edu?.institution}</div>
                <div className="text-sm text-text-secondary">
                  {edu?.year} • GPA: {edu?.gpa}
                </div>
              </div>
              {edu?.relevant && (
                <div className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                  Relevant
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      {/* Certifications */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">
          Certifications
        </h3>
        
        <div className="space-y-3">
          {educationData?.certifications?.map((cert, index) => (
            <div
              key={index}
              className={`
                flex items-start space-x-3 p-3 rounded-lg border
                ${cert?.relevant 
                  ? 'bg-success/5 border-success/20' :'bg-muted border-border'
                }
              `}
            >
              <Icon
                name="Award"
                size={20}
                color={cert?.relevant ? "var(--color-success)" : "var(--color-muted-foreground)"}
                className="mt-0.5 flex-shrink-0"
              />
              <div className="flex-1">
                <div className="font-medium text-text-primary">{cert?.name}</div>
                <div className="text-sm text-text-secondary">{cert?.issuer}</div>
                <div className="text-sm text-text-secondary">Earned: {cert?.year}</div>
              </div>
              {cert?.relevant && (
                <div className="px-2 py-1 bg-success/10 text-success text-xs font-medium rounded-full">
                  Job Relevant
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EducationAlignmentTab;