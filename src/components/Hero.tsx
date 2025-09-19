import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import heroImage from '@/assets/hero-farmer.jpg';
import { 
  Wheat, 
  TrendingUp, 
  Cloud, 
  MapPin, 
  BarChart3,
  Users,
  Shield,
  Zap,
  ArrowRight
} from 'lucide-react';

const Hero = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: TrendingUp,
      title: 'AI Crop Prediction',
      description: 'Advanced ML algorithms for accurate crop recommendations',
    },
    {
      icon: Cloud,
      title: 'Weather Integration',
      description: 'Real-time weather data for precise farming decisions',
    },
    {
      icon: BarChart3,
      title: 'MSP Analytics',
      description: 'Live market prices and future predictions',
    },
    {
      icon: Shield,
      title: 'Government Schemes',
      description: 'Complete information about farmer benefits',
    },
  ];

  const stats = [
    { value: '10,000+', label: 'Farmers Helped' },
    { value: '95%', label: 'Accuracy Rate' },
    { value: '4', label: 'Languages' },
    { value: '24/7', label: 'Support' },
  ];

  return (
    <div className="relative min-h-screen bg-gradient-hero overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-hero/80"></div>
      
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full animate-float"></div>
      <div className="absolute bottom-20 right-10 w-24 h-24 bg-success/10 rounded-full animate-float" style={{animationDelay: '1s'}}></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-accent/10 rounded-full animate-float" style={{animationDelay: '2s'}}></div>

      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 text-white animate-slide-up">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                {t('heroTitle')}
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-xl">
                {t('heroSubtitle')}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg"
                className="bg-white text-primary hover:bg-white/90 hover:shadow-glow transition-smooth animate-pulse-glow"
                onClick={() => {
                  const element = document.querySelector('#home');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <TrendingUp className="w-5 h-5 mr-2" />
                {t('predictCrop')}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button 
                variant="outline"
                size="lg"
                className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm"
                onClick={() => {
                  const element = document.querySelector('#trainer');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <Users className="w-5 h-5 mr-2" />
                Get Training
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center animate-scale-bounce" style={{animationDelay: `${index * 0.2}s`}}>
                  <div className="text-2xl md:text-3xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-white/80">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card 
                  key={index}
                  className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 transition-smooth animate-slide-up shadow-glow"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <CardContent className="p-6 space-y-4 text-white">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                      <p className="text-white/80 text-sm">{feature.description}</p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center animate-slide-up">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md rounded-full px-6 py-3 text-white">
            <Wheat className="w-5 h-5" />
            <span className="text-sm font-medium">
              Empowering farmers with AI technology and government support
            </span>
            <Zap className="w-4 h-4 text-yellow-300" />
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default Hero;