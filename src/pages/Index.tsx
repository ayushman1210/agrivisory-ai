import React from 'react';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import CropPrediction from '@/components/CropPrediction';
import MSPData from '@/components/MSPData';
import GovernmentSchemes from '@/components/GovernmentSchemes';
import GovernmentTrainer from '@/components/GovernmentTrainer';
import FertilizerLocator from '@/components/FertilizerLocator';
import ContactSection from '@/components/ContactSection';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <Hero />
      
      {/* Main Sections */}
      <div className="space-y-16">
        {/* Crop Prediction */}
        <CropPrediction />
        
        {/* MSP Data & Analytics */}
        <MSPData />
        
        {/* Government Schemes */}
        <GovernmentSchemes />
        
        {/* Government Trainer */}
        <GovernmentTrainer />
        
        {/* Fertilizer Locator */}
        <FertilizerLocator />
        
        {/* Contact Section */}
        <ContactSection />
      </div>
      
      {/* Footer */}
      <footer className="bg-gradient-primary text-primary-foreground py-8 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
            <div>
              <h3 className="font-bold text-xl mb-4">कृषि बुद्धि</h3>
              <p className="text-primary-foreground/80">
                AI-powered farming intelligence for modern agriculture
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-primary-foreground/80">
                <li>Government Schemes</li>
                <li>Training Programs</li>
                <li>MSP Data</li>
                <li>Weather Updates</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-primary-foreground/80">
                <li>Helpline: 1800-180-1551</li>
                <li>Email: support@krishibuddhi.gov.in</li>
                <li>WhatsApp: +91-9876543200</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-primary-foreground/80">
            <p>&copy; 2024 कृषि बुद्धि - Government of India Initiative</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
