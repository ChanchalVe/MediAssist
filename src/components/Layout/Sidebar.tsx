import React from 'react';
import { 
  Home, 
  Pill, 
  TrendingUp, 
  Camera, 
  MapPin, 
  Settings,
  Plus,
  Calendar
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  const { t } = useApp();

  const menuItems = [
    { id: 'dashboard', label: t('dashboard'), icon: Home },
    { id: 'medicines', label: t('medicines'), icon: Pill },
    { id: 'dose-tracker', label: 'Dose Tracker', icon: Calendar },
    { id: 'prescription', label: t('prescription'), icon: Camera },
    { id: 'pharmacy', label: t('pharmacy'), icon: MapPin },
    // { id: 'add-medicine', label: t('addMedicine'), icon: Plus },
  ];

  return (
    <div className="w-64 bg-white shadow-lg h-full border-r border-gray-200">
      <nav className="mt-8">
        <div className="px-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === item.id
                    ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-500'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon className="w-5 h-5 mr-3" />
                {item.label}
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;