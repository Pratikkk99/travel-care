export enum UserRole {
  PATIENT = 'PATIENT',
  PROVIDER = 'PROVIDER',
  ADMIN = 'ADMIN',
  GUEST = 'GUEST'
}

export enum AppointmentStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
}

export interface Clinic {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  type: 'Dialysis' | 'Thalassemia' | 'Multi-Specialty';
  rating: number;
  reviewCount: number;
  pricePerSession: number; // In INR
  description: string;
  amenities: string[];
  imageUrl: string;
  verified: boolean;
  latitude?: number;
  longitude?: number;
}

export interface Appointment {
  id: string;
  clinicId: string;
  patientId: string;
  date: string; // ISO date string
  timeSlot: string;
  status: AppointmentStatus;
  medicalReportSummary?: string;
  documentName?: string; // Added to track the specific file uploaded
  notes?: string;
}

export interface Review {
  id: string;
  clinicId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface ChartData {
  name: string;
  value: number;
}