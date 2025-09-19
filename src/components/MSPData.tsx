import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { TrendingUp, IndianRupee, Calendar, Activity } from 'lucide-react';

// Mock MSP data
const mspData = [
  { month: 'Jan', rice: 2040, wheat: 2125, sugarcane: 315, cotton: 6080 },
  { month: 'Feb', rice: 2040, wheat: 2125, sugarcane: 315, cotton: 6080 },
  { month: 'Mar', rice: 2040, wheat: 2125, sugarcane: 315, cotton: 6080 },
  { month: 'Apr', rice: 2183, wheat: 2125, sugarcane: 315, cotton: 6080 },
  { month: 'May', rice: 2183, wheat: 2275, sugarcane: 315, cotton: 6080 },
  { month: 'Jun', rice: 2183, wheat: 2275, sugarcane: 315, cotton: 6080 },
];

const currentRates = [
  { crop: 'Rice', msp: 2183, market: 2250, change: 3.1 },
  { crop: 'Wheat', msp: 2275, market: 2180, change: -4.2 },
  { crop: 'Sugarcane', msp: 315, market: 340, change: 7.9 },
  { crop: 'Cotton', msp: 6080, market: 6200, change: 2.0 },
  { crop: 'Maize', msp: 1962, market: 2050, change: 4.5 },
  { crop: 'Soybean', msp: 4300, market: 4150, change: -3.5 },
];

const MSPData = () => {
  const { t } = useLanguage();

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4 animate-slide-up">
        <h2 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          {t('mspTitle')}
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Real-time minimum support prices and market trends for major crops
        </p>
      </div>

      {/* Current Rates Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentRates.map((crop, index) => (
          <Card 
            key={crop.crop} 
            className="shadow-card hover:shadow-glow transition-smooth animate-slide-up border-primary/20"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg text-primary">{crop.crop}</CardTitle>
                  <CardDescription>MSP vs Market Rate</CardDescription>
                </div>
                <div className={`p-2 rounded-full ${
                  crop.change >= 0 ? 'bg-success/10' : 'bg-destructive/10'
                }`}>
                  <TrendingUp className={`w-4 h-4 ${
                    crop.change >= 0 ? 'text-success' : 'text-destructive rotate-180'
                  }`} />
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">MSP Rate</p>
                  <p className="text-xl font-bold flex items-center">
                    <IndianRupee className="w-4 h-4 mr-1" />
                    {crop.msp}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Market Rate</p>
                  <p className="text-xl font-bold flex items-center">
                    <IndianRupee className="w-4 h-4 mr-1" />
                    {crop.market}
                  </p>
                </div>
              </div>
              <div className={`p-3 rounded-lg ${
                crop.change >= 0 ? 'bg-success/10' : 'bg-destructive/10'
              }`}>
                <p className={`text-sm font-medium ${
                  crop.change >= 0 ? 'text-success' : 'text-destructive'
                }`}>
                  {crop.change >= 0 ? '+' : ''}{crop.change}% vs MSP
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Price Trends Chart */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Line Chart - Price Trends */}
        <Card className="shadow-card border-primary/20 hover:shadow-glow transition-smooth animate-slide-up">
          <CardHeader className="bg-gradient-secondary rounded-t-lg">
            <CardTitle className="flex items-center space-x-2">
              <Activity className="w-5 h-5 text-primary" />
              <span>MSP Price Trends</span>
            </CardTitle>
            <CardDescription>
              Monthly minimum support price changes
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={mspData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="month" 
                  stroke="hsl(var(--muted-foreground))"
                />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="rice" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  name="Rice"
                />
                <Line 
                  type="monotone" 
                  dataKey="wheat" 
                  stroke="hsl(var(--success))" 
                  strokeWidth={2}
                  name="Wheat"
                />
                <Line 
                  type="monotone" 
                  dataKey="cotton" 
                  stroke="hsl(var(--warning))" 
                  strokeWidth={2}
                  name="Cotton"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Bar Chart - Current Comparison */}
        <Card className="shadow-card border-primary/20 hover:shadow-glow transition-smooth animate-slide-up">
          <CardHeader className="bg-gradient-accent rounded-t-lg">
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-accent-foreground" />
              <span>Current Market vs MSP</span>
            </CardTitle>
            <CardDescription className="text-accent-foreground/80">
              Comparison of market rates with MSP
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={currentRates.slice(0, 4)}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="crop" 
                  stroke="hsl(var(--muted-foreground))"
                />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Bar 
                  dataKey="msp" 
                  fill="hsl(var(--primary))" 
                  name="MSP Rate"
                  radius={[4, 4, 0, 0]}
                />
                <Bar 
                  dataKey="market" 
                  fill="hsl(var(--success))" 
                  name="Market Rate"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Future Predictions */}
      <Card className="shadow-card border-primary/20 hover:shadow-glow transition-smooth animate-slide-up">
        <CardHeader className="bg-gradient-primary text-primary-foreground rounded-t-lg">
          <CardTitle>Future Price Predictions</CardTitle>
          <CardDescription className="text-primary-foreground/80">
            AI-powered price forecasts for the next 3 months
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { crop: 'Rice', current: 2183, predicted: 2250, trend: 'up' },
              { crop: 'Wheat', current: 2275, predicted: 2200, trend: 'down' },
              { crop: 'Cotton', current: 6080, predicted: 6300, trend: 'up' },
              { crop: 'Soybean', current: 4300, predicted: 4450, trend: 'up' },
            ].map((item) => (
              <div key={item.crop} className="space-y-3">
                <h4 className="font-semibold text-primary">{item.crop}</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Current:</span>
                    <span className="font-medium">₹{item.current}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Predicted:</span>
                    <span className={`font-medium ${
                      item.trend === 'up' ? 'text-success' : 'text-destructive'
                    }`}>
                      ₹{item.predicted}
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className={`h-full rounded-full ${
                        item.trend === 'up' ? 'bg-success' : 'bg-destructive'
                      }`}
                      style={{
                        width: `${((item.predicted - item.current) / item.current * 100) > 0 ? 
                          Math.min(((item.predicted - item.current) / item.current * 100) * 10, 100) : 
                          100 - Math.min(Math.abs((item.predicted - item.current) / item.current * 100) * 10, 100)}%`
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MSPData;