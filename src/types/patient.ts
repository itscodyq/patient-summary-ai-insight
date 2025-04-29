
export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  mrn: string;
  insurance: string;
  primaryPhysician: string;
  allergies: string[];
  chronicConditions: string[];
}

export interface Visit {
  id: string;
  patientId: string;
  date: string;
  provider: string;
  visitType: string;
  chiefComplaint: string;
  hpi: string;
  diagnoses: Diagnosis[];
  orders: Order[];
  prescriptions: Prescription[];
  vitalSigns: VitalSigns;
}

export interface Diagnosis {
  code: string;
  description: string;
  isChronic: boolean;
}

export interface Order {
  id: string;
  type: string;
  name: string;
  status: 'ordered' | 'completed' | 'cancelled';
  orderedDate: string;
  completedDate?: string;
  results?: string;
}

export interface Prescription {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  startDate: string;
  endDate?: string;
  status: 'active' | 'discontinued' | 'completed';
}

export interface VitalSigns {
  temperature?: string;
  heartRate?: string;
  bloodPressure?: string;
  respiratoryRate?: string;
  oxygenSaturation?: string;
  height?: string;
  weight?: string;
  bmi?: string;
}
