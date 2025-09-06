import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ComparisonHeader = ({ matchScore, onBackToDashboard, onProceedToOptimization }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white border-b border-border">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left Section - Navigation */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBackToDashboard}
              iconName="ArrowLeft"
              iconPosition="left"
            >
              Back to Dashboard
            </Button>
            <div className="h-6 w-px bg-border" />
            <div className="flex items-center space-x-2">
              <Icon name="GitCompare" size={20} className="text-primary" />
              <h1 className="text-xl font-semibold text-text-primary">Side-by-Side Comparison</h1>
            </div>
          </div>

          {/* Center Section - Match Score */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Icon name="Target" size={16} className="text-primary" />
              </div>
              <div>
                <div className="text-sm text-text-secondary">Overall Match</div>
                <div className="text-lg font-bold text-primary">{matchScore}%</div>
              </div>
            </div>
          </div>

          {/* Right Section - Actions */}
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/match-report-dashboard')}
              iconName="BarChart3"
              iconPosition="left"
              className="hidden sm:flex"
            >
              View Report
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={onProceedToOptimization}
              iconName="Zap"
              iconPosition="left"
            >
              Optimize Resume
            </Button>
          </div>
        </div>

        {/* Mobile Match Score */}
        <div className="md:hidden mt-4 flex items-center justify-center">
          <div className="flex items-center space-x-2 bg-surface px-4 py-2 rounded-lg">
            <Icon name="Target" size={16} className="text-primary" />
            <span className="text-sm text-text-secondary">Match Score:</span>
            <span className="text-lg font-bold text-primary">{matchScore}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparisonHeader;