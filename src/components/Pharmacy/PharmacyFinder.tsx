import React, { useState } from 'react';
import { MapPin, Search, Phone, Truck, Award, Navigation } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { mockPharmacies, mockGenericMedicines } from '../../data/mockData';

const PharmacyFinder: React.FC = () => {
  const { t } = useApp();
  const [pinCode, setPinCode] = useState('');
  const [searchMedicine, setSearchMedicine] = useState('');
  const [showPharmacies, setShowPharmacies] = useState(false);
  const [showGenerics, setShowGenerics] = useState(false);

  const handlePharmacySearch = (e: React.FormEvent) => {
    e.preventDefault();
    setShowPharmacies(true);
  };

  const handleGenericSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setShowGenerics(true);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('pharmacy')}</h1>
        <p className="text-gray-600">Find nearby pharmacies and generic alternatives</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <MapPin className="w-6 h-6 mr-2 text-blue-600" />
            {t('findPharmacy')}
          </h2>
          
          <form onSubmit={handlePharmacySearch} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('pinCode')}
              </label>
              <input
                type="text"
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter PIN code"
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all"
            >
              <Search className="w-5 h-5 inline mr-2" />
              {t('searchPharmacy')}
            </button>
          </form>

          {showPharmacies && (
            <div className="mt-6 space-y-4">
              <h3 className="font-medium text-gray-900">Nearby Pharmacies</h3>
              {mockPharmacies.map((pharmacy) => (
                <div key={pharmacy.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-medium text-gray-900 flex items-center">
                        {pharmacy.name}
                        {pharmacy.isJanAushadhi && (
                          <Award className="w-4 h-4 ml-2 text-green-600" />
                        )}
                      </h4>
                      <p className="text-sm text-gray-600">{pharmacy.address}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center text-sm text-gray-500 mb-1">
                        <Navigation className="w-4 h-4 mr-1" />
                        {pharmacy.distance} km
                      </div>
                      {pharmacy.deliveryAvailable && (
                        <div className="flex items-center text-sm text-green-600">
                          <Truck className="w-4 h-4 mr-1" />
                          {t('delivery')}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-600">
                      <Phone className="w-4 h-4 mr-1" />
                      {pharmacy.phone}
                    </div>
                    {pharmacy.isJanAushadhi && (
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                        {t('janAushadhi')}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <Award className="w-6 h-6 mr-2 text-green-600" />
            {t('genericAlternatives')}
          </h2>
          
          <form onSubmit={handleGenericSearch} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('searchMedicine')}
              </label>
              <input
                type="text"
                value={searchMedicine}
                onChange={(e) => setSearchMedicine(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="e.g., Crocin, Augmentin"
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-medium rounded-lg hover:from-green-600 hover:to-green-700 transition-all"
            >
              <Search className="w-5 h-5 inline mr-2" />
              Find Generic Alternative
            </button>
          </form>

          {showGenerics && (
            <div className="mt-6 space-y-4">
              <h3 className="font-medium text-gray-900">Generic Alternatives</h3>
              {mockGenericMedicines.map((medicine, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-medium text-gray-900">{medicine.genericName}</h4>
                      <p className="text-sm text-gray-600">Alternative to {medicine.brandName}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-green-600">
                        ₹{medicine.janAushadhiPrice || medicine.price}
                      </div>
                      <div className="text-sm text-gray-500 line-through">
                        ₹{medicine.price}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                        {t('savings')}: ₹{medicine.savings}
                      </span>
                      {medicine.janAushadhiPrice && (
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                          {t('janAushadhi')}
                        </span>
                      )}
                    </div>
                    <button className="px-3 py-1 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition-colors">
                      Locate Store
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PharmacyFinder;