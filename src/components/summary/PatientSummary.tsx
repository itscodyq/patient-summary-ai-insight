
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Patient } from '@/types/patient';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { RefreshCcw, Search } from 'lucide-react';
import { formatDate } from '@/utils/dateUtils';
import { generatePatientSummary, answerClinicalQuestion } from '@/services/aiSummaryService';

interface PatientSummaryProps {
  patient: Patient;
}

const PatientSummary: React.FC<PatientSummaryProps> = ({ patient }) => {
  const [summary, setSummary] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [queryResult, setQueryResult] = useState<string | null>(null);
  
  const handleGenerateSummary = () => {
    setIsLoading(true);
    // Simulate AI processing time
    setTimeout(() => {
      const generatedSummary = generatePatientSummary(patient);
      setSummary(generatedSummary);
      setIsLoading(false);
    }, 1000);
  };
  
  const handleAskQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setIsLoading(true);
    // Simulate AI processing time
    setTimeout(() => {
      const result = answerClinicalQuestion(patient, query);
      setQueryResult(result);
      setIsLoading(false);
    }, 1000);
  };
  
  return (
    <Card className="w-full">
      <CardHeader className="bg-gray-50 border-b">
        <CardTitle className="text-xl flex items-center justify-between">
          <div>
            <span className="text-medical-700">{patient.firstName} {patient.lastName}</span>
            <span className="text-gray-500 text-sm ml-2">
              DOB: {formatDate(patient.dateOfBirth)} • MRN: {patient.mrn}
            </span>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleGenerateSummary}
            disabled={isLoading}
          >
            {isLoading ? (
              <RefreshCcw className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <RefreshCcw className="h-4 w-4 mr-2" />
            )}
            Generate Summary
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <Tabs defaultValue="summary" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="summary">Patient Summary</TabsTrigger>
            <TabsTrigger value="query">Ask Question</TabsTrigger>
          </TabsList>
          <TabsContent value="summary" className="mt-4">
            <ScrollArea className="h-[500px] rounded-md border p-4">
              {summary ? (
                <pre className="whitespace-pre-wrap font-sans text-sm">{summary}</pre>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500 mb-4">No summary generated yet</p>
                  <Button onClick={handleGenerateSummary} disabled={isLoading}>
                    {isLoading ? 'Generating...' : 'Generate Patient Summary'}
                  </Button>
                </div>
              )}
            </ScrollArea>
          </TabsContent>
          <TabsContent value="query" className="mt-4">
            <form onSubmit={handleAskQuestion} className="mb-4">
              <div className="flex gap-2">
                <Input
                  placeholder="E.g., Provide a summary of the last 3 visits"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="flex-1"
                />
                <Button type="submit" disabled={isLoading || !query.trim()}>
                  <Search className="h-4 w-4 mr-2" />
                  {isLoading ? 'Searching...' : 'Search'}
                </Button>
              </div>
            </form>
            <ScrollArea className="h-[450px] rounded-md border p-4">
              {queryResult ? (
                <pre className="whitespace-pre-wrap font-sans text-sm">{queryResult}</pre>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <p>Ask a question about the patient's medical history.</p>
                  <p className="text-sm mt-2">Examples:</p>
                  <ul className="text-sm list-disc text-left mx-auto max-w-md mt-2">
                    <li>Provide a summary of the last 3 visits</li>
                    <li>What medications is the patient currently taking?</li>
                    <li>What were the recent lab results?</li>
                    <li>List all diagnoses for this patient</li>
                  </ul>
                </div>
              )}
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default PatientSummary;
