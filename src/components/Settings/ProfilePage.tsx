import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { Caregiver } from "../../types";

const emptyForm: Omit<Caregiver, "id"> = {
  name: "",
  phone: "",
  email: "",
  relationship: "family",
};

const ProfilePage: React.FC = () => {
  const { user, updateCaregivers, t } = useApp();
  const [form, setForm] = useState(emptyForm);

  if (!user) {
    return (
      <div className="p-6 text-white">Please log in to manage profile.</div>
    );
  }

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

// handle add update dfro email feature to woork
  const handleAdd = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!form.name.trim()) return;

  if (!form.email.trim()) {
    alert("Caregiver email is required to receive missed-dose alerts.");
    return;
  }

  const newCaregiver: Caregiver = {
    id: Math.random().toString(36).slice(2),
    ...form,
  };

  const newList = [...(user.caregivers || []), newCaregiver];
  await updateCaregivers(newList);
  setForm(emptyForm);
};
// updation finished to make the email mandatory 


  const handleDelete = async (id: string) => {
    const newList = (user.caregivers || []).filter((c) => c.id !== id);
    await updateCaregivers(newList);
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-gray-900 text-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">
        {t("profile") || "Profile & Caregivers"}
      </h2>

      <form onSubmit={handleAdd} className="space-y-3 mb-6">
        <input
          type="text"
          placeholder="Caregiver name"
          value={form.name}
          onChange={(e) => handleChange("name", e.target.value)}
          className="w-full border border-gray-600 bg-gray-800 p-2 rounded"
          required
        />
        <input
          type="tel"
          placeholder="Phone (optional)"
          value={form.phone}
          onChange={(e) => handleChange("phone", e.target.value)}
          className="w-full border border-gray-600 bg-gray-800 p-2 rounded"
        />
        <input
           type="email"
           placeholder="Email (required for alerts)"
           value={form.email}
           onChange={(e) => handleChange("email", e.target.value)}
           className="w-full border border-gray-600 bg-gray-800 p-2 rounded"
           required
        />
        <select
          value={form.relationship}
          onChange={(e) => handleChange("relationship", e.target.value)}
          className="w-full border border-gray-600 bg-gray-800 p-2 rounded"
        >
          <option value="family">Family</option>
          <option value="doctor">Doctor</option>
          <option value="other">Other</option>
        </select>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded"
        >
          Add Caregiver
        </button>
      </form>

      <h3 className="font-semibold mb-2">
        Caregivers ({user.caregivers?.length || 0})
      </h3>
      <div className="space-y-2">
        {user.caregivers?.map((c) => (
          <div
            key={c.id}
            className="flex justify-between items-center bg-gray-800 p-3 rounded"
          >
            <div>
              <div className="font-medium">
                {c.name} ({c.relationship})
              </div>
              <div className="text-sm text-gray-400">
                {c.email}
                {c.phone && ` • ${c.phone}`}
              </div>
            </div>
            <button
              onClick={() => handleDelete(c.id)}
              className="text-red-400 text-sm"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfilePage;
