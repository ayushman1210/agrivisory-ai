import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useLanguage } from '@/contexts/LanguageContext';
import { Wheat, Globe, Phone, BookOpen, MapPin, Users } from 'lucide-react';

const Navigation = () => {
  const { language, setLanguage, t, languages } = useLanguage();

  const navigationItems = [
    { key: 'home', icon: Wheat, href: '#home' },
    { key: 'govTrainer', icon: Users, href: '#trainer' },
    { key: 'fertilizer', icon: MapPin, href: '#fertilizer' },
    { key: 'schemes', icon: BookOpen, href: '#schemes' },
    { key: 'contact', icon: Phone, href: '#contact' },
  ];

  return (
    <nav className="fixed top-0 w-full bg-card/80 backdrop-blur-lg border-b border-border/50 z-50 shadow-card">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center animate-pulse-glow">
              <Wheat className="w-6 h-6 text-primary-foreground" />
            </div>
            <div className="hidden md:block">
              <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                कृषि बुद्धि
              </h1>
              <p className="text-xs text-muted-foreground">AI Farm Intelligence</p>
            </div>
          </div>

          {/* Navigation Items */}
          <div className="hidden lg:flex items-center space-x-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.key}
                  variant="ghost"
                  size="sm"
                  className="flex items-center space-x-2 hover:bg-primary/10 hover:text-primary transition-smooth"
                  onClick={() => {
                    const element = document.querySelector(item.href);
                    element?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <Icon className="w-4 h-4" />
                  <span>{t(item.key)}</span>
                </Button>
              );
            })}
          </div>

          {/* Language Selector */}
          <div className="flex items-center space-x-3">
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-[140px] bg-background/80 border-primary/20 hover:border-primary/40 transition-smooth">
                <div className="flex items-center space-x-2">
                  <Globe className="w-4 h-4 text-primary" />
                  <SelectValue />
                </div>
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.code} value={lang.code}>
                    <div className="flex items-center space-x-2">
                      <span>{lang.native}</span>
                      <span className="text-muted-foreground text-sm">({lang.name})</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Mobile Menu Button */}
            <Button
              variant="outline"
              size="sm"
              className="lg:hidden border-primary/20 hover:bg-primary/10"
            >
              ☰
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="lg:hidden mt-4 pb-2">
          <div className="grid grid-cols-2 gap-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.key}
                  variant="ghost"
                  size="sm"
                  className="flex items-center justify-start space-x-2 hover:bg-primary/10"
                  onClick={() => {
                    const element = document.querySelector(item.href);
                    element?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm">{t(item.key)}</span>
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;