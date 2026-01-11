import React, { useState } from "react";
import { AppProvider, useApp } from "./context/AppContext";
import Header from "./components/Layout/Header";
import Sidebar from "./components/Layout/Sidebar";
import AuthPage from "./components/Auth/AuthPage";
import Dashboard from "./components/Dashboard/Dashboard";
import MedicineList from "./components/Medicines/MedicineList";
import AddMedicineForm from "./components/Medicines/AddMedicineForm";
import VisualDoseTracker from "./components/Medicines/VisualDoseTracker";
import PrescriptionUpload from "./components/Prescription/PrescriptionUpload";
import PharmacyFinder from "./components/Pharmacy/PharmacyFinder";
import Settings from "./components/Settings/Settings";

const AppContent: React.FC = () => {
  const { isAuthenticated } = useApp();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showSettings, setShowSettings] = useState(false);

  if (!isAuthenticated) {
    return <AuthPage />;
  }

  const renderContent = () => {
    if (showSettings) {
      return <Settings />;
    }

    switch (activeTab) {
      case "dashboard":
        return <Dashboard />;
      case "medicines":
        return (
          <div className="p-6 space-y-8 max-w-6xl mx-auto">
            {/* ✅ ADD MEDICINE FORM AT TOP */}
            <AddMedicineForm />
            {/* ✅ MEDICINE LIST BELOW */}
            <MedicineList />
          </div>
        );
      case "add-medicine":  // Keep as backup/standalone
        return <AddMedicineForm />;
      case "dose-tracker":
        return <VisualDoseTracker />;
    
      case "prescription":
        return <PrescriptionUpload />;
      case "pharmacy":
        return <PharmacyFinder />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onSettingsClick={() => setShowSettings(!showSettings)} />
      <div className="flex">
        <Sidebar
          activeTab={showSettings ? "settings" : activeTab}
          onTabChange={(tab) => {
            setActiveTab(tab);
            setShowSettings(false);
          }}
        />
        <main className="flex-1 overflow-auto">{renderContent()}</main>
      </div>
    </div>
  );
};

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;

