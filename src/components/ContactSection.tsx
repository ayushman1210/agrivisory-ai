import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageCircle, 
  Headphones,
  Globe,
  Users,
  Send,
  AlertCircle
} from 'lucide-react';

const contactInfo = [
  {
    icon: Phone,
    title: 'Farmer Helpline',
    subtitle: '24/7 Support Available',
    contact: '1800-180-1551',
    description: 'Free calling from any network',
    action: 'Call Now',
    color: 'primary',
  },
  {
    icon: Mail,
    title: 'Email Support',
    subtitle: 'Technical Queries',
    contact: 'support@krishibuddhi.gov.in',
    description: 'Response within 24 hours',
    action: 'Send Email',
    color: 'success',
  },
  {
    icon: MessageCircle,
    title: 'WhatsApp Support',
    subtitle: 'Quick Assistance',
    contact: '+91-9876543200',
    description: 'Chat in your preferred language',
    action: 'Chat Now',
    color: 'accent',
  },
];

const emergencyContacts = [
  { name: 'Crop Disease Emergency', number: '1800-180-1552', available: '24/7' },
  { name: 'Weather Alert System', number: '1800-180-1553', available: '24/7' },
  { name: 'Market Price Updates', number: '1800-180-1554', available: '6 AM - 10 PM' },
  { name: 'Insurance Claims', number: '1800-180-1555', available: '9 AM - 6 PM' },
];

const offices = [
  {
    name: 'Northern Region Office',
    address: 'Sector 18, Chandigarh - 160018',
    phone: '+91-172-2345678',
    states: ['Punjab', 'Haryana', 'Himachal Pradesh', 'J&K'],
  },
  {
    name: 'Western Region Office', 
    address: 'Andheri West, Mumbai - 400058',
    phone: '+91-22-12345678',
    states: ['Maharashtra', 'Gujarat', 'Rajasthan', 'Goa'],
  },
  {
    name: 'Southern Region Office',
    address: 'Hebbal, Bangalore - 560024',
    phone: '+91-80-12345678',
    states: ['Karnataka', 'Tamil Nadu', 'Andhra Pradesh', 'Kerala'],
  },
];

const ContactSection = () => {
  const { t } = useLanguage();

  const getColorClasses = (color: string) => {
    const colorMap = {
      primary: 'bg-primary/10 text-primary border-primary/20',
      success: 'bg-success/10 text-success border-success/20',
      accent: 'bg-accent/10 text-accent-foreground border-accent/20',
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.primary;
  };

  return (
    <div id="contact" className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4 animate-slide-up">
        <h2 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          {t('contactTitle')}
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Get in touch with our agricultural experts and support team for any assistance
        </p>
      </div>

      {/* Main Contact Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {contactInfo.map((info, index) => {
          const Icon = info.icon;
          return (
            <Card 
              key={index}
              className="shadow-card hover:shadow-glow transition-smooth animate-slide-up border-primary/20 text-center"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader className={`${getColorClasses(info.color)} rounded-t-lg`}>
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-8 h-8" />
                </div>
                <CardTitle className="text-lg">{info.title}</CardTitle>
                <CardDescription className="opacity-80">{info.subtitle}</CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="space-y-2">
                  <p className="text-xl font-bold text-primary">{info.contact}</p>
                  <p className="text-sm text-muted-foreground">{info.description}</p>
                </div>
                <Button 
                  className="w-full bg-gradient-primary hover:shadow-glow transition-smooth"
                  onClick={() => {
                    if (info.icon === Phone) {
                      window.open(`tel:${info.contact}`, '_self');
                    } else if (info.icon === Mail) {
                      window.open(`mailto:${info.contact}`, '_self');
                    } else if (info.icon === MessageCircle) {
                      window.open(`https://wa.me/${info.contact.replace(/[^0-9]/g, '')}`, '_blank');
                    }
                  }}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {info.action}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Contact Form */}
      <div className="grid lg:grid-cols-2 gap-8">
        <Card className="shadow-card border-primary/20 hover:shadow-glow transition-smooth animate-slide-up">
          <CardHeader className="bg-gradient-secondary text-secondary-foreground rounded-t-lg">
            <CardTitle className="flex items-center space-x-2">
              <Send className="w-5 h-5" />
              <span>Send us a Message</span>
            </CardTitle>
            <CardDescription className="text-secondary-foreground/80">
              Fill out the form below and we'll get back to you within 24 hours
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input 
                  id="name" 
                  placeholder="Enter your name"
                  className="border-primary/20 focus:border-primary"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input 
                  id="phone" 
                  placeholder="Enter phone number"
                  className="border-primary/20 focus:border-primary"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="Enter your email"
                className="border-primary/20 focus:border-primary"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input 
                id="location" 
                placeholder="City, State"
                className="border-primary/20 focus:border-primary"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea 
                id="message" 
                placeholder="Describe your query or issue..."
                className="border-primary/20 focus:border-primary min-h-[100px]"
              />
            </div>
            <Button className="w-full bg-gradient-primary hover:shadow-glow transition-smooth">
              <Send className="w-4 h-4 mr-2" />
              Send Message
            </Button>
          </CardContent>
        </Card>

        {/* Emergency Contacts */}
        <div className="space-y-6">
          <Card className="shadow-card border-destructive/20 hover:shadow-glow transition-smooth animate-slide-up">
            <CardHeader className="bg-gradient-to-r from-destructive to-warning text-destructive-foreground rounded-t-lg">
              <CardTitle className="flex items-center space-x-2">
                <AlertCircle className="w-5 h-5" />
                <span>Emergency Helplines</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-3">
              {emergencyContacts.map((contact, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                  <div>
                    <p className="font-medium text-sm">{contact.name}</p>
                    <p className="text-xs text-muted-foreground">{contact.available}</p>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => window.open(`tel:${contact.number}`, '_self')}
                    className="border-primary/20"
                  >
                    <Phone className="w-3 h-3 mr-1" />
                    {contact.number}
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Regional Offices */}
          <Card className="shadow-card border-primary/20 hover:shadow-glow transition-smooth animate-slide-up">
            <CardHeader className="bg-gradient-accent text-accent-foreground rounded-t-lg">
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="w-5 h-5" />
                <span>Regional Offices</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              {offices.map((office, index) => (
                <div key={index} className="p-4 border border-border rounded-lg space-y-2">
                  <h4 className="font-semibold text-primary">{office.name}</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                      <span>{office.address}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                      <span>{office.phone}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {office.states.map((state, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-secondary/50 text-secondary-foreground rounded text-xs"
                      >
                        {state}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Office Hours */}
      <Card className="shadow-card border-primary/20 hover:shadow-glow transition-smooth animate-slide-up">
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-2">
              <Clock className="w-6 h-6 text-primary" />
              <h3 className="text-xl font-semibold">Office Hours</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-6 text-sm">
              <div className="space-y-2">
                <h4 className="font-medium text-primary">Support Center</h4>
                <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p>Saturday: 9:00 AM - 2:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium text-success">Emergency Helpline</h4>
                <p>Available 24/7</p>
                <p>All days including holidays</p>
                <p>Multilingual support</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium text-accent-foreground">Field Officers</h4>
                <p>Monday - Saturday: 8:00 AM - 5:00 PM</p>
                <p>On-site visits by appointment</p>
                <p>Weather permitting</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContactSection;