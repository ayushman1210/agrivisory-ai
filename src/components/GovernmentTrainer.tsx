import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  Users, 
  BookOpen, 
  Video, 
  Calendar, 
  Award, 
  Phone, 
  MapPin,
  Clock,
  Star,
  GraduationCap,
  FileText,
  Headphones
} from 'lucide-react';

const trainers = [
  {
    id: 1,
    name: 'Dr. Rajesh Kumar',
    designation: 'Senior Agricultural Officer',
    specialization: 'Crop Management & Pest Control',
    experience: '15+ years',
    rating: 4.9,
    location: 'Punjab Agricultural University',
    phone: '+91-9876543214',
    languages: ['Hindi', 'English', 'Punjabi'],
    availability: 'Mon-Fri 9AM-5PM',
    image: '/placeholder-trainer.jpg',
  },
  {
    id: 2,
    name: 'Dr. Priya Sharma',
    designation: 'Soil Health Expert',
    specialization: 'Organic Farming & Soil Testing',
    experience: '12+ years',
    rating: 4.8,
    location: 'IARI, New Delhi',
    phone: '+91-9876543215',
    languages: ['Hindi', 'English', 'Marathi'],
    availability: 'Tue-Sat 10AM-6PM',
    image: '/placeholder-trainer.jpg',
  },
  {
    id: 3,
    name: 'Prof. Suresh Patil',
    designation: 'Horticulture Specialist',
    specialization: 'Fruit & Vegetable Cultivation',
    experience: '20+ years',
    rating: 4.7,
    location: 'University of Agricultural Sciences, Bangalore',
    phone: '+91-9876543216',
    languages: ['Kannada', 'English', 'Telugu'],
    availability: 'Mon-Fri 8AM-4PM',
    image: '/placeholder-trainer.jpg',
  },
];

const programs = [
  {
    title: 'Digital Farming Basics',
    duration: '2 weeks',
    mode: 'Online',
    participants: '500+',
    nextBatch: '25 Dec 2024',
    topics: ['Smart irrigation', 'Weather monitoring', 'Market linkages', 'Government schemes'],
  },
  {
    title: 'Sustainable Agriculture',
    duration: '3 weeks',
    mode: 'Hybrid',
    participants: '300+',
    nextBatch: '1 Jan 2025',
    topics: ['Organic farming', 'Water conservation', 'Integrated pest management', 'Soil health'],
  },
  {
    title: 'Crop Insurance & Finance',
    duration: '1 week',
    mode: 'Online',
    participants: '750+',
    nextBatch: '15 Dec 2024',
    topics: ['Insurance schemes', 'Loan procedures', 'Subsidy applications', 'Financial planning'],
  },
];

const GovernmentTrainer = () => {
  const { t } = useLanguage();

  return (
    <div id="trainer" className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4 animate-slide-up">
        <h2 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          {t('govTrainer')} Program
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Connect with certified agricultural experts and access free training programs funded by the government
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-slide-up">
        {[
          { label: 'Active Trainers', value: '500+', icon: Users },
          { label: 'Training Programs', value: '50+', icon: BookOpen },
          { label: 'Farmers Trained', value: '10K+', icon: GraduationCap },
          { label: 'Languages', value: '12+', icon: Headphones },
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="text-center shadow-card border-primary/20">
              <CardContent className="p-4">
                <Icon className="w-8 h-8 text-primary mx-auto mb-2" />
                <p className="text-2xl font-bold text-primary">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Expert Trainers */}
      <div className="space-y-6">
        <h3 className="text-2xl font-semibold text-center">Meet Our Expert Trainers</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trainers.map((trainer, index) => (
            <Card 
              key={trainer.id}
              className="shadow-card hover:shadow-glow transition-smooth animate-slide-up border-primary/20"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6 space-y-4">
                {/* Trainer Header */}
                <div className="text-center space-y-2">
                  <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto">
                    <Users className="w-10 h-10 text-primary-foreground" />
                  </div>
                  <h4 className="font-semibold text-lg text-primary">{trainer.name}</h4>
                  <p className="text-sm text-muted-foreground">{trainer.designation}</p>
                  <div className="flex items-center justify-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium">{trainer.rating}</span>
                    <span className="text-xs text-muted-foreground">({trainer.experience})</span>
                  </div>
                </div>

                {/* Trainer Details */}
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <Award className="w-4 h-4 text-primary flex-shrink-0" />
                    <span>{trainer.specialization}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                    <span>{trainer.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-primary flex-shrink-0" />
                    <span>{trainer.availability}</span>
                  </div>
                </div>

                {/* Languages */}
                <div>
                  <h5 className="font-medium mb-2 text-sm">Languages:</h5>
                  <div className="flex flex-wrap gap-1">
                    {trainer.languages.map((lang, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-secondary/50 text-secondary-foreground rounded text-xs"
                      >
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-2">
                  <Button 
                    className="w-full bg-gradient-primary hover:shadow-glow transition-smooth"
                    size="sm"
                    onClick={() => window.open(`tel:${trainer.phone}`, '_self')}
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Contact Trainer
                  </Button>
                  <Button 
                    variant="outline"
                    className="w-full border-primary/20 hover:bg-primary/10"
                    size="sm"
                  >
                    <Video className="w-4 h-4 mr-2" />
                    Schedule Session
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Training Programs */}
      <div className="space-y-6">
        <h3 className="text-2xl font-semibold text-center">Free Training Programs</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map((program, index) => (
            <Card 
              key={index}
              className="shadow-card hover:shadow-glow transition-smooth animate-slide-up border-primary/20"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader className="bg-gradient-secondary text-secondary-foreground rounded-t-lg">
                <CardTitle className="text-lg">{program.title}</CardTitle>
                <CardDescription className="text-secondary-foreground/80">
                  {program.duration} • {program.mode} • {program.participants} enrolled
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                {/* Next Batch */}
                <div className="p-3 bg-primary/10 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span className="font-medium text-primary">Next Batch: {program.nextBatch}</span>
                  </div>
                </div>

                {/* Topics */}
                <div>
                  <h5 className="font-medium mb-2 text-sm">What you'll learn:</h5>
                  <ul className="space-y-1">
                    {program.topics.map((topic, idx) => (
                      <li key={idx} className="flex items-center space-x-2 text-sm">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" />
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Register Button */}
                <Button 
                  className="w-full bg-gradient-primary hover:shadow-glow transition-smooth"
                  size="sm"
                >
                  <BookOpen className="w-4 h-4 mr-2" />
                  Register Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Help Center */}
      <Card className="shadow-card border-primary/20 hover:shadow-glow transition-smooth animate-slide-up">
        <CardHeader className="bg-gradient-accent text-accent-foreground rounded-t-lg">
          <CardTitle className="flex items-center space-x-2">
            <Headphones className="w-5 h-5" />
            <span>Training Support Center</span>
          </CardTitle>
          <CardDescription className="text-accent-foreground/80">
            24/7 support for all your training and technical queries
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="space-y-3">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Phone className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold">Training Helpline</h4>
                <p className="text-muted-foreground">1800-180-1800</p>
                <Button variant="outline" size="sm" className="mt-2">
                  Call Now
                </Button>
              </div>
            </div>
            <div className="space-y-3">
              <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mx-auto">
                <FileText className="w-6 h-6 text-success" />
              </div>
              <div>
                <h4 className="font-semibold">Course Materials</h4>
                <p className="text-muted-foreground">Download PDFs & Videos</p>
                <Button variant="outline" size="sm" className="mt-2">
                  Access Library
                </Button>
              </div>
            </div>
            <div className="space-y-3">
              <div className="w-12 h-12 bg-warning/10 rounded-full flex items-center justify-center mx-auto">
                <Award className="w-6 h-6 text-warning-foreground" />
              </div>
              <div>
                <h4 className="font-semibold">Certification</h4>
                <p className="text-muted-foreground">Government Recognized</p>
                <Button variant="outline" size="sm" className="mt-2">
                  View Certificates
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GovernmentTrainer;