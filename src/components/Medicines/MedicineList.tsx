import React from 'react';
import { Pill, Clock, Calendar, AlertCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const MedicineList: React.FC = () => {
  const { medicines, t } = useApp();

  const getFoodInstructionText = (instruction: string) => {
    const instructions = {
      before: t('before'),
      after: t('after'),
      with: t('with'),
      empty: t('empty')
    };
    return instructions[instruction as keyof typeof instructions] || instruction;
  };

  const getDaysLeftColor = (daysLeft: number) => {
    if (daysLeft <= 2) return 'text-red-600 bg-red-50';
    if (daysLeft <= 5) return 'text-yellow-600 bg-yellow-50';
    return 'text-green-600 bg-green-50';
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('medicines')}</h1>
        <p className="text-gray-600">Manage your medication schedule</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {medicines.map((medicine) => (
          <div key={medicine.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Pill className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{medicine.name}</h3>
                  <p className="text-sm text-gray-600">{medicine.dosage}</p>
                </div>
              </div>
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${getDaysLeftColor(medicine.daysLeft)}`}>
                {Math.ceil(medicine.daysLeft)} {t('daysLeft')}
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600">
                  {medicine.times.join(', ')}
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600">
                  {getFoodInstructionText(medicine.foodInstruction)}
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600">
                  {medicine.duration} days total
                </span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Progress</span>
                <span className="text-sm font-medium text-gray-900">
                  {Math.round(((medicine.duration - medicine.daysLeft) / medicine.duration) * 100)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((medicine.duration - medicine.daysLeft) / medicine.duration) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}

        {medicines.length === 0 && (
          <div className="col-span-full text-center py-12">
            <Pill className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No medicines added yet</h3>
            <p className="text-gray-500">Add your first medicine to get started</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MedicineList;