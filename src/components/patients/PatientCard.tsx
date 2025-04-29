
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Patient } from '@/types/patient';
import { Badge } from '@/components/ui/badge';
import { calculateAge } from '@/utils/dateUtils';

interface PatientCardProps {
  patient: Patient;
  isSelected: boolean;
  onClick: () => void;
}

const PatientCard: React.FC<PatientCardProps> = ({ patient, isSelected, onClick }) => {
  return (
    <Card 
      className={`cursor-pointer transition-all duration-200 ${
        isSelected 
          ? 'border-medical-500 ring-1 ring-medical-500' 
          : 'hover:border-medical-300'
      }`}
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium text-lg">{patient.firstName} {patient.lastName}</h3>
            <div className="text-sm text-gray-500">
              <p>DOB: {new Date(patient.dateOfBirth).toLocaleDateString()} ({calculateAge(patient.dateOfBirth)})</p>
              <p>MRN: {patient.mrn}</p>
            </div>
          </div>
          <Badge variant={isSelected ? "default" : "outline"} className={isSelected ? "bg-medical-500" : ""}>
            {isSelected ? "Selected" : "Select"}
          </Badge>
        </div>
        {patient.chronicConditions.length > 0 && (
          <div className="mt-2">
            <p className="text-xs text-gray-500 mb-1">Chronic Conditions:</p>
            <div className="flex flex-wrap gap-1">
              {patient.chronicConditions.map((condition, idx) => (
                <Badge key={idx} variant="secondary" className="text-xs">{condition}</Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PatientCard;
