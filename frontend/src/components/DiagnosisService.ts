import { classifyImage } from "@/utils/mockClassifier";

export interface DiagnosisResult {
  id: string;
  date: string;
  diagnosisDate: string;
  result: {
    isColoboma: boolean;
    confidence: number;
  };
  imageURL?: string;
}

export const performDiagnosis = async (imageFile: File): Promise<DiagnosisResult> => {
  // Get the classification result from the mock classifier
  const result = await classifyImage(imageFile);
  
  // Create a unique ID for this diagnosis
  const id = Math.random().toString(36).substring(2, 15);
  
  // Create a URL for the image preview
  const imageURL = URL.createObjectURL(imageFile);
  
  // Get the current date
  const date = new Date().toISOString();
  
  // Get diagnosis date (using today's date as a placeholder)
  const diagnosisDate = new Date().toLocaleDateString();
  
  // Create the diagnosis result
  const diagnosisResult: DiagnosisResult = {
    id,
    date,
    diagnosisDate,
    result,
    imageURL
  };
  
  // Save to medical history in localStorage
  saveToMedicalHistory(diagnosisResult);
  
  return diagnosisResult;
};

const saveToMedicalHistory = (diagnosis: DiagnosisResult) => {
  // Check if user is logged in
  const userString = localStorage.getItem("user");
  if (!userString) {
    console.error("Cannot save diagnosis: User not logged in");
    return;
  }
  
  // Get existing history or create a new array
  const existingHistoryString = localStorage.getItem("medicalHistory");
  const existingHistory = existingHistoryString 
    ? JSON.parse(existingHistoryString) 
    : [];
  
  // Add new diagnosis to the beginning of the array
  existingHistory.unshift(diagnosis);
  
  // Save back to localStorage
  localStorage.setItem("medicalHistory", JSON.stringify(existingHistory));
};
