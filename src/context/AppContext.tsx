// import React, {
//   createContext,
//   useContext,
//   useState,
//   useEffect,
//   ReactNode,
// } from "react";
// import { User, Medicine, DoseRecord, Caregiver } from "../types";
// import { mockMedicines, mockDoseRecords, translations } from "../data/mockData";
// const API_BASE = "http://localhost:5000/api";

// interface AppContextType {
//   user: User | null;
//   setUser: (user: User | null) => void;
//   medicines: Medicine[];
//   setMedicines: (medicines: Medicine[]) => void;
//   doseRecords: DoseRecord[];
//   setDoseRecords: (records: DoseRecord[]) => void;
//   language: "en" | "hi";
//   setLanguage: (language: "en" | "hi") => void;
//   t: (key: string) => string;
//   isAuthenticated: boolean;
//   login: (email: string, password: string) => Promise<boolean>;
//   signup: (name: string, email: string, password: string) => Promise<boolean>;
//   logout: () => void;
//   addMedicine: (medicine: Omit<Medicine, "id" | "createdAt">) => void;
//   markDose: (
//     medicineId: string,
//     time: string,
//     status: "taken" | "missed"
//   ) => void;
//   getAdherenceScore: () => number;
//   getTodaysDoses: () => {
//     medicine: Medicine;
//     time: string;
//     status: "taken" | "missed" | "pending";
//   }[];
//   updateCaregivers: (caregivers: Caregiver[]) => Promise<void>; // NEW
//   showSignup: boolean;
//   setShowSignup: (show: boolean) => void;
// }

// const AppContext = createContext<AppContextType | undefined>(undefined);

// export const useApp = () => {
//   const context = useContext(AppContext);
//   if (context === undefined) {
//     throw new Error("useApp must be used within an AppProvider");
//   }
//   return context;
// };

// interface AppProviderProps {
//   children: ReactNode;
// }

// export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
//   const [user, setUser] = useState<User | null>(null);
//   // ✅ REAL EMPTY STATE

//   // fix 1 to keep the data in local storage: const [medicines, setMedicines] = useState<Medicine[]>([]);
//   // const [doseRecords, setDoseRecords] = useState<DoseRecord[]>([]);
//   const [medicines, setMedicines] = useState<Medicine[]>(() => {
//   const saved = localStorage.getItem("mediassist_medicines");
//   return saved ? JSON.parse(saved) : [];
// });

// const [doseRecords, setDoseRecords] = useState<DoseRecord[]>(() => {
//   const saved = localStorage.getItem("mediassist_doseRecords");
//   return saved ? JSON.parse(saved) : [];
// });

//   const [language, setLanguage] = useState<"en" | "hi">("en");
//   const [showSignup, setShowSignup] = useState(false);

//   const isAuthenticated = !!user;

//   useEffect(() => {
//     const storedUser = localStorage.getItem("mediassist_user");
//     if (storedUser) {
//       const userData = JSON.parse(storedUser);
//       setUser(userData);
//       setLanguage(userData.language || "en");
//     }
//   }, []);

//   useEffect(() => {
//     localStorage.setItem("mediassist_medicines", JSON.stringify(medicines));
//   }, [medicines]);

//   useEffect(() => {
//     localStorage.setItem("mediassist_doseRecords", JSON.stringify(doseRecords));
//   }, [doseRecords]);



//   const t = (key: string): string => {
//     return translations[language][key as keyof typeof translations.en] || key;
//   };

//   const login = async (email: string, password: string): Promise<boolean> => {
//     try {
//       const res = await fetch(`${API_BASE}/login`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });

//       if (!res.ok) return false;

//       const data = await res.json();
//       localStorage.setItem("mediassist_token", data.token);
//       localStorage.setItem("mediassist_user", JSON.stringify(data.user));
//       setUser(data.user);
//       setLanguage(data.user.language || "en");
//       return true;
//     } catch {
//       return false;
//     }
//   };

//   const signup = async (
//     name: string,
//     email: string,
//     password: string
//   ): Promise<boolean> => {
//     try {
//       const res = await fetch(`${API_BASE}/register`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ name, email, password }),
//       });

//       if (!res.ok) return false;

//       const data = await res.json();
//       localStorage.setItem("mediassist_token", data.token);
//       localStorage.setItem("mediassist_user", JSON.stringify(data.user));
//       setUser(data.user);
//       setLanguage(data.user.language || "en");
//       return true;
//     } catch {
//       return false;
//     }
//   };

//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem("mediassist_user");
//     localStorage.removeItem("mediassist_token");
//   };

//   const updateCaregivers = async (caregivers: Caregiver[]) => {
//     if (!user) return;

//     const token = localStorage.getItem("mediassist_token") || "";
//     const res = await fetch(`${API_BASE}/profile/caregivers`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify({ caregivers }),
//     });

//     if (res.ok) {
//       const data = await res.json();
//       const updatedUser = { ...user, caregivers: data.caregivers };
//       setUser(updatedUser);
//       localStorage.setItem("mediassist_user", JSON.stringify(updatedUser));
//     }
//   };

//   const addMedicine = (medicineData: Omit<Medicine, "id" | "createdAt">) => {
//     const newMedicine: Medicine = {
//       ...medicineData,
//       id: Math.random().toString(36).substr(2, 9),
//       createdAt: new Date().toISOString().split("T")[0],
//     };
//     setMedicines((prev) => [...prev, newMedicine]);
//   };

//   const markDose = (
//     medicineId: string,
//     time: string,
//     status: "taken" | "missed"
//   ) => {
//     const today = new Date().toISOString().split("T")[0];
//     const existingRecord = doseRecords.find(
//       (record) =>
//         record.medicineId === medicineId &&
//         record.scheduledTime === time &&
//         record.date === today
//     );

//     if (existingRecord) {
//       setDoseRecords((prev) =>
//         prev.map((record) =>
//           record.id === existingRecord.id
//             ? {
//                 ...record,
//                 status,
//                 actualTime:
//                   status === "taken"
//                     ? new Date().toTimeString().substr(0, 5)
//                     : undefined,
//               }
//             : record
//         )
//       );
//     } else {
//       const newRecord: DoseRecord = {
//         id: Math.random().toString(36).substr(2, 9),
//         medicineId,
//         scheduledTime: time,
//         actualTime:
//           status === "taken"
//             ? new Date().toTimeString().substr(0, 5)
//             : undefined,
//         status,
//         date: today,
//       };
//       setDoseRecords((prev) => [...prev, newRecord]);
//     }

//     // Update days left if dose is taken
//     if (status === "taken") {
//       setMedicines((prev) =>
//         prev.map((med) =>
//           med.id === medicineId && med.daysLeft > 0
//             ? { ...med, daysLeft: med.daysLeft - 1 / med.times.length }
//             : med
//         )
//       );
//     }
//   };

//   const getAdherenceScore = (): number => {
//     const today = new Date();
//     const sevenDaysAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

//     const recentRecords = doseRecords.filter((record) => {
//       const recordDate = new Date(record.date);
//       return recordDate >= sevenDaysAgo && recordDate <= today;
//     });

//     if (recentRecords.length === 0) return 100;

//     const takenCount = recentRecords.filter(
//       (record) => record.status === "taken"
//     ).length;
//     return Math.round((takenCount / recentRecords.length) * 100);
//   };

//   const getTodaysDoses = () => {
//     const today = new Date().toISOString().split("T")[0];
//     const todayRecords = doseRecords.filter((record) => record.date === today);

//     const result: {
//       medicine: Medicine;
//       time: string;
//       status: "taken" | "missed" | "pending";
//     }[] = [];

//     medicines.forEach((medicine) => {
//       medicine.times.forEach((time) => {
//         const record = todayRecords.find(
//           (r) => r.medicineId === medicine.id && r.scheduledTime === time
//         );
//         result.push({
//           medicine,
//           time,
//           status: record?.status || "pending",
//         });
//       });
//     });

//     return result.sort((a, b) => a.time.localeCompare(b.time));
//   };

//   return (
//     <AppContext.Provider
//       value={{
//         user,
//         setUser,
//         medicines,
//         setMedicines,
//         doseRecords,
//         setDoseRecords,
//         language,
//         setLanguage,
//         t,
//         isAuthenticated,
//         login,
//         signup,
//         logout,
//         addMedicine,
//         markDose,
//         getAdherenceScore,
//         getTodaysDoses,
//         updateCaregivers,
//         showSignup, // ← ADD THIS
//         setShowSignup, // ← ADD THIS         // NEW
//       }}
//     >
//       {children}
//     </AppContext.Provider>
//   );
// };


import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { User, Medicine, DoseRecord, Caregiver } from "../types";
import { translations } from "../data/mockData";






const API_BASE = "http://localhost:5000/api";

/* -------------------- TYPES -------------------- */

interface AppContextType {
  user: User | null;
  setUser: (user: User | null) => void;

  medicines: Medicine[];
  setMedicines: (medicines: Medicine[]) => void;

  doseRecords: DoseRecord[];
  setDoseRecords: (records: DoseRecord[]) => void;

  language: "en" | "hi";
  setLanguage: (language: "en" | "hi") => void;

  t: (key: string) => string;
  isAuthenticated: boolean;

  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;

  addMedicine: (medicine: Omit<Medicine, "id" | "createdAt">) => void;
  markDose: (
    medicineId: string,
    time: string,
    status: "taken" | "missed"
  ) => void;

  getAdherenceScore: () => number;
  getTodaysDoses: () => {
    medicine: Medicine;
    time: string;
    status: "taken" | "missed" | "pending";
  }[];

  updateCaregivers: (caregivers: Caregiver[]) => Promise<void>;

  showSignup: boolean;
  setShowSignup: (show: boolean) => void;
}

/* -------------------- CONTEXT -------------------- */

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

/* -------------------- PROVIDER -------------------- */

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [doseRecords, setDoseRecords] = useState<DoseRecord[]>([]);

  const [language, setLanguage] = useState<"en" | "hi">("en");
  const [showSignup, setShowSignup] = useState(false);

  const isAuthenticated = !!user;

  /* -------------------- STORAGE HELPERS -------------------- */

  const getMedicineKey = (userId: string) =>
    `mediassist_medicines_${userId}`;

  const getDoseKey = (userId: string) =>
    `mediassist_doseRecords_${userId}`;

  /* -------------------- LOAD USER ON REFRESH -------------------- */

  useEffect(() => {
    const storedUser = localStorage.getItem("mediassist_user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      setLanguage(userData.language || "en");
    }
  }, []);

  /* -------------------- LOAD USER-SCOPED DATA -------------------- */

  useEffect(() => {
    if (!user) {
      setMedicines([]);
      setDoseRecords([]);
      return;
    }

    const savedMedicines = localStorage.getItem(getMedicineKey(user.id));
    const savedDoseRecords = localStorage.getItem(getDoseKey(user.id));

    setMedicines(savedMedicines ? JSON.parse(savedMedicines) : []);
    setDoseRecords(savedDoseRecords ? JSON.parse(savedDoseRecords) : []);
  }, [user]);

  /* -------------------- SAVE USER-SCOPED DATA -------------------- */

  useEffect(() => {
    if (!user) return;
    localStorage.setItem(
      getMedicineKey(user.id),
      JSON.stringify(medicines)
    );
  }, [medicines, user]);

  useEffect(() => {
    if (!user) return;
    localStorage.setItem(
      getDoseKey(user.id),
      JSON.stringify(doseRecords)
    );
  }, [doseRecords, user]);

  /* -------------------- TRANSLATION -------------------- */

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key;
  };

  /* -------------------- AUTH -------------------- */

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const res = await fetch(`${API_BASE}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) return false;

      const data = await res.json();
      localStorage.setItem("mediassist_token", data.token);
      localStorage.setItem("mediassist_user", JSON.stringify(data.user));

      setUser(data.user);
      setLanguage(data.user.language || "en");
      return true;
    } catch {
      return false;
    }
  };

  const signup = async (
    name: string,
    email: string,
    password: string
  ): Promise<boolean> => {
    try {
      const res = await fetch(`${API_BASE}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (!res.ok) return false;

      const data = await res.json();
      localStorage.setItem("mediassist_token", data.token);
      localStorage.setItem("mediassist_user", JSON.stringify(data.user));

      setUser(data.user);
      setLanguage(data.user.language || "en");
      return true;
    } catch {
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setMedicines([]);
    setDoseRecords([]);
    localStorage.removeItem("mediassist_user");
    localStorage.removeItem("mediassist_token");
  };

  /* -------------------- CAREGIVERS -------------------- */

  const updateCaregivers = async (caregivers: Caregiver[]) => {
    if (!user) return;

    const token = localStorage.getItem("mediassist_token") || "";
    const res = await fetch(`${API_BASE}/profile/caregivers`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ caregivers }),
    });

    if (res.ok) {
      const data = await res.json();
      const updatedUser = { ...user, caregivers: data.caregivers };
      setUser(updatedUser);
      localStorage.setItem("mediassist_user", JSON.stringify(updatedUser));
    }
  };

  /* -------------------- MEDICINES -------------------- */

  const addMedicine = (medicineData: Omit<Medicine, "id" | "createdAt">) => {
    const newMedicine: Medicine = {
      ...medicineData,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString().split("T")[0],
    };
    setMedicines((prev) => [...prev, newMedicine]);
  };

  const markDose = (
    medicineId: string,
    time: string,
    status: "taken" | "missed"
  ) => {
    const today = new Date().toISOString().split("T")[0];

    const existingRecord = doseRecords.find(
      (r) =>
        r.medicineId === medicineId &&
        r.scheduledTime === time &&
        r.date === today
    );

    if (existingRecord) {
      setDoseRecords((prev) =>
        prev.map((r) =>
          r.id === existingRecord.id
            ? {
                ...r,
                status,
                actualTime:
                  status === "taken"
                    ? new Date().toTimeString().slice(0, 5)
                    : undefined,
              }
            : r
        )
      );
    } else {
      setDoseRecords((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          medicineId,
          scheduledTime: time,
          actualTime:
            status === "taken"
              ? new Date().toTimeString().slice(0, 5)
              : undefined,
          status,
          date: today,
        },
      ]);
    }
  };

//   const markDose = (
//   medicineId: string,
//   time: string,
//   status: "taken" | "missed"
// ) => {
//   if (!user) return;

//   const today = new Date().toISOString().split("T")[0];

//   const medicine = medicines.find((m) => m.id === medicineId);
//   const caregiverEmail = user.caregivers?.[0]?.email;

//   const existingRecord = doseRecords.find(
//     (r) =>
//       r.medicineId === medicineId &&
//       r.scheduledTime === time &&
//       r.date === today
//   );

//   // 🚨 MISSED DOSE → SEND EMAIL ONCE
//   if (
//     status === "missed" &&
//     medicine &&
//     caregiverEmail &&
//     !existingRecord?.alertSent
//   ) {
//   //   sendMissedDoseEmail({
//   //     caregiverEmail,
//   //     patientName: user.name,
//   //     medicineName: medicine.name,
//   //     scheduledTime: time,
//   //     date: today,
//   //   });
//   // }

//   if (existingRecord) {
//     setDoseRecords((prev) =>
//       prev.map((r) =>
//         r.id === existingRecord.id
//           ? {
//               ...r,
//               status,
//               actualTime:
//                 status === "taken"
//                   ? new Date().toTimeString().slice(0, 5)
//                   : undefined,
//               alertSent: r.alertSent || status === "missed",
//             }
//           : r
//       )
//     );
//   } else {
//     setDoseRecords((prev) => [
//       ...prev,
//       {
//         id: crypto.randomUUID(),
//         medicineId,
//         scheduledTime: time,
//         actualTime:
//           status === "taken"
//             ? new Date().toTimeString().slice(0, 5)
//             : undefined,
//         status,
//         date: today,
//         alertSent: status === "missed",
//       },
//     ]);
//   }
// };

  /* -------------------- ANALYTICS -------------------- */

  const getAdherenceScore = (): number => {
    if (doseRecords.length === 0) return 100;
    const taken = doseRecords.filter((r) => r.status === "taken").length;
    return Math.round((taken / doseRecords.length) * 100);
  };

  const getTodaysDoses = () => {
    const today = new Date().toISOString().split("T")[0];
    const todayRecords = doseRecords.filter((r) => r.date === today);

    const result: {
      medicine: Medicine;
      time: string;
      status: "taken" | "missed" | "pending";
    }[] = [];

    medicines.forEach((medicine) => {
      medicine.times.forEach((time) => {
        const record = todayRecords.find(
          (r) => r.medicineId === medicine.id && r.scheduledTime === time
        );
        result.push({
          medicine,
          time,
          status: record?.status || "pending",
        });
      });
    });

    return result.sort((a, b) => a.time.localeCompare(b.time));
  };

  /* -------------------- PROVIDER -------------------- */

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        medicines,
        setMedicines,
        doseRecords,
        setDoseRecords,
        language,
        setLanguage,
        t,
        isAuthenticated,
        login,
        signup,
        logout,
        addMedicine,
        markDose,
        getAdherenceScore,
        getTodaysDoses,
        updateCaregivers,
        showSignup,
        setShowSignup,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
