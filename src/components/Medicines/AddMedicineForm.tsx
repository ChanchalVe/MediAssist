import React, { useState } from 'react';
import { Plus, Clock, Pill, Calendar, Utensils } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const AddMedicineForm: React.FC = () => {
  const { addMedicine, t } = useApp();
  
  const [formData, setFormData] = useState({
    name: '',
    dosage: '',
    times: ['09:00'],
    foodInstruction: 'after' as 'before' | 'after' | 'with' | 'empty',
    duration: 1,
    daysLeft: 1,
    isCritical: false // ⭐ NEW
  });

  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const medicineData = {
      ...formData,
      times: formData.times.filter(time => time.trim() !== ''),
      daysLeft: formData.duration
    };

    addMedicine(medicineData);
    setSuccess(true);
    
    // Reset form
    setFormData({
      name: '',
      dosage: '',
      times: ['09:00'],
      foodInstruction: 'after',
      duration: 1,
      daysLeft: 1,
      isCritical: false // ⭐ NEW
    });

    setTimeout(() => setSuccess(false), 3000);
  };

  const addTimeSlot = () => {
    setFormData(prev => ({
      ...prev,
      times: [...prev.times, '']
    }));
  };

  const removeTimeSlot = (index: number) => {
    setFormData(prev => ({
      ...prev,
      times: prev.times.filter((_, i) => i !== index)
    }));
  };

  const updateTime = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      times: prev.times.map((time, i) => i === index ? value : time)
    }));
  };

  const foodInstructions = [
    { value: 'before', label: t('before') },
    { value: 'after', label: t('after') },
    { value: 'with', label: t('with') },
    { value: 'empty', label: t('empty') }
  ];

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('addMedicine')}</h1>
        <p className="text-gray-600">Add a new medicine to your schedule</p>
      </div>

      {success && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-800 font-medium">{t('medicineAdded')}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Pill className="w-4 h-4 inline mr-2" />
              {t('medicineName')}
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., Paracetamol 500mg"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Pill className="w-4 h-4 inline mr-2" />
              {t('dosage')}
            </label>
            <input
              type="text"
              value={formData.dosage}
              onChange={(e) => setFormData(prev => ({ ...prev, dosage: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., 1 tablet"
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Clock className="w-4 h-4 inline mr-2" />
              {t('times')}
            </label>
            <div className="space-y-3">
              {formData.times.map((time, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="time"
                    value={time}
                    onChange={(e) => updateTime(index, e.target.value)}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                  {formData.times.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeTimeSlot(index)}
                      className="px-3 py-3 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addTimeSlot}
                className="flex items-center space-x-2 px-4 py-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add Time</span>
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Utensils className="w-4 h-4 inline mr-2" />
              {t('foodInstruction')}
            </label>
            <select
              value={formData.foodInstruction}
              onChange={(e) => setFormData(prev => ({ ...prev, foodInstruction: e.target.value as any }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {foodInstructions.map((instruction) => (
                <option key={instruction.value} value={instruction.value}>
                  {instruction.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Calendar className="w-4 h-4 inline mr-2" />
              {t('duration')}
            </label>
            <input
              type="number"
              min="1"
              value={formData.duration}
              onChange={(e) => setFormData(prev => ({ 
                ...prev, 
               duration: parseInt(e.target.value) || 1,  // ✅ FIXED: safe parsing
                daysLeft: parseInt(e.target.value) || 1 
              }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
        </div>

        {/* // critical medicine */}

        <div className="md:col-span-2 mt-4">
  <label className="flex items-start space-x-3 cursor-pointer">
    <input
      type="checkbox"
      checked={formData.isCritical}
      onChange={(e) =>
        setFormData(prev => ({
          ...prev,
          isCritical: e.target.checked
        }))
      }
      className="mt-1 h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
    />
    <div>
      <span className="text-sm font-medium text-gray-900">
        Mark as Critical Medicine
      </span>
      <p className="text-sm text-gray-500">
        Missing this medicine may require urgent attention or caregiver alert.
      </p>
    </div>
  </label>
</div>

{/* critical medicine end */}

        <div className="mt-8 flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all"
          >
            {t('addMedicine')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddMedicineForm;