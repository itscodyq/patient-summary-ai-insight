
import { Patient, Visit } from '../types/patient';

export const patients: Patient[] = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Smith',
    dateOfBirth: '1975-05-15',
    gender: 'Male',
    mrn: 'MRN12345',
    insurance: 'Blue Cross Blue Shield',
    primaryPhysician: 'Dr. Sarah Johnson',
    allergies: ['Penicillin', 'Sulfa Drugs'],
    chronicConditions: ['Hypertension', 'Type 2 Diabetes']
  },
  {
    id: '2',
    firstName: 'Emily',
    lastName: 'Jones',
    dateOfBirth: '1988-11-30',
    gender: 'Female',
    mrn: 'MRN54321',
    insurance: 'Aetna',
    primaryPhysician: 'Dr. Robert Chen',
    allergies: ['Latex'],
    chronicConditions: ['Asthma', 'Migraine']
  },
  {
    id: '3',
    firstName: 'Michael',
    lastName: 'Davis',
    dateOfBirth: '1962-03-22',
    gender: 'Male',
    mrn: 'MRN78965',
    insurance: 'Medicare',
    primaryPhysician: 'Dr. Sarah Johnson',
    allergies: ['Codeine', 'Contrast Dye'],
    chronicConditions: ['Coronary Artery Disease', 'Osteoarthritis']
  }
];

export const visits: Visit[] = [
  {
    id: 'v1',
    patientId: '1',
    date: '2023-11-15',
    provider: 'Dr. Sarah Johnson',
    visitType: 'Follow-up',
    chiefComplaint: 'Routine diabetes check',
    hpi: 'Patient reports generally feeling well. Has been compliant with medications and checking blood glucose daily. Reports average fasting glucose of 120-140 mg/dL. Denies polyuria, polydipsia, or polyphagia. No new symptoms reported.',
    diagnoses: [
      { code: 'E11.9', description: 'Type 2 diabetes mellitus without complications', isChronic: true },
      { code: 'I10', description: 'Essential hypertension', isChronic: true }
    ],
    orders: [
      { id: 'o1', type: 'Laboratory', name: 'Hemoglobin A1c', status: 'completed', orderedDate: '2023-11-15', completedDate: '2023-11-17', results: '7.2%' },
      { id: 'o2', type: 'Laboratory', name: 'Comprehensive Metabolic Panel', status: 'completed', orderedDate: '2023-11-15', completedDate: '2023-11-17', results: 'Within normal limits except for glucose: 135 mg/dL' }
    ],
    prescriptions: [
      { id: 'p1', name: 'Metformin', dosage: '500mg', frequency: 'twice daily', startDate: '2022-01-10', status: 'active' },
      { id: 'p2', name: 'Lisinopril', dosage: '10mg', frequency: 'once daily', startDate: '2022-01-10', status: 'active' }
    ],
    vitalSigns: {
      temperature: '98.6°F',
      heartRate: '72 bpm',
      bloodPressure: '132/84 mmHg',
      respiratoryRate: '16 rpm',
      oxygenSaturation: '98%',
      height: '5\'10"',
      weight: '190 lbs',
      bmi: '27.3'
    }
  },
  {
    id: 'v2',
    patientId: '1',
    date: '2023-08-20',
    provider: 'Dr. Robert Chen',
    visitType: 'Urgent Care',
    chiefComplaint: 'Sore throat and fever',
    hpi: 'Patient reports 3-day history of sore throat, fever up to 101°F, and general malaise. Denies cough or shortness of breath. Has been taking Tylenol for fever with some relief.',
    diagnoses: [
      { code: 'J02.9', description: 'Acute pharyngitis, unspecified', isChronic: false }
    ],
    orders: [
      { id: 'o3', type: 'Laboratory', name: 'Rapid Strep Test', status: 'completed', orderedDate: '2023-08-20', completedDate: '2023-08-20', results: 'Positive' }
    ],
    prescriptions: [
      { id: 'p3', name: 'Amoxicillin', dosage: '500mg', frequency: 'three times daily for 10 days', startDate: '2023-08-20', endDate: '2023-08-30', status: 'completed' }
    ],
    vitalSigns: {
      temperature: '100.8°F',
      heartRate: '88 bpm',
      bloodPressure: '128/82 mmHg',
      respiratoryRate: '18 rpm',
      oxygenSaturation: '97%'
    }
  },
  {
    id: 'v3',
    patientId: '1',
    date: '2023-05-05',
    provider: 'Dr. Sarah Johnson',
    visitType: 'Annual Physical',
    chiefComplaint: 'Annual wellness visit',
    hpi: 'Patient presents for annual physical examination. Reports overall good health with controlled hypertension and diabetes. Has been exercising 3 times weekly. Diet remains consistent. No new concerns reported.',
    diagnoses: [
      { code: 'E11.9', description: 'Type 2 diabetes mellitus without complications', isChronic: true },
      { code: 'I10', description: 'Essential hypertension', isChronic: true },
      { code: 'Z00.00', description: 'Encounter for general adult medical examination without abnormal findings', isChronic: false }
    ],
    orders: [
      { id: 'o4', type: 'Laboratory', name: 'Lipid Panel', status: 'completed', orderedDate: '2023-05-05', completedDate: '2023-05-08', results: 'Total cholesterol: 185 mg/dL, LDL: 110 mg/dL, HDL: 45 mg/dL, Triglycerides: 150 mg/dL' },
      { id: 'o5', type: 'Imaging', name: 'Chest X-ray', status: 'completed', orderedDate: '2023-05-05', completedDate: '2023-05-05', results: 'Clear lung fields, no acute findings' }
    ],
    prescriptions: [
      { id: 'p4', name: 'Atorvastatin', dosage: '20mg', frequency: 'once daily at bedtime', startDate: '2023-05-05', status: 'active' }
    ],
    vitalSigns: {
      temperature: '98.2°F',
      heartRate: '70 bpm',
      bloodPressure: '130/80 mmHg',
      respiratoryRate: '16 rpm',
      oxygenSaturation: '99%',
      height: '5\'10"',
      weight: '188 lbs',
      bmi: '27.0'
    }
  },
  {
    id: 'v4',
    patientId: '2',
    date: '2023-10-12',
    provider: 'Dr. Robert Chen',
    visitType: 'Follow-up',
    chiefComplaint: 'Asthma check',
    hpi: 'Patient reports mild increase in shortness of breath with exertion over the past month. Has been using rescue inhaler about twice weekly. Denies nocturnal symptoms. No recent respiratory infections.',
    diagnoses: [
      { code: 'J45.909', description: 'Unspecified asthma, uncomplicated', isChronic: true }
    ],
    orders: [
      { id: 'o6', type: 'Procedure', name: 'Spirometry', status: 'completed', orderedDate: '2023-10-12', completedDate: '2023-10-12', results: 'FEV1: 85% predicted, FVC: 90% predicted' }
    ],
    prescriptions: [
      { id: 'p5', name: 'Albuterol', dosage: '90mcg', frequency: '2 puffs every 4-6 hours as needed', startDate: '2022-03-15', status: 'active' },
      { id: 'p6', name: 'Fluticasone', dosage: '110mcg', frequency: '2 puffs twice daily', startDate: '2023-10-12', status: 'active' }
    ],
    vitalSigns: {
      temperature: '98.4°F',
      heartRate: '76 bpm',
      bloodPressure: '118/76 mmHg',
      respiratoryRate: '18 rpm',
      oxygenSaturation: '97%'
    }
  }
];
