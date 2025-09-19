import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/contexts/LanguageContext';
import { MapPin, Phone, Clock, Star, Navigation, Search, Truck } from 'lucide-react';

// Mock fertilizer dealer data
const dealers = [
  {
    id: 1,
    name: 'Kisan Fertilizer Center',
    address: 'Main Market, Sector 15, Chandigarh',
    phone: '+91-9876543210',
    distance: '2.3 km',
    rating: 4.8,
    timing: '8:00 AM - 7:00 PM',
    products: ['NPK', 'Urea', 'Organic', 'Pesticides'],
    verified: true,
  },
  {
    id: 2,
    name: 'Bharat Agro Services',
    address: 'Industrial Area Phase 1, Chandigarh',
    phone: '+91-9876543211',
    distance: '3.1 km',
    rating: 4.6,
    timing: '9:00 AM - 8:00 PM',
    products: ['DAP', 'MOP', 'Zinc', 'Seeds'],
    verified: true,
  },
  {
    id: 3,
    name: 'Punjab Fertilizer Depot',
    address: 'Manimajra, Chandigarh',
    phone: '+91-9876543212',
    distance: '4.5 km',
    rating: 4.4,
    timing: '7:30 AM - 7:30 PM',
    products: ['SSP', 'Compost', 'Micronutrients', 'Tools'],
    verified: false,
  },
  {
    id: 4,
    name: 'Green Valley Agro',
    address: 'Sector 22, Chandigarh',
    phone: '+91-9876543213',
    distance: '5.2 km',
    rating: 4.7,
    timing: '8:30 AM - 6:30 PM',
    products: ['Bio Fertilizer', 'Vermi Compost', 'Growth Promoter'],
    verified: true,
  },
];

const FertilizerLocator = () => {
  const { t } = useLanguage();
  const [searchLocation, setSearchLocation] = useState('');
  const [filteredDealers, setFilteredDealers] = useState(dealers);

  const handleSearch = () => {
    if (!searchLocation.trim()) {
      setFilteredDealers(dealers);
      return;
    }
    
    const filtered = dealers.filter(dealer =>
      dealer.name.toLowerCase().includes(searchLocation.toLowerCase()) ||
      dealer.address.toLowerCase().includes(searchLocation.toLowerCase())
    );
    setFilteredDealers(filtered);
  };

  return (
    <div id="fertilizer" className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4 animate-slide-up">
        <h2 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          {t('fertilizer')} Dealers
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Find verified fertilizer dealers and agro-input suppliers near your location
        </p>
      </div>

      {/* Search Bar */}
      <Card className="shadow-card border-primary/20 animate-slide-up">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Enter your location or dealer name..."
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                className="border-primary/20 focus:border-primary"
              />
            </div>
            <Button 
              onClick={handleSearch}
              className="bg-gradient-primary hover:shadow-glow transition-smooth"
            >
              <Search className="w-4 h-4 mr-2" />
              Find Dealers
            </Button>
            <Button 
              variant="outline"
              className="border-primary/20 hover:bg-primary/10"
            >
              <Navigation className="w-4 h-4 mr-2" />
              Use GPS
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Dealers List */}
      <div className="space-y-4">
        {filteredDealers.map((dealer, index) => (
          <Card 
            key={dealer.id}
            className="shadow-card hover:shadow-glow transition-smooth animate-slide-up border-primary/20"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <CardContent className="p-6">
              <div className="grid lg:grid-cols-3 gap-6">
                {/* Dealer Info */}
                <div className="lg:col-span-2 space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="text-xl font-semibold text-primary">{dealer.name}</h3>
                        {dealer.verified && (
                          <span className="bg-success/10 text-success px-2 py-1 rounded-full text-xs font-medium">
                            Verified
                          </span>
                        )}
                      </div>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span>{dealer.rating}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4" />
                          <span>{dealer.distance}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-sm">
                      <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>{dealer.address}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>{dealer.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Clock className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>{dealer.timing}</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Available Products:</h4>
                    <div className="flex flex-wrap gap-2">
                      {dealer.products.map((product, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-secondary/50 text-secondary-foreground rounded-full text-sm"
                        >
                          {product}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-3">
                  <Button 
                    className="w-full bg-gradient-primary hover:shadow-glow transition-smooth"
                    onClick={() => window.open(`tel:${dealer.phone}`, '_self')}
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Call Now
                  </Button>
                  <Button 
                    variant="outline"
                    className="w-full border-primary/20 hover:bg-primary/10"
                    onClick={() => window.open(`https://maps.google.com/?q=${encodeURIComponent(dealer.address)}`, '_blank')}
                  >
                    <MapPin className="w-4 h-4 mr-2" />
                    Get Directions
                  </Button>
                  <Button 
                    variant="outline"
                    className="w-full border-success/20 hover:bg-success/10 text-success"
                  >
                    <Truck className="w-4 h-4 mr-2" />
                    Check Delivery
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Emergency Contacts */}
      <Card className="shadow-card border-primary/20 hover:shadow-glow transition-smooth animate-slide-up">
        <CardHeader className="bg-gradient-accent text-accent-foreground rounded-t-lg">
          <CardTitle>Emergency Fertilizer Helpline</CardTitle>
          <CardDescription className="text-accent-foreground/80">
            24/7 support for urgent fertilizer requirements
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="space-y-2">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Phone className="w-6 h-6 text-primary" />
              </div>
              <h4 className="font-semibold">Emergency Hotline</h4>
              <p className="text-muted-foreground">1800-180-1551</p>
            </div>
            <div className="space-y-2">
              <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mx-auto">
                <Truck className="w-6 h-6 text-success" />
              </div>
              <h4 className="font-semibold">Bulk Orders</h4>
              <p className="text-muted-foreground">1800-180-1552</p>
            </div>
            <div className="space-y-2">
              <div className="w-12 h-12 bg-warning/10 rounded-full flex items-center justify-center mx-auto">
                <MapPin className="w-6 h-6 text-warning-foreground" />
              </div>
              <h4 className="font-semibold">Nearest Depot</h4>
              <p className="text-muted-foreground">1800-180-1553</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FertilizerLocator;