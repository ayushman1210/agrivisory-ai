// Hero.tsx
import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import heroImage from '@/assets/hero-farmer.jpg';
import { 
  Wheat, TrendingUp, Cloud, MapPin, BarChart3,
  Users, Shield, Zap, ArrowRight, Loader2
} from 'lucide-react';

const Hero = () => {
  const { t } = useLanguage();

  const [location, setLocation] = useState<string | null>(null);
  const [loadingLocation, setLoadingLocation] = useState(true);

  // --- Reverse geocode lat/lon to city name ---
  const getCityName = async (lat: number, lon: number) => {
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`);
      const data = await res.json();
      return data.address.city || data.address.town || data.address.village || data.display_name;
    } catch {
      return 'Unknown location';
    }
  };

  // --- Detect user location ---
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        const cityName = await getCityName(latitude, longitude);
        setLocation(cityName);
        setLoadingLocation(false);
      },
      () => {
        setLocation('Location unavailable');
        setLoadingLocation(false);
      }
    );
  }, []);

  const features = [
    { icon: TrendingUp, title: 'AI Crop Prediction', description: 'Advanced ML algorithms for accurate crop recommendations' },
    { icon: Cloud, title: 'Weather Integration', description: 'Real-time weather data for precise farming decisions' },
    { icon: BarChart3, title: 'MSP Analytics', description: 'Live market prices and future predictions' },
    { icon: Shield, title: 'Government Schemes', description: 'Complete information about farmer benefits' },
  ];

  const stats = [
    { value: '10,000+', label: 'Farmers Helped' },
    { value: '95%', label: 'Accuracy Rate' },
    { value: '4', label: 'Languages' },
    { value: '24/7', label: 'Support' },
  ];

  // --- Scroll animations ---
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  useEffect(() => {
    if (inView) controls.start('visible');
  }, [controls, inView]);

  const textVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeInOut' } }
  };

  const cardVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.2, duration: 0.6, ease: 'easeInOut' } })
  };

  return (
    <div className="relative min-h-screen bg-gradient-hero overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
           style={{ backgroundImage: `url(${heroImage})` }} />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-hero/80"></div>

      <div className="container mx-auto px-4 pt-24 pb-16 relative z-10">
        <div ref={ref} className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial="hidden"
            animate={controls}
            className="space-y-8 text-white"
          >
            <motion.h1 variants={textVariant} className="text-4xl md:text-6xl font-bold leading-tight">
              {t('heroTitle')}
            </motion.h1>
            <motion.p variants={textVariant} className="text-xl md:text-2xl text-white/90 max-w-xl">
              {t('heroSubtitle')}
            </motion.p>

            {/* Location Loader */}
            <motion.div variants={textVariant} className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-md w-fit">
              <MapPin className="w-5 h-5 text-red-400" />
              {loadingLocation ? (
                <span className="flex items-center gap-2 text-sm text-white/80">
                  <Loader2 className="w-4 h-4 animate-spin" /> Detecting location...
                </span>
              ) : (
                <span className="text-sm text-white/90">{location}</span>
              )}
            </motion.div>

            {/* Buttons */}
            <motion.div variants={textVariant} className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 hover:shadow-glow transition-smooth">
                <TrendingUp className="w-5 h-5 mr-2" /> {t('predictCrop')} <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button variant="outline" size="lg" className="border-white/30 text-black hover:bg-white/10 backdrop-blur-sm">
                <Users className="w-5 h-5 mr-2" /> Get Training
              </Button>
            </motion.div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8">
              {stats.map((stat, i) => (
                <motion.div key={i} custom={i} variants={cardVariant} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-white/80">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Content - Feature Cards */}
          <motion.div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <motion.div key={i} custom={i} variants={cardVariant}>
                  <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 transition-smooth shadow-glow">
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
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
