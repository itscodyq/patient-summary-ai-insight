
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { patients } from '@/data/mockData';
import PatientCard from '@/components/patients/PatientCard';
import PatientSummary from '@/components/summary/PatientSummary';
import { Patient } from '@/types/patient';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  
  const filteredPatients = patients.filter(patient => {
    const fullName = `${patient.firstName} ${patient.lastName}`.toLowerCase();
    const mrn = patient.mrn.toLowerCase();
    const query = searchQuery.toLowerCase();
    
    return fullName.includes(query) || mrn.includes(query);
  });
  
  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Patient Summary AI</h1>
        <p className="text-gray-600">
          Use AI to quickly review patient history and get clinical insights
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-xl">Patient List</CardTitle>
              <div className="relative mt-2">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input 
                  placeholder="Search patients by name or MRN..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {filteredPatients.length === 0 ? (
                  <p className="text-center py-4 text-gray-500">No patients found</p>
                ) : (
                  filteredPatients.map(patient => (
                    <PatientCard 
                      key={patient.id} 
                      patient={patient} 
                      isSelected={selectedPatient?.id === patient.id}
                      onClick={() => setSelectedPatient(patient)}
                    />
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-2">
          {selectedPatient ? (
            <PatientSummary patient={selectedPatient} />
          ) : (
            <Card className="flex items-center justify-center h-full min-h-[400px]">
              <CardContent className="text-center p-6">
                <div className="rounded-full bg-gray-100 p-4 mx-auto mb-4 w-16 h-16 flex items-center justify-center">
                  <Search className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium mb-2">Select a Patient</h3>
                <p className="text-gray-500 max-w-md mx-auto">
                  Choose a patient from the list to view their summary or ask questions about their medical history.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Index;
