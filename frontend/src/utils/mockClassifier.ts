
/**
 * This is a mock implementation of an image classifier.
 * In a real application, this would be replaced with an actual API call
 * to a backend service that performs the image analysis.
 */

interface ClassificationResult {
  isColoboma: boolean;
  confidence: number;
}

export const classifyImage = (imageFile: File): Promise<ClassificationResult> => {
  return new Promise((resolve) => {
    // Simulate an API call delay
    setTimeout(() => {
      // For testing purposes, we'll use the image name to determine the result
      // In a real application, this would use actual image analysis
      const fileName = imageFile.name.toLowerCase();
      
      // Images with "coloboma" in the name will be detected as positive
      const isColoboma = fileName.includes("coloboma");
      
      // Generate a random confidence score between 70-99%
      const minConfidence = isColoboma ? 80 : 70;
      const maxConfidence = isColoboma ? 99 : 95;
      const confidence = minConfidence + Math.random() * (maxConfidence - minConfidence);
      
      resolve({
        isColoboma,
        confidence: Math.round(confidence)
      });
    }, 2000); // 2 second delay to simulate processing
  });
};
