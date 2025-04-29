
// Interface for Ollama configuration
export interface OllamaConfig {
  endpoint: string; // The URL where Ollama is running (e.g., http://localhost:11434)
  model: string;    // The model to use (e.g., 'llama2', 'mistral', etc.)
  temperature?: number; // Controls randomness (default: 0.7)
  contextWindow?: number; // Maximum context window (depends on model)
}

let ollamaConfigInstance: OllamaConfig | null = null;

// Initialize the Ollama service with configuration
export const initializeOllama = (config: OllamaConfig): boolean => {
  try {
    console.log('Initializing Ollama with model:', config.model);
    ollamaConfigInstance = config;
    return true;
  } catch (error) {
    console.error('Failed to initialize Ollama:', error);
    return false;
  }
};

// Check if Ollama is connected
export const isOllamaAvailable = async (): Promise<boolean> => {
  if (!ollamaConfigInstance) return false;
  
  try {
    // Ping the Ollama service to check availability
    const response = await fetch(`${ollamaConfigInstance.endpoint}/api/health`, {
      method: 'GET',
    });
    
    return response.ok;
  } catch (error) {
    console.error('Ollama health check failed:', error);
    return false;
  }
};

// Generate a patient summary using Ollama
export const generatePatientSummaryWithOllama = async (
  patientInfo: any, 
  visits: any[],
  prompt: string
): Promise<string> => {
  if (!ollamaConfigInstance) {
    throw new Error('Ollama not initialized');
  }
  
  try {
    console.log('Generating patient summary with Ollama');
    
    // Prepare the context with patient data
    const context = {
      patientInfo,
      visits,
      prompt
    };
    
    // In a real implementation, this would make an API call to Ollama
    // For now, return a mock response
    if (prompt.toLowerCase().includes('last 3 visits')) {
      // Use the existing function for now as a fallback
      const { generatePatientSummary } = await import('./aiSummaryService');
      return generatePatientSummary(patientInfo, 3);
    }
    
    return `This is a simulated response from Ollama using model ${ollamaConfigInstance.model}.\n\nThe actual implementation would send the patient data securely to your local Ollama instance and return a generated response based on the medical records without exposing PHI externally.`;
  } catch (error) {
    console.error('Error generating summary with Ollama:', error);
    throw error;
  }
};

// Answer a clinical question using Ollama
export const answerClinicalQuestionWithOllama = async (
  patientInfo: any,
  question: string
): Promise<string> => {
  if (!ollamaConfigInstance) {
    throw new Error('Ollama not initialized');
  }
  
  try {
    console.log('Answering clinical question with Ollama:', question);
    
    // In a real implementation, this would make an API call to Ollama
    // For now, use the existing service as a fallback
    const { answerClinicalQuestion } = await import('./aiSummaryService');
    return answerClinicalQuestion(patientInfo, question);
  } catch (error) {
    console.error('Error answering question with Ollama:', error);
    throw error;
  }
};

// Get current Ollama configuration
export const getOllamaConfig = (): OllamaConfig | null => {
  return ollamaConfigInstance;
};
