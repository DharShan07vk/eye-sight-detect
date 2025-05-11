
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const About = () => {
  return (
    <div className="container-center">
      <h1 className="text-3xl md:text-4xl mb-6 text-center">About Coloboma</h1>
      
      <Card className="mb-8">
        <div className="p-6">
          <h2 className="text-2xl mb-4">What is Coloboma?</h2>
          <p className="mb-4">
            Coloboma is a condition where a part of the eye tissue is missing, creating a gap or hole 
            in structures such as the iris, retina, choroid, or optic disc. This occurs when these 
            parts of the eye don't form completely during fetal development.
          </p>
          
          <div className="flex flex-col md:flex-row gap-6 my-8">
            <div className="w-full md:w-1/2">
              <h3 className="font-bold mb-2">Common Types of Coloboma</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Iris coloboma (keyhole pupil)</li>
                <li>Retinal coloboma</li>
                <li>Choroidal coloboma</li>
                <li>Optic disc coloboma</li>
              </ul>
            </div>
            <div className="w-full md:w-1/2">
              <h3 className="font-bold mb-2">Symptoms May Include</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Distinctive appearance of the pupil</li>
                <li>Vision problems</li>
                <li>Light sensitivity</li>
                <li>In some cases, little to no symptoms</li>
              </ul>
            </div>
          </div>
          
          <p>
            Coloboma can affect one or both eyes and may be associated with other eye or health conditions. 
            Early detection is important for proper management and treatment options.
          </p>
        </div>
      </Card>
      
      <Card className="mb-8">
        <div className="p-6">
          <h2 className="text-2xl mb-4">About This Detection Tool</h2>
          <p className="mb-4">
            Our Coloboma Detection Tool uses advanced image analysis techniques to screen eye images for 
            potential signs of coloboma. Here's how it works:
          </p>
          
          <ol className="list-decimal pl-5 space-y-2 mb-4">
            <li>You upload a clear image of an eye</li>
            <li>Our system analyzes the image using specialized algorithms</li>
            <li>Results are displayed with a confidence score</li>
          </ol>
          
          <div className="bg-secondary/10 p-4 rounded-lg mb-4">
            <p className="font-bold">Important Disclaimer</p>
            <p className="text-sm">
              This tool is designed for preliminary screening only and is not a substitute for professional medical 
              diagnosis. Always consult with an ophthalmologist or eye care professional for proper diagnosis and treatment.
            </p>
          </div>
          
          <p>
            The detection accuracy depends on many factors including image quality, lighting, and angle. 
            For best results, upload a clear, well-lit image of the eye taken straight-on.
          </p>
        </div>
      </Card>
      
      <Card>
        <div className="p-6">
          <h2 className="text-2xl mb-4">Contact & Resources</h2>
          
          <h3 className="font-bold mb-2">For More Information</h3>
          <ul className="list-disc pl-5 space-y-1 mb-6">
            <li>
              <a 
                href="https://www.nei.nih.gov/learn-about-eye-health/eye-conditions-and-diseases/coloboma" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary underline"
              >
                National Eye Institute - Coloboma Information
              </a>
            </li>
            <li>
              <a 
                href="https://rarediseases.info.nih.gov/diseases/6142/coloboma" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary underline"
              >
                NIH Rare Diseases Information - Coloboma
              </a>
            </li>
          </ul>
          
          <Separator className="my-6" />
          
          <div className="flex justify-center">
            <Button asChild>
              <Link to="/upload">Try the Detection Tool</Link>
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default About;
