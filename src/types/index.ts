export interface Caregiver {
  id: string;
  name: string;
  phone?: string;
  email?: string;
  relationship: 'family' | 'doctor' | 'other';
}

export interface User {
  id: string;
  email: string;
  name: string;
  language: 'en' | 'hi';
  caregivers: Caregiver[];   // <--- new field
}

export interface Medicine {
  id: string;
  name: string;
  dosage: string;
  times: string[];
  foodInstruction: 'before' | 'after' | 'with' | 'empty';
  duration: number;
  daysLeft: number;
  createdAt: string;
}

export interface DoseRecord {
  id: string;
  medicineId: string;
  scheduledTime: string;
  actualTime?: string;
  status: 'taken' | 'missed' | 'pending';
  date: string;
  alertSent?: boolean;
}

export interface Pharmacy {
  id: string;
  name: string;
  address: string;
  distance: number;
  deliveryAvailable: boolean;
  isJanAushadhi: boolean;
  phone: string;
}

export interface GenericMedicine {
  brandName: string;
  genericName: string;
  price: number;
  janAushadhiPrice?: number;
  savings: number;
}

export interface PrescriptionData {
  id: string;
  imageUrl: string;
  extractedText: string;
  instructions: string;
  medicines: Medicine[];
  uploadedAt: string;
}