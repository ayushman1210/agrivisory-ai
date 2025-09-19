import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import { 
  Thermometer, 
  Droplets, 
  MapPin, 
  Beaker, 
  TrendingUp, 
  CloudRain,
  Loader2,
  CheckCircle
} from 'lucide-react';

interface PredictionResult {
  prediction: string;
  top3: { crop: string; probability: number }[];
  weather: { temperature: number; humidity: number };
  city: string;
}

const CropPrediction = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  
  const [formData, setFormData] = useState({
    city: '',
    N: '',
    P: '',
    K: '',
    ph: '',
    rainfall: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePredict = async () => {
    // Validate form
    if (!formData.city || !formData.N || !formData.P || !formData.K || !formData.ph || !formData.rainfall) {
      toast({
        title: "Missing Information",
        description: "Please fill all the required fields",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call with mock data for now
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockResult: PredictionResult = {
        prediction: 'Rice',
        top3: [
          { crop: 'Rice', probability: 85.2 },
          { crop: 'Wheat', probability: 12.8 },
          { crop: 'Sugarcane', probability: 2.0 }
        ],
        weather: { 
          temperature: 28.5, 
          humidity: 68 
        },
        city: formData.city
      };
      
      setPrediction(mockResult);
      
      toast({
        title: "Prediction Complete!",
        description: `Best crop for your conditions: ${mockResult.prediction}`,
      });
      
    } catch (error) {
      toast({
        title: "Prediction Failed",
        description: "Unable to get crop prediction. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div id="home" className="container mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Prediction Form */}
        <Card className="shadow-card border-primary/20 hover:shadow-glow transition-smooth animate-slide-up">
          <CardHeader className="bg-gradient-primary text-primary-foreground rounded-t-lg">
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5" />
              <span>{t('cropPredictionTitle')}</span>
            </CardTitle>
            <CardDescription className="text-primary-foreground/80">
              Enter your location and soil parameters for AI-powered crop recommendations
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            {/* Location */}
            <div className="space-y-2">
              <Label htmlFor="location" className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-primary" />
                <span>{t('location')}</span>
              </Label>
              <Input
                id="location"
                placeholder={t('enterLocation')}
                value={formData.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
                className="border-primary/20 focus:border-primary"
              />
            </div>

            {/* Soil Composition */}
            <div className="space-y-4">
              <Label className="flex items-center space-x-2 text-base font-semibold">
                <Beaker className="w-4 h-4 text-primary" />
                <span>{t('soilComposition')}</span>
              </Label>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nitrogen" className="text-sm">{t('nitrogen')}</Label>
                  <Input
                    id="nitrogen"
                    type="number"
                    placeholder="0-140"
                    value={formData.N}
                    onChange={(e) => handleInputChange('N', e.target.value)}
                    className="border-primary/20 focus:border-primary"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phosphorus" className="text-sm">{t('phosphorus')}</Label>
                  <Input
                    id="phosphorus"
                    type="number"
                    placeholder="5-145"
                    value={formData.P}
                    onChange={(e) => handleInputChange('P', e.target.value)}
                    className="border-primary/20 focus:border-primary"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="potassium" className="text-sm">{t('potassium')}</Label>
                  <Input
                    id="potassium"
                    type="number"
                    placeholder="5-205"
                    value={formData.K}
                    onChange={(e) => handleInputChange('K', e.target.value)}
                    className="border-primary/20 focus:border-primary"
                  />
                </div>
              </div>
            </div>

            {/* pH and Rainfall */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="ph">{t('phLevel')}</Label>
                <Input
                  id="ph"
                  type="number"
                  step="0.1"
                  placeholder="3.5-9.9"
                  value={formData.ph}
                  onChange={(e) => handleInputChange('ph', e.target.value)}
                  className="border-primary/20 focus:border-primary"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="rainfall" className="flex items-center space-x-2">
                  <CloudRain className="w-4 h-4 text-primary" />
                  <span>{t('rainfall')}</span>
                </Label>
                <Input
                  id="rainfall"
                  type="number"
                  placeholder="20-300"
                  value={formData.rainfall}
                  onChange={(e) => handleInputChange('rainfall', e.target.value)}
                  className="border-primary/20 focus:border-primary"
                />
              </div>
            </div>

            {/* Predict Button */}
            <Button
              onClick={handlePredict}
              disabled={isLoading}
              className="w-full bg-gradient-primary hover:shadow-glow transition-smooth animate-scale-bounce"
              size="lg"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <TrendingUp className="w-4 h-4 mr-2" />
                  {t('predict')}
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Results Display */}
        {prediction && (
          <Card className="shadow-card border-success/20 hover:shadow-glow transition-smooth animate-slide-up">
            <CardHeader className="bg-gradient-to-r from-success to-primary-glow text-success-foreground rounded-t-lg">
              <CardTitle className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5" />
                <span>{t('recommendedCrop')}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              {/* Weather Info */}
              <div className="bg-gradient-accent rounded-lg p-4 space-y-2">
                <h4 className="font-semibold text-accent-foreground flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>{t('weatherInfo')} - {prediction.city}</span>
                </h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <Thermometer className="w-4 h-4 text-red-500" />
                    <span>{t('temperature')}: {prediction.weather.temperature}°C</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Droplets className="w-4 h-4 text-blue-500" />
                    <span>{t('humidity')}: {prediction.weather.humidity}%</span>
                  </div>
                </div>
              </div>

              {/* Top Predictions */}
              <div className="space-y-4">
                <h4 className="font-semibold text-success">{t('topSuggestions')}</h4>
                {prediction.top3.map((crop, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border-l-4 ${
                      index === 0 
                        ? 'bg-success/10 border-success' 
                        : 'bg-muted/50 border-muted-foreground'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{crop.crop}</span>
                      <span className={`text-sm font-bold ${
                        index === 0 ? 'text-success' : 'text-muted-foreground'
                      }`}>
                        {crop.probability}%
                      </span>
                    </div>
                    <div className="mt-2 bg-background rounded-full h-2">
                      <div
                        className={`h-full rounded-full transition-smooth ${
                          index === 0 ? 'bg-success' : 'bg-muted-foreground'
                        }`}
                        style={{ width: `${crop.probability}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CropPrediction;