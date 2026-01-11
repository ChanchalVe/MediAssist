import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const AdherenceChart: React.FC = () => {
  const { getAdherenceScore, t } = useApp();
  
  const adherenceScore = getAdherenceScore();
  
  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 90) return t('excellent');
    if (score >= 70) return t('needsImprovement');
    return t('atRisk');
  };

  const getScoreIcon = (score: number) => {
    if (score >= 90) return <TrendingUp className="w-5 h-5 text-green-500" />;
    if (score >= 70) return <Minus className="w-5 h-5 text-yellow-500" />;
    return <TrendingDown className="w-5 h-5 text-red-500" />;
  };

  // Mock weekly data for chart
  const weeklyData = [
    { day: 'Mon', score: 95 },
    { day: 'Tue', score: 88 },
    { day: 'Wed', score: 92 },
    { day: 'Thu', score: 85 },
    { day: 'Fri', score: 90 },
    { day: 'Sat', score: 87 },
    { day: 'Sun', score: adherenceScore }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">{t('adherenceScore')}</h2>
        {getScoreIcon(adherenceScore)}
      </div>

      <div className="text-center mb-6">
        <div className="text-4xl font-bold text-gray-900 mb-2">{adherenceScore}%</div>
        <div className={`text-sm font-medium ${getScoreColor(adherenceScore)}`}>
          {getScoreLabel(adherenceScore)}
        </div>
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">Progress</span>
          <span className="text-sm font-medium text-gray-900">{adherenceScore}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-300 ${
              adherenceScore >= 90 ? 'bg-green-500' : 
              adherenceScore >= 70 ? 'bg-yellow-500' : 'bg-red-500'
            }`}
            style={{ width: `${adherenceScore}%` }}
          ></div>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-medium text-gray-700">Weekly Trend</h3>
        <div className="flex justify-between items-end space-x-1">
          {weeklyData.map((data, index) => (
            <div key={index} className="flex flex-col items-center">
              <div 
                className={`w-4 rounded-t transition-all duration-300 ${
                  data.score >= 90 ? 'bg-green-500' : 
                  data.score >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{ height: `${data.score * 0.4}px` }}
              ></div>
              <span className="text-xs text-gray-500 mt-1">{data.day}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdherenceChart;