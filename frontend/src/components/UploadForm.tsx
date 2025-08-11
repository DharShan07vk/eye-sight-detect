
import { useState, useRef, ChangeEvent, DragEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Loader } from 'lucide-react';


const UploadForm = () => {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      validateAndSetImage(files[0]);
    }
  };

  const validateAndSetImage = (file: File) => {
    // Check file type
    if (!file.type.match('image/jpeg|image/png|image/jpg')) {
      toast({
        title: "Invalid file type",
        description: "Please upload a JPEG or PNG image.",
        variant: "destructive"
      });
      return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload an image smaller than 5MB.",
        variant: "destructive"
      });
      return;
    }

    // Valid file, create preview and set image
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setPreview(e.target.result as string);
      }
    };
    reader.readAsDataURL(file);
    setImage(file);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      validateAndSetImage(e.dataTransfer.files[0]);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

 const handleSubmit = async () => {
  if (!image) {
    toast({
      title: "No image selected",
      description: "Please select an image to analyze.",
      variant: "destructive"
    });
    return;
  }

  try {
    setIsLoading(true);

    const formData = new FormData();
    formData.append('image', image);

    const response = await fetch('http://127.0.0.1:5000/predict', {
      method: 'POST',
      body: formData
    });

    const data = await response.json();

    sessionStorage.setItem('detectionResult', JSON.stringify({
      isColoboma: data.isColoboma,
      confidence: data.confidence,
      imageUrl: preview
    }));

    navigate('/results');

  } catch (error) {
    console.error('Error processing image:', error);
    toast({
      title: "Processing Error",
      description: "An error occurred while analyzing the image. Please try again.",
      variant: "destructive"
    });
  } finally {
    setIsLoading(false);
  }
};


  return (
    <div className="container-center">
      <Card className="p-6">
        <h2 className="text-2xl mb-4 text-center">Upload Eye Image</h2>
        
        <div 
          className={`upload-zone mb-6 ${isDragging ? 'border-primary bg-secondary/10' : ''}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={triggerFileInput}
        >
          <input 
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept="image/jpeg, image/png, image/jpg"
          />
          
          {preview ? (
            <div className="flex flex-col items-center">
              <img 
                src={preview} 
                alt="Image preview" 
                className="max-h-64 mb-4 rounded-lg" 
              />
              <p className="text-sm text-gray-500">Click or drag to change image</p>
            </div>
          ) : (
            <div className="text-center">
              <div className="bg-secondary/30 p-4 rounded-full mb-4 inline-flex">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="font-medium">Drag & drop your image here</p>
              <p className="text-sm text-gray-500 mt-1">or click to browse files</p>
              <p className="text-xs text-gray-400 mt-4">Supported formats: JPEG, PNG</p>
            </div>
          )}
        </div>
        
        <div className="flex justify-center">
          <Button 
            onClick={handleSubmit}
            className="w-full max-w-sm"
            disabled={!image || isLoading}
          >
            {isLoading ? (
              <>
                <Loader className="mr-2 h-4 w-4 animate-spin" />
                Analyzing Image...
              </>
            ) : (
              'Analyze Now'
            )}
          </Button>
        </div>
      </Card>
      
      <div className="mt-6 text-center text-sm text-gray-500">
        <p>We do not store your images permanently. All uploads are processed securely.</p>
      </div>
    </div>
  );
};

export default UploadForm;
