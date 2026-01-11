import React from "react";
import { User, Globe, Bell, Shield, Info, Check } from "lucide-react";
import { useApp } from "../../context/AppContext";
import ProfilePage from "./ProfilePage"; // ← ADDED

const Settings: React.FC = () => {
  const { user, language, setLanguage, t } = useApp();

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {t("settings")}
        </h1>
        <p className="text-gray-600">Manage your account preferences</p>
      </div>

      <div className="space-y-6">
        {/* PROFILE SECTION - NOW WITH ProfilePage */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <User className="w-6 h-6 mr-2 text-blue-600" />
            {t("profile")}
          </h2>

          {/* Basic user info (kept for reference) */}
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t("name")}
              </label>
              <input
                type="text"
                value={user?.name || ""}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                readOnly
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t("email")}
              </label>
              <input
                type="email"
                value={user?.email || ""}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                readOnly
              />
            </div>
          </div>

          {/* ← CAREGIVER MANAGEMENT */}
          <ProfilePage />
        </div>

        {/* LANGUAGE SECTION */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <Globe className="w-6 h-6 mr-2 text-green-600" />
            {t("language")}
          </h2>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">🇺🇸</span>
                <span className="font-medium text-gray-900">
                  {t("english")}
                </span>
              </div>
              <button
                onClick={() => setLanguage("en")}
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  language === "en"
                    ? "bg-green-500 border-green-500"
                    : "border-gray-300"
                }`}
              >
                {language === "en" && <Check className="w-4 h-4 text-white" />}
              </button>
            </div>

            <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">🇮🇳</span>
                <span className="font-medium text-gray-900">{t("hindi")}</span>
              </div>
              <button
                onClick={() => setLanguage("hi")}
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  language === "hi"
                    ? "bg-green-500 border-green-500"
                    : "border-gray-300"
                }`}
              >
                {language === "hi" && <Check className="w-4 h-4 text-white" />}
              </button>
            </div>
          </div>
        </div>

        {/* NOTIFICATIONS SECTION */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <Bell className="w-6 h-6 mr-2 text-yellow-600" />
            {t("notifications")}
          </h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">
                  Medication Reminders
                </h3>
                <p className="text-sm text-gray-600">
                  Get notified when it's time to take your medicine
                </p>
              </div>
              <button className="w-12 h-6 bg-green-500 rounded-full relative">
                <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1 transition-transform"></div>
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">Refill Reminders</h3>
                <p className="text-sm text-gray-600">
                  Get notified when medication is running low
                </p>
              </div>
              <button className="w-12 h-6 bg-green-500 rounded-full relative">
                <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1 transition-transform"></div>
              </button>
            </div>
          </div>
        </div>

        {/* PRIVACY SECTION */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <Shield className="w-6 h-6 mr-2 text-purple-600" />
            {t("privacy")}
          </h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">Data Sharing</h3>
                <p className="text-sm text-gray-600">
                  Share anonymized data to improve healthcare
                </p>
              </div>
              <button className="w-12 h-6 bg-gray-300 rounded-full relative">
                <div className="w-4 h-4 bg-white rounded-full absolute left-1 top-1 transition-transform"></div>
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">Location Services</h3>
                <p className="text-sm text-gray-600">
                  Allow location access for nearby pharmacy recommendations
                </p>
              </div>
              <button className="w-12 h-6 bg-green-500 rounded-full relative">
                <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1 transition-transform"></div>
              </button>
            </div>
          </div>
        </div>

        {/* ABOUT SECTION */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <Info className="w-6 h-6 mr-2 text-indigo-600" />
            {t("about")}
          </h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">App Version</span>
              <span className="font-medium text-gray-900">{t("version")}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-600">Developer</span>
              <span className="font-medium text-gray-900">MediAssist Team</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-600">License</span>
              <span className="font-medium text-gray-900">MIT License</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
