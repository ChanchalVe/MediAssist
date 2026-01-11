import React from 'react';
import { useApp } from '../../context/AppContext';
import DashboardStats from './DashboardStats';
import TodaysSchedule from './TodaysSchedule';
import AdherenceChart from './AdherenceChart';

const Dashboard: React.FC = () => {
  const { user, t } = useApp();

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {t('welcomeBack')}, {user?.name}!
        </h1>
        <p className="text-gray-600">
          Here's your medication summary for today
        </p>
      </div>

      <DashboardStats />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <TodaysSchedule />
        </div>
        <div className="lg:col-span-1">
          <AdherenceChart />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;