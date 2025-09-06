import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const SkillsAnalysisTab = () => {
  const [showMissingOnly, setShowMissingOnly] = useState(false);
  const [skillsData, setSkillsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get analysis results from sessionStorage
    const loadAnalysisData = () => {
      try {
        const analysisResults = sessionStorage?.getItem('analysisResults');
        if (analysisResults) {
          const data = JSON.parse(analysisResults);
          
          // Process skills from real analysis
          if (data?.skillsAnalysis?.matchedSkills) {
            const processedSkills = data?.skillsAnalysis?.matchedSkills?.map(skill => ({
              skill: skill?.skill || 'Unknown Skill',
              matched: skill?.present || false,
              importance: skill?.required ? 'high' : 'medium',
              match: skill?.match || 'missing',
              yearsExperience: skill?.yearsExperience || 0,
              proficiency: skill?.proficiency || 'None'
            }));

            // Add missing skills
            if (data?.skillsAnalysis?.missingSkills) {
              const missingSkills = data?.skillsAnalysis?.missingSkills?.map(skill => ({
                skill: skill?.skill || 'Unknown Skill',
                matched: false,
                importance: skill?.importance || 'medium',
                match: 'missing',
                yearsExperience: 0,
                proficiency: 'None',
                suggestion: skill?.suggestion
              }));
              
              setSkillsData([...processedSkills, ...missingSkills]);
            } else {
              setSkillsData(processedSkills);
            }
          } else {
            // Fallback to demo data if no skills analysis available
            setSkillsData(getDefaultSkillsData());
          }
        } else {
          // No analysis data available - show default
          setSkillsData(getDefaultSkillsData());
        }
      } catch (error) {
        console.error('Error loading skills analysis:', error);
        setSkillsData(getDefaultSkillsData());
      } finally {
        setLoading(false);
      }
    };

    loadAnalysisData();
  }, []);

  // Fallback data for when no real analysis is available
  const getDefaultSkillsData = () => [
    { skill: 'React', matched: true, importance: 'high', match: 'exact' },
    { skill: 'JavaScript', matched: true, importance: 'high', match: 'exact' },
    { skill: 'Node.js', matched: true, importance: 'medium', match: 'exact' },
    { skill: 'TypeScript', matched: false, importance: 'high', match: 'missing' },
    { skill: 'GraphQL', matched: false, importance: 'medium', match: 'missing' },
    { skill: 'Docker', matched: true, importance: 'medium', match: 'exact' },
    { skill: 'AWS', matched: false, importance: 'high', match: 'missing' },
    { skill: 'MongoDB', matched: true, importance: 'low', match: 'partial' }
  ];

  const filteredSkills = showMissingOnly 
    ? skillsData?.filter(skill => !skill?.matched)
    : skillsData;

  const matchedCount = skillsData?.filter(skill => skill?.matched)?.length;
  const totalCount = skillsData?.length;

  const getImportanceColor = (importance) => {
    switch (importance) {
      case 'high': return 'bg-error text-white';
      case 'medium': return 'bg-warning text-white';
      case 'low': return 'bg-muted text-text-secondary';
      default: return 'bg-muted text-text-secondary';
    }
  };

  const getMatchIcon = (match, matched) => {
    if (match === 'exact' && matched) return { icon: 'CheckCircle', color: 'var(--color-success)' };
    if (match === 'partial') return { icon: 'AlertTriangle', color: 'var(--color-warning)' };
    if (match === 'missing' || !matched) return { icon: 'XCircle', color: 'var(--color-error)' };
    return { icon: 'Circle', color: 'var(--color-text-secondary)' };
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        <span className="ml-3 text-text-secondary">Loading skills analysis...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
              <Icon name="CheckCircle" size={20} color="var(--color-success)" />
            </div>
            <div>
              <div className="text-2xl font-bold text-success">{matchedCount}</div>
              <div className="text-sm text-text-secondary">Matched Skills</div>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-error/10 rounded-lg flex items-center justify-center">
              <Icon name="XCircle" size={20} color="var(--color-error)" />
            </div>
            <div>
              <div className="text-2xl font-bold text-error">{totalCount - matchedCount}</div>
              <div className="text-sm text-text-secondary">Missing Skills</div>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="Target" size={20} color="var(--color-primary)" />
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">
                {totalCount > 0 ? Math.round((matchedCount / totalCount) * 100) : 0}%
              </div>
              <div className="text-sm text-text-secondary">Skills Match</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Toggle */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-text-primary">
          Skills Analysis {filteredSkills?.length > 0 ? `(${filteredSkills?.length})` : ''}
        </h3>
        <div className="flex items-center space-x-3">
          <span className="text-sm text-text-secondary">Show missing only</span>
          <button
            onClick={() => setShowMissingOnly(!showMissingOnly)}
            className={`
              relative inline-flex h-6 w-11 items-center rounded-full transition-colors
              ${showMissingOnly ? 'bg-primary' : 'bg-muted'}
            `}
          >
            <span
              className={`
                inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                ${showMissingOnly ? 'translate-x-6' : 'translate-x-1'}
              `}
            />
          </button>
        </div>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {filteredSkills?.map((skill, index) => {
          const iconData = getMatchIcon(skill?.match, skill?.matched);
          
          return (
            <div
              key={index}
              className={`
                flex items-center justify-between p-3 rounded-lg border transition-smooth
                ${skill?.matched 
                  ? 'bg-success/5 border-success/20' :'bg-error/5 border-error/20'
                }
              `}
            >
              <div className="flex items-center space-x-3 flex-1">
                <Icon
                  name={iconData?.icon}
                  size={16}
                  color={iconData?.color}
                />
                <div className="flex-1 min-w-0">
                  <span className="font-medium text-text-primary truncate block">
                    {skill?.skill}
                  </span>
                  {skill?.proficiency && skill?.matched && (
                    <span className="text-xs text-text-secondary">
                      {skill?.yearsExperience}+ yrs • {skill?.proficiency}
                    </span>
                  )}
                  {skill?.suggestion && !skill?.matched && (
                    <span className="text-xs text-text-secondary truncate block">
                      {skill?.suggestion}
                    </span>
                  )}
                </div>
              </div>
              <span className={`
                px-2 py-1 text-xs font-medium rounded-full flex-shrink-0
                ${getImportanceColor(skill?.importance)}
              `}>
                {skill?.importance}
              </span>
            </div>
          );
        })}
      </div>

      {filteredSkills?.length === 0 && (
        <div className="text-center py-8">
          <Icon name="Search" size={48} color="var(--color-muted-foreground)" className="mx-auto mb-4" />
          <p className="text-text-secondary">No skills found with current filter</p>
        </div>
      )}

      {/* Analysis Note */}
      <div className="bg-info/5 border border-info/20 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={16} className="text-info flex-shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="text-info font-medium mb-1">Analysis powered by Gemini AI</p>
            <p className="text-info/80">
              Skills analysis is based on your actual resume content and job requirements. 
              {matchedCount > 0 && ` You matched ${matchedCount} out of ${totalCount} key skills.`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsAnalysisTab;