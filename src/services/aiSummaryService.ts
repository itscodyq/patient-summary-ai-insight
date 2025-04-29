
import { Patient, Visit } from '../types/patient';
import { visits } from '../data/mockData';

export const generatePatientSummary = (patient: Patient, numVisits: number = 3): string => {
  // In a real implementation, this would use an AI service
  // Here we're mocking the AI-generated summary
  
  const patientVisits = visits
    .filter(visit => visit.patientId === patient.id)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, numVisits);
  
  if (patientVisits.length === 0) {
    return `No recent visits found for ${patient.firstName} ${patient.lastName}.`;
  }
  
  const mostRecentVisit = patientVisits[0];
  
  // Create a summary based on the mock data
  let summary = `Patient Summary for ${patient.firstName} ${patient.lastName} (DOB: ${formatDate(patient.dateOfBirth)}, MRN: ${patient.mrn}):\n\n`;
  
  summary += `Chronic Conditions: ${patient.chronicConditions.join(', ')}\n`;
  summary += `Allergies: ${patient.allergies.join(', ')}\n\n`;
  
  summary += `Last ${patientVisits.length} visit${patientVisits.length > 1 ? 's' : ''}:\n`;
  
  patientVisits.forEach((visit, index) => {
    summary += `\n--- Visit ${index + 1}: ${formatDate(visit.date)} (${visit.visitType}) ---\n`;
    summary += `Provider: ${visit.provider}\n`;
    summary += `Chief Complaint: ${visit.chiefComplaint}\n`;
    summary += `HPI: ${visit.hpi}\n`;
    
    if (visit.diagnoses.length > 0) {
      summary += `Diagnoses: ${visit.diagnoses.map(d => `${d.description} (${d.code})`).join(', ')}\n`;
    }
    
    const completedOrders = visit.orders.filter(order => order.status === 'completed');
    if (completedOrders.length > 0) {
      summary += `Completed Orders:\n`;
      completedOrders.forEach(order => {
        summary += `  - ${order.name}: ${order.results || 'No results recorded'}\n`;
      });
    }
    
    const activePrescriptions = visit.prescriptions.filter(rx => rx.status === 'active');
    if (activePrescriptions.length > 0) {
      summary += `Active Medications:\n`;
      activePrescriptions.forEach(rx => {
        summary += `  - ${rx.name} ${rx.dosage}, ${rx.frequency}\n`;
      });
    }
    
    const discontinuedPrescriptions = visit.prescriptions.filter(rx => rx.status === 'discontinued');
    if (discontinuedPrescriptions.length > 0) {
      summary += `Discontinued Medications:\n`;
      discontinuedPrescriptions.forEach(rx => {
        summary += `  - ${rx.name} ${rx.dosage}\n`;
      });
    }
    
    if (visit.vitalSigns) {
      const vs = visit.vitalSigns;
      const vitalsList = [];
      if (vs.bloodPressure) vitalsList.push(`BP: ${vs.bloodPressure}`);
      if (vs.heartRate) vitalsList.push(`HR: ${vs.heartRate}`);
      if (vs.temperature) vitalsList.push(`Temp: ${vs.temperature}`);
      if (vs.oxygenSaturation) vitalsList.push(`O2: ${vs.oxygenSaturation}`);
      
      if (vitalsList.length > 0) {
        summary += `Vitals: ${vitalsList.join(', ')}\n`;
      }
    }
  });
  
  return summary;
};

export const answerClinicalQuestion = (patient: Patient, question: string): string => {
  // In a real implementation, this would use an AI service
  // Here we're mocking the AI response to clinical questions
  
  question = question.toLowerCase().trim();
  const patientName = `${patient.firstName} ${patient.lastName}`;
  
  // Pattern match some common questions
  if (question.includes('last 3 visits') || question.includes('recent visits')) {
    return generatePatientSummary(patient, 3);
  }
  
  if (question.includes('medication') || question.includes('prescription')) {
    const patientVisits = visits
      .filter(visit => visit.patientId === patient.id)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    if (patientVisits.length === 0) {
      return `No medication information found for ${patientName}.`;
    }
    
    const allMeds = new Map();
    
    patientVisits.forEach(visit => {
      visit.prescriptions.forEach(rx => {
        if (!allMeds.has(rx.name) || new Date(rx.startDate) > new Date(allMeds.get(rx.name).startDate)) {
          allMeds.set(rx.name, rx);
        }
      });
    });
    
    const activeMeds = Array.from(allMeds.values()).filter(rx => rx.status === 'active');
    
    if (activeMeds.length === 0) {
      return `${patientName} currently has no active medications.`;
    }
    
    let response = `${patientName}'s current medications:\n\n`;
    activeMeds.forEach(med => {
      response += `- ${med.name} ${med.dosage}, ${med.frequency} (started ${formatDate(med.startDate)})\n`;
    });
    
    return response;
  }
  
  if (question.includes('lab') || question.includes('test') || question.includes('result')) {
    const patientVisits = visits
      .filter(visit => visit.patientId === patient.id)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    if (patientVisits.length === 0) {
      return `No lab results found for ${patientName}.`;
    }
    
    const recentLabs = patientVisits
      .flatMap(visit => visit.orders.filter(order => 
        order.type === 'Laboratory' && 
        order.status === 'completed' &&
        order.results
      ))
      .slice(0, 5); // Get the 5 most recent lab results
    
    if (recentLabs.length === 0) {
      return `No recent completed lab results found for ${patientName}.`;
    }
    
    let response = `${patientName}'s recent lab results:\n\n`;
    recentLabs.forEach(lab => {
      response += `- ${lab.name}: ${lab.results} (completed on ${lab.completedDate ? formatDate(lab.completedDate) : 'unknown date'})\n`;
    });
    
    return response;
  }
  
  if (question.includes('diagnosis') || question.includes('diagnoses') || question.includes('conditions')) {
    const chronicConditions = patient.chronicConditions;
    
    const patientVisits = visits
      .filter(visit => visit.patientId === patient.id)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    const recentDiagnoses = patientVisits
      .flatMap(visit => visit.diagnoses)
      .filter(diagnosis => !diagnosis.isChronic);
    
    let response = `${patientName}'s conditions:\n\n`;
    
    if (chronicConditions.length > 0) {
      response += `Chronic conditions:\n`;
      chronicConditions.forEach(condition => {
        response += `- ${condition}\n`;
      });
      response += `\n`;
    }
    
    if (recentDiagnoses.length > 0) {
      response += `Recent diagnoses:\n`;
      recentDiagnoses.slice(0, 5).forEach(diagnosis => {
        response += `- ${diagnosis.description} (${diagnosis.code})\n`;
      });
    }
    
    if (chronicConditions.length === 0 && recentDiagnoses.length === 0) {
      response = `No diagnoses found for ${patientName}.`;
    }
    
    return response;
  }
  
  return `I can provide summaries of ${patientName}'s recent visits, medications, lab results, and diagnoses. Please ask a more specific question about their medical history.`;
};

function formatDate(dateString: string): string {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
}
