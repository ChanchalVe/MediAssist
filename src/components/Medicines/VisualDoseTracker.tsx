import React from 'react';
import { useApp } from '../../context/AppContext';

const VisualDoseTracker: React.FC = () => {
  const { medicines, getTodaysDoses, markDose, t } = useApp();
  
  const todaysDoses = getTodaysDoses();

  const getFoodInstructionText = (instruction: string) => {
    const instructions = {
      before: t('before'),
      after: t('after'),
      with: t('with'),
      empty: t('empty')
    };
    return instructions[instruction as keyof typeof instructions] || instruction;
  };

  const getTimeEmoji = (time: string) => {
    const hour = parseInt(time.split(':')[0]);
    if (hour >= 5 && hour < 12) return '☀️'; // Morning
    if (hour >= 12 && hour < 17) return '🌤️'; // Afternoon
    if (hour >= 17 && hour < 21) return '🌅'; // Evening
    return '🌙'; // Night
  };

  const getFoodEmoji = (instruction: string) => {
    switch (instruction) {
      case 'before': return '🍽️';
      case 'after': return '🍽️';
      case 'with': return '🍽️';
      case 'empty': return '⏰';
      default: return '🍽️';
    }
  };

  // Group doses by medicine
  const medicineGroups = medicines.map(medicine => {
    const medicineDoses = todaysDoses.filter(dose => dose.medicine.id === medicine.id);
    return {
      medicine,
      doses: medicineDoses
    };
  });

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <div className="w-6 h-6 bg-green-500 rounded flex items-center justify-center mr-3">
            <span className="text-white text-sm font-bold">✓</span>
          </div>
          <h1 className="text-2xl font-bold text-white">6. Visual Dose Tracker with Simplified Instructions</h1>
        </div>
        
        <div className="flex items-center mb-6">
          <span className="text-2xl mr-3">📅</span>
          <span className="text-lg font-semibold text-white">Feature:</span>
        </div>
        
        <p className="text-gray-300 mb-6">• After adding medicine, show a visual table:</p>
      </div>

      <div className="bg-gray-900 rounded-xl shadow-2xl border border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-800 border-b border-gray-700">
              <tr>
                <th className="px-6 py-4 text-left">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl">💊</span>
                    <span className="text-white font-semibold">Medicine</span>
                  </div>
                </th>
                <th className="px-6 py-4 text-left">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl">⏰</span>
                    <span className="text-white font-semibold">Time</span>
                  </div>
                </th>
                <th className="px-6 py-4 text-left">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl">🍽️</span>
                    <span className="text-white font-semibold">Food</span>
                  </div>
                </th>
                <th className="px-6 py-4 text-left">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl">💊</span>
                    <span className="text-white font-semibold">Dose</span>
                  </div>
                </th>
                <th className="px-6 py-4 text-left">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl">📅</span>
                    <span className="text-white font-semibold">Days Left</span>
                  </div>
                </th>
                <th className="px-6 py-4 text-left">
                  <span className="text-white font-semibold">Action</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {medicineGroups.map((group) => 
                group.doses.map((dose, doseIndex) => (
                  <tr key={`${group.medicine.id}-${doseIndex}`} className="hover:bg-gray-800 transition-colors">
                    <td className="px-6 py-4">
                      {doseIndex === 0 ? (
                        <span className="text-white font-medium">{group.medicine.name}</span>
                      ) : (
                        <span className="text-transparent">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-xl">{getTimeEmoji(dose.time)}</span>
                        <span className="text-white">{dose.time}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-xl">{getFoodEmoji(group.medicine.foodInstruction)}</span>
                        <span className="text-white">{getFoodInstructionText(group.medicine.foodInstruction)}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-white">{group.medicine.dosage}</span>
                    </td>
                    <td className="px-6 py-4">
                      {doseIndex === 0 ? (
                        <span className="text-white font-medium">{Math.ceil(group.medicine.daysLeft)}</span>
                      ) : (
                        <span className="text-white font-medium">{Math.ceil(group.medicine.daysLeft)}</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {dose.status === 'pending' ? (
                        <div className="flex space-x-2">
                          <button
                            onClick={() => markDose(dose.medicine.id, dose.time, 'taken')}
                            className="px-3 py-1 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors"
                          >
                            ✓ {t('taken')}
                          </button>
                          <button
                            onClick={() => markDose(dose.medicine.id, dose.time, 'missed')}
                            className="px-3 py-1 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors"
                          >
                            ✗ {t('missed')}
                          </button>
                        </div>
                      ) : (
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          dose.status === 'taken' 
                            ? 'bg-green-900 text-green-300' 
                            : 'bg-red-900 text-red-300'
                        }`}>
                          {dose.status === 'taken' ? '✓ Taken' : '✗ Missed'}
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              )}
              
              {medicineGroups.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center">
                      <span className="text-6xl mb-4">💊</span>
                      <h3 className="text-lg font-medium text-white mb-2">No medicines added yet</h3>
                      <p className="text-gray-400">Add your first medicine to see the dose tracker</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-6 bg-gray-800 rounded-lg p-4 border border-gray-700">
        <p className="text-gray-300">
          • Doses marked as "{t('taken')}" reduce <span className="font-semibold text-white">Days Left</span> and update <span className="font-semibold text-white">Adherence Score</span>
        </p>
      </div>
    </div>
  );
};

export default VisualDoseTracker;