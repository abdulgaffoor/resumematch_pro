import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const SkillsComparisonChart = () => {
  const chartData = [
    {
      category: 'Frontend',
      required: 8,
      matched: 6,
      missing: 2
    },
    {
      category: 'Backend',
      required: 5,
      matched: 3,
      missing: 2
    },
    {
      category: 'Database',
      required: 4,
      matched: 3,
      missing: 1
    },
    {
      category: 'DevOps',
      required: 6,
      matched: 2,
      missing: 4
    },
    {
      category: 'Testing',
      required: 3,
      matched: 1,
      missing: 2
    },
    {
      category: 'Soft Skills',
      required: 4,
      matched: 4,
      missing: 0
    }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-white border border-border rounded-lg shadow-modal p-3">
          <p className="font-medium text-text-primary mb-2">{label}</p>
          {payload?.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry?.color }}>
              {entry?.name}: {entry?.value} skills
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-text-primary mb-2">
          Skills Comparison by Category
        </h3>
        <p className="text-sm text-text-secondary">
          Visual breakdown of required vs matched skills across different categories
        </p>
      </div>

      <div className="w-full h-80" aria-label="Skills Comparison Bar Chart">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
            barCategoryGap="20%"
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis 
              dataKey="category" 
              tick={{ fontSize: 12, fill: '#475569' }}
              axisLine={{ stroke: '#E2E8F0' }}
            />
            <YAxis 
              tick={{ fontSize: 12, fill: '#475569' }}
              axisLine={{ stroke: '#E2E8F0' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              wrapperStyle={{ fontSize: '12px', color: '#475569' }}
            />
            <Bar 
              dataKey="matched" 
              name="Matched Skills"
              fill="#059669" 
              radius={[2, 2, 0, 0]}
            />
            <Bar 
              dataKey="missing" 
              name="Missing Skills"
              fill="#DC2626" 
              radius={[2, 2, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Chart Legend */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-center space-x-6 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-success rounded"></div>
            <span className="text-text-secondary">Skills You Have</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-error rounded"></div>
            <span className="text-text-secondary">Skills You Need</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsComparisonChart;