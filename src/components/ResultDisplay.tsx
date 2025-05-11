
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { toast } from '@/components/ui/use-toast';

interface DetectionResult {
  isColoboma: boolean;
  confidence: number;
  imageUrl: string | null;
  id?: string;
}

const ResultDisplay = () => {
  const [result, setResult] = useState<DetectionResult | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    // Check if we have an ID from the query parameter
    const params = new URLSearchParams(location.search);
    const resultId = params.get('id');
    
    if (resultId) {
      // We are viewing a historical result
      const historyString = localStorage.getItem("medicalHistory");
      if (historyString) {
        const history = JSON.parse(historyString);
        const historyItem = history.find((item: any) => item.id === resultId);
        
        if (historyItem) {
          // Convert from history format to our display format
          setResult({
            isColoboma: historyItem.result.isColoboma,
            confidence: historyItem.result.confidence,
            imageUrl: historyItem.imageURL,
            id: historyItem.id
          });
        } else {
          toast({
            title: "Record Not Found",
            description: "The requested diagnosis record could not be found.",
            variant: "destructive"
          });
          navigate('/medical-history');
        }
      }
    } else {
      // Get result from session storage (new diagnosis)
      const storedResult = sessionStorage.getItem('detectionResult');
      
      if (storedResult) {
        setResult(JSON.parse(storedResult));
      } else {
        // If no result found, redirect to upload page
        navigate('/upload');
      }
    }
  }, [navigate, location.search]);

  const handleTryAnother = () => {
    navigate('/upload');
  };

  const handleLearnMore = () => {
    navigate('/about');
  };

  const handleViewHistory = () => {
    navigate('/medical-history');
  };

  if (!result) {
    return (
      <div className="container-center">
        <Card className="p-8 text-center">
          <div className="animate-pulse-opacity">Loading results...</div>
        </Card>
      </div>
    );
  }

  return (
    <div className="container-center">
      <Card className="p-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Image preview section */}
          {result.imageUrl && (
            <div className="w-full md:w-1/3">
              <img 
                src={result.imageUrl} 
                alt="Analyzed eye image" 
                className="rounded-lg w-full h-auto object-cover max-h-72 md:max-h-96" 
              />
            </div>
          )}
          
          {/* Results section */}
          <div className={`w-full ${result.imageUrl ? 'md:w-2/3' : ''}`}>
            <div className={`text-center p-4 rounded-lg mb-6 ${
              result.isColoboma 
                ? 'bg-red-50 border border-red-200' 
                : 'bg-green-50 border border-green-200'
            }`}>
              <div className="text-4xl mb-2">
                {result.isColoboma ? '❗' : '✅'}
              </div>
              <h2 className="text-2xl font-bold mb-1">
                {result.isColoboma 
                  ? 'Coloboma Detected' 
                  : 'No Coloboma Detected'}
              </h2>
              
              <div className="mt-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>Confidence</span>
                  <span className="font-semibold">{result.confidence}%</span>
                </div>
                <Progress value={result.confidence} className={result.isColoboma ? 'bg-red-100' : 'bg-green-100'} />
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-bold mb-2">What does this mean?</h3>
              {result.isColoboma ? (
                <p>
                  The analysis suggests the image shows signs of coloboma, which appears as a gap
                  or hole in structures of the eye. This is a preliminary detection only and should be 
                  confirmed by an ophthalmologist for a proper diagnosis.
                </p>
              ) : (
                <p>
                  The analysis suggests no obvious signs of coloboma in this image. However,
                  if you have concerns about your vision or eye health, we recommend consulting
                  with an ophthalmologist for a comprehensive eye examination.
                </p>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={handleTryAnother}>
                Try Another Image
              </Button>
              <Button variant="outline" onClick={handleLearnMore}>
                Learn More About Coloboma
              </Button>
              {localStorage.getItem("user") && (
                <Button variant="secondary" onClick={handleViewHistory}>
                  View Medical History
                </Button>
              )}
            </div>
          </div>
        </div>
      </Card>

      <div className="mt-6 text-center text-sm text-gray-500">
        <p>This tool provides preliminary analysis only and is not a substitute for professional medical advice.</p>
      </div>
    </div>
  );
};

export default ResultDisplay;
