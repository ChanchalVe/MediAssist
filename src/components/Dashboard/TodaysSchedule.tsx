import React from 'react';
import { Clock, Check, X, AlertCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const TodaysSchedule: React.FC = () => {
  const { getTodaysDoses, markDose, t } = useApp();
  
  const todaysDoses = getTodaysDoses();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'taken':
        return <Check className="w-5 h-5 text-green-500" />;
      case 'missed':
        return <X className="w-5 h-5 text-red-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-orange-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'taken':
        return 'bg-green-50 border-green-200';
      case 'missed':
        return 'bg-red-50 border-red-200';
      default:
        return 'bg-orange-50 border-orange-200';
    }
  };

  const getFoodInstructionText = (instruction: string) => {
    const instructions = {
      before: t('before'),
      after: t('after'),
      with: t('with'),
      empty: t('empty')
    };
    return instructions[instruction as keyof typeof instructions] || instruction;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900 flex items-center">
          <Clock className="w-6 h-6 mr-2 text-blue-600" />
          {t('todaysSchedule')}
        </h2>
        <span className="text-sm text-gray-500">
          {new Date().toLocaleDateString()}
        </span>
      </div>

      <div className="space-y-4">
        {todaysDoses.map((dose, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg border ${getStatusColor(dose.status)} transition-all hover:shadow-md`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  {getStatusIcon(dose.status)}
                  <span className="font-medium text-gray-900">{dose.time}</span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{dose.medicine.name}</h3>
                  <p className="text-sm text-gray-600">
                    {dose.medicine.dosage} • {getFoodInstructionText(dose.medicine.foodInstruction)}
                  </p>
                </div>
              </div>
              
              {dose.status === 'pending' && (
                <div className="flex space-x-2">
                  <button
                    onClick={() => markDose(dose.medicine.id, dose.time, 'taken')}
                    className="px-3 py-1 bg-green-500 text-white text-sm rounded-lg hover:bg-green-600 transition-colors"
                  >
                    {t('taken')}
                  </button>
                  <button
                    onClick={() => markDose(dose.medicine.id, dose.time, 'missed')}
                    className="px-3 py-1 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 transition-colors"
                  >
                    {t('missed')}
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
        
        {todaysDoses.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Clock className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No doses scheduled for today</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TodaysSchedule;