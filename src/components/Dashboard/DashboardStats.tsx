import React from 'react';
import { Pill, Calendar, Clock, TrendingUp } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const DashboardStats: React.FC = () => {
  const { medicines, getTodaysDoses, getAdherenceScore, t } = useApp();
  
  const todaysDoses = getTodaysDoses();
  const adherenceScore = getAdherenceScore();
  const nextDose = todaysDoses.find(dose => dose.status === 'pending');

  const stats = [
    {
      label: t('totalMedicines'),
      value: medicines.length,
      icon: Pill,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700'
    },
    {
      label: t('todaysDoses'),
      value: todaysDoses.length,
      icon: Calendar,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-700'
    },
    {
      label: t('adherenceScore'),
      value: `${adherenceScore}%`,
      icon: TrendingUp,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-700'
    },
    {
      label: t('nextDose'),
      value: nextDose ? nextDose.time : '--',
      icon: Clock,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-700'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                <Icon className={`w-6 h-6 ${stat.textColor}`} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DashboardStats;