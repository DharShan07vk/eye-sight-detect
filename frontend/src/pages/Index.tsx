
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-background to-secondary/20 py-12 flex-1 flex items-center">
        <div className="container-center">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Coloboma Eye Disease Detection
            </h1>
            <p className="text-xl mb-8">
              A simple tool to detect signs of coloboma from eye images
            </p>
            <Button asChild size="lg" className="text-lg px-8 py-6">
              <Link to="/upload">
                Get Started 
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Info Cards Section */}
      <div className="py-12 bg-white">
        <div className="container-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className="bg-secondary/30 p-4 rounded-full mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Upload</h3>
                <p>Upload a clear image of the eye. For best results, use a well-lit photo taken straight-on.</p>
              </div>
            </Card>
            
            <Card className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className="bg-secondary/30 p-4 rounded-full mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Analyze</h3>
                <p>Our system processes the image and analyzes it for characteristic signs of coloboma.</p>
              </div>
            </Card>
            
            <Card className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className="bg-secondary/30 p-4 rounded-full mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Get Results</h3>
                <p>Receive a clear indication if coloboma is detected, along with a confidence score.</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
      
      {/* About Coloboma Section */}
      <div className="py-12 bg-secondary/10">
        <div className="container-center">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="w-full md:w-1/2 order-2 md:order-1">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">What is Coloboma?</h2>
              <p className="mb-4">
                Coloboma is a condition where part of the eye tissue is missing. It can affect the iris 
                (giving a keyhole appearance to the pupil), retina, choroid, or optic disc.
              </p>
              <p className="mb-6">
                This condition forms during fetal development when parts of the eye don't close properly. 
                Early detection can help manage potential vision issues.
              </p>
              <Button asChild variant="outline">
                <Link to="/about">Learn More About Coloboma</Link>
              </Button>
            </div>
            <div className="w-full md:w-1/2 order-1 md:order-2">
              <div className="bg-white p-2 rounded-lg shadow-md">
                <img 
                  src="https://images.unsplash.com/photo-1494869042583-f6c911f04b4c?q=80&w=2940&auto=format&fit=crop" 
                  alt="Close up of human eye" 
                  className="w-full h-auto rounded" 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Call to Action */}
      <div className="py-12 bg-primary text-white text-center">
        <div className="container-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Check an Eye Image?</h2>
          <p className="mb-8 text-white/80">
            Our tool provides a quick preliminary screening for coloboma signs
          </p>
          <Button asChild size="lg" variant="secondary" className="text-primary">
            <Link to="/upload">
              Upload an Image Now
            </Link>
          </Button>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="py-6 bg-gray-900 text-gray-400 text-sm">
        <div className="container-center text-center">
          <p>
            Note: This is a screening tool only and not a substitute for professional medical advice.
          </p>
          <p className="mt-2">
            Always consult with an ophthalmologist for proper diagnosis and treatment.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
