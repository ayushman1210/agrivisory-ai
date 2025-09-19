import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  IndianRupee, 
  Shield, 
  Beaker, 
  Tractor, 
  Droplets, 
  Zap, 
  ExternalLink,
  CheckCircle,
  Users,
  FileText
} from 'lucide-react';

const schemes = [
  {
    id: 'pmkisan',
    icon: IndianRupee,
    color: 'success',
    amount: '₹6,000/year',
    eligibility: 'Small & Marginal Farmers',
    features: ['Direct cash transfer', '3 installments', 'No documents required', 'Aadhaar linking'],
  },
  {
    id: 'cropinsurance',
    icon: Shield,
    color: 'primary',
    amount: '2% Premium',
    eligibility: 'All Farmers',
    features: ['Weather risk coverage', 'Yield loss protection', 'Technology support', 'Quick settlement'],
  },
  {
    id: 'soilhealth',
    icon: Beaker,
    color: 'accent',
    amount: 'Free Testing',
    eligibility: 'All Farmers',
    features: ['Soil nutrient analysis', 'Fertilizer recommendations', 'Digital health card', 'Regular monitoring'],
  },
  {
    id: 'kishan-credit',
    icon: Tractor,
    color: 'warning',
    amount: 'Up to ₹3 Lakh',
    eligibility: 'Land Holding Farmers',
    features: ['Low interest rates', 'Flexible repayment', 'Crop loan facility', 'Equipment finance'],
  },
  {
    id: 'irrigation',
    icon: Droplets,
    color: 'info',
    amount: '90% Subsidy',
    eligibility: 'Small Farmers',
    features: ['Drip irrigation', 'Sprinkler systems', 'Water conservation', 'Technical support'],
  },
  {
    id: 'solar-pump',
    icon: Zap,
    color: 'secondary',
    amount: '60% Subsidy',
    eligibility: 'All Farmers',
    features: ['Solar water pumps', 'Grid connection', 'Maintenance support', 'Energy savings'],
  },
];

const additionalSchemes = [
  {
    name: 'Pradhan Mantri Fasal Bima Yojana',
    description: 'Comprehensive crop insurance with premium subsidy',
    status: 'Active',
    link: 'https://pmfby.gov.in/'
  },
  {
    name: 'e-NAM (National Agriculture Market)',
    description: 'Online trading platform for agricultural commodities',
    status: 'Active',
    link: 'https://www.enam.gov.in/'
  },
  {
    name: 'Kisan Rail',
    description: 'Special trains for transportation of agricultural products',
    status: 'Active',
    link: 'https://www.indianrailways.gov.in/'
  },
  {
    name: 'Paramparagat Krishi Vikas Yojana',
    description: 'Promotion of organic farming practices',
    status: 'Active',
    link: 'https://pgsindia-ncof.gov.in/'
  },
];

const GovernmentSchemes = () => {
  const { t } = useLanguage();

  const getColorClasses = (color: string) => {
    const colorMap = {
      success: 'bg-success/10 text-success border-success/20',
      primary: 'bg-primary/10 text-primary border-primary/20',
      accent: 'bg-accent/10 text-accent-foreground border-accent/20',
      warning: 'bg-warning/10 text-warning-foreground border-warning/20',
      info: 'bg-blue-50 text-blue-700 border-blue-200',
      secondary: 'bg-secondary/50 text-secondary-foreground border-secondary/20',
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.primary;
  };

  return (
    <div id="schemes" className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4 animate-slide-up">
        <h2 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          {t('schemesTitle')}
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Comprehensive list of government schemes and subsidies available for farmers across India
        </p>
      </div>

      {/* Main Schemes Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {schemes.map((scheme, index) => {
          const Icon = scheme.icon;
          return (
            <Card 
              key={scheme.id}
              className="shadow-card hover:shadow-glow transition-smooth animate-slide-up border-primary/20 overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader className={`${getColorClasses(scheme.color)} border-b`}>
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-full bg-white/20">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{t(scheme.id)}</CardTitle>
                    <CardDescription className="opacity-80">
                      {scheme.eligibility}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                {/* Amount */}
                <div className="text-center py-3 bg-gradient-secondary rounded-lg">
                  <p className="text-2xl font-bold text-primary">{scheme.amount}</p>
                  <p className="text-sm text-muted-foreground">Benefit Amount</p>
                </div>

                {/* Features */}
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">Key Features:</h4>
                  <ul className="space-y-1">
                    {scheme.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center space-x-2 text-sm">
                        <CheckCircle className="w-3 h-3 text-success flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Apply Button */}
                <Button 
                  className="w-full mt-4 bg-gradient-primary hover:shadow-glow transition-smooth"
                  size="sm"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Apply Online
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Additional Schemes */}
      <Card className="shadow-card border-primary/20 hover:shadow-glow transition-smooth animate-slide-up">
        <CardHeader className="bg-gradient-accent text-accent-foreground rounded-t-lg">
          <CardTitle className="flex items-center space-x-2">
            <FileText className="w-5 h-5" />
            <span>Additional Government Initiatives</span>
          </CardTitle>
          <CardDescription className="text-accent-foreground/80">
            Other important schemes and platforms for farmers
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid md:grid-cols-2 gap-4">
            {additionalSchemes.map((scheme, index) => (
              <div 
                key={index}
                className="p-4 border border-border rounded-lg hover:border-primary/40 transition-smooth group"
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-primary group-hover:text-primary-glow transition-smooth">
                    {scheme.name}
                  </h4>
                  <span className="text-xs bg-success/10 text-success px-2 py-1 rounded-full">
                    {scheme.status}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  {scheme.description}
                </p>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-primary/20 hover:bg-primary/10 transition-smooth"
                  onClick={() => window.open(scheme.link, '_blank')}
                >
                  <ExternalLink className="w-3 h-3 mr-2" />
                  Learn More
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Help Section */}
      <Card className="shadow-card border-primary/20 hover:shadow-glow transition-smooth animate-slide-up">
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full">
              <Users className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Need Help with Applications?</h3>
              <p className="text-muted-foreground mb-4">
                Our government trainer program can help you navigate through various schemes and application processes
              </p>
              <Button 
                className="bg-gradient-primary hover:shadow-glow transition-smooth"
                onClick={() => {
                  const element = document.querySelector('#trainer');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <Users className="w-4 h-4 mr-2" />
                Connect with Trainer
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GovernmentSchemes;