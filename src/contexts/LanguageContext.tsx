import React, { createContext, useContext, useState } from 'react';

interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

const translations: Translations = {
  en: {
    // Navigation
    home: 'Home',
    govTrainer: 'Govt Trainer',
    fertilizer: 'Nearby Fertilizer',
    schemes: 'Govt Schemes',
    contact: 'Contact Us',
    
    // Hero Section
    heroTitle: 'AI-Powered Crop Intelligence',
    heroSubtitle: 'Smart farming solutions with weather integration and government support',
    predictCrop: 'Predict Crop',
    
    // Crop Prediction Form
    cropPredictionTitle: 'Crop Prediction',
    location: 'Location',
    enterLocation: 'Enter your city name',
    soilComposition: 'Soil Composition',
    nitrogen: 'Nitrogen (N)',
    phosphorus: 'Phosphorus (P)',
    potassium: 'Potassium (K)',
    phLevel: 'pH Level',
    rainfall: 'Rainfall (mm)',
    predict: 'Predict Best Crop',
    
    // Results
    recommendedCrop: 'Recommended Crop',
    topSuggestions: 'Top 3 Suggestions',
    weatherInfo: 'Current Weather',
    temperature: 'Temperature',
    humidity: 'Humidity',
    
    // MSP Section
    mspTitle: 'Minimum Support Price (MSP)',
    currentRates: 'Current Crop Rates',
    
    // Government Schemes
    schemesTitle: 'Government Schemes for Farmers',
    pmKisan: 'PM-KISAN',
    pmKisanDesc: '₹6,000 annually for small farmers',
    cropInsurance: 'Crop Insurance',
    cropInsuranceDesc: 'Financial protection against crop loss',
    soilHealth: 'Soil Health Card',
    soilHealthDesc: 'Free soil testing and recommendations',
    
    // Contact
    contactTitle: 'Contact Information',
    helpline: 'Farmer Helpline',
    email: 'Email Support',
    
    // Language
    language: 'Language',
  },
  
  hi: {
    // Navigation
    home: 'होम',
    govTrainer: 'सरकारी प्रशिक्षक',
    fertilizer: 'नजदीकी उर्वरक',
    schemes: 'सरकारी योजनाएं',
    contact: 'संपर्क करें',
    
    // Hero Section
    heroTitle: 'AI-संचालित फसल बुद्धिमत्ता',
    heroSubtitle: 'मौसम एकीकरण और सरकारी सहायता के साथ स्मार्ट खेती समाधान',
    predictCrop: 'फसल की भविष्यवाणी करें',
    
    // Crop Prediction Form
    cropPredictionTitle: 'फसल पूर्वानुमान',
    location: 'स्थान',
    enterLocation: 'अपने शहर का नाम दर्ज करें',
    soilComposition: 'मिट्टी की संरचना',
    nitrogen: 'नाइट्रोजन (N)',
    phosphorus: 'फॉस्फोरस (P)',
    potassium: 'पोटैशियम (K)',
    phLevel: 'pH स्तर',
    rainfall: 'वर्षा (मिमी)',
    predict: 'सर्वोत्तम फसल की भविष्यवाणी करें',
    
    // Results
    recommendedCrop: 'अनुशंसित फसल',
    topSuggestions: 'शीर्ष 3 सुझाव',
    weatherInfo: 'वर्तमान मौसम',
    temperature: 'तापमान',
    humidity: 'नमी',
    
    // MSP Section
    mspTitle: 'न्यूनतम समर्थन मूल्य (MSP)',
    currentRates: 'वर्तमान फसल दरें',
    
    // Government Schemes
    schemesTitle: 'किसानों के लिए सरकारी योजनाएं',
    pmKisan: 'पीएम-किसान',
    pmKisanDesc: 'छोटे किसानों के लिए सालाना ₹6,000',
    cropInsurance: 'फसल बीमा',
    cropInsuranceDesc: 'फसल हानि के विरुद्ध वित्तीय सुरक्षा',
    soilHealth: 'मृदा स्वास्थ्य कार्ड',
    soilHealthDesc: 'मुफ्त मिट्टी परीक्षण और सुझाव',
    
    // Contact
    contactTitle: 'संपर्क जानकारी',
    helpline: 'किसान हेल्पलाइन',
    email: 'ईमेल सहायता',
    
    // Language
    language: 'भाषा',
  },
  
  mr: {
    // Navigation
    home: 'मुख्य',
    govTrainer: 'सरकारी प्रशिक्षक',
    fertilizer: 'जवळील खत',
    schemes: 'सरकारी योजना',
    contact: 'संपर्क',
    
    // Hero Section
    heroTitle: 'AI-चालित पीक बुद्धिमत्ता',
    heroSubtitle: 'हवामान एकीकरण आणि सरकारी सहाय्यासह स्मार्ट शेती समाधान',
    predictCrop: 'पीक अंदाज',
    
    // Crop Prediction Form
    cropPredictionTitle: 'पीक अंदाज',
    location: 'स्थान',
    enterLocation: 'आपल्या शहराचे नाव टाका',
    soilComposition: 'मातीची रचना',
    nitrogen: 'नायट्रोजन (N)',
    phosphorus: 'फॉस्फरस (P)',
    potassium: 'पोटॅशियम (K)',
    phLevel: 'pH पातळी',
    rainfall: 'पाऊस (मिमी)',
    predict: 'सर्वोत्तम पिकाचा अंदाज लावा',
    
    // Results
    recommendedCrop: 'शिफारसी पीक',
    topSuggestions: 'टॉप 3 सुचना',
    weatherInfo: 'सद्य हवामान',
    temperature: 'तापमान',
    humidity: 'आर्द्रता',
    
    // MSP Section
    mspTitle: 'किमान आधार मूल्य (MSP)',
    currentRates: 'सद्य पीक दर',
    
    // Government Schemes
    schemesTitle: 'शेतकऱ्यांसाठी सरकारी योजना',
    pmKisan: 'पीएम-किसान',
    pmKisanDesc: 'लहान शेतकऱ्यांना वार्षिक ₹6,000',
    cropInsurance: 'पीक विमा',
    cropInsuranceDesc: 'पीक नुकसानीविरुद्ध आर्थिक संरक्षण',
    soilHealth: 'माती आरोग्य कार्ड',
    soilHealthDesc: 'मोफत माती चाचणी आणि शिफारसी',
    
    // Contact
    contactTitle: 'संपर्क माहिती',
    helpline: 'शेतकरी हेल्पलाइन',
    email: 'ईमेल सहाय्य',
    
    // Language
    language: 'भाषा',
  },
  
  kn: {
    // Navigation
    home: 'ಮುಖ್ಯ',
    govTrainer: 'ಸರ್ಕಾರಿ ತರಬೇತುದಾರ',
    fertilizer: 'ಹತಿರದ ಗೊಬ್ಬರ',
    schemes: 'ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು',
    contact: 'ಸಂಪರ್ಕಿಸಿ',
    
    // Hero Section
    heroTitle: 'AI-ಚಾಲಿತ ಬೆಳೆ ಬುದ್ಧಿಮತ್ತೆ',
    heroSubtitle: 'ಹವಾಮಾನ ಏಕೀಕರಣ ಮತ್ತು ಸರ್ಕಾರಿ ಬೆಂಬಲದೊಂದಿಗೆ ಸ್ಮಾರ್ಟ್ ಕೃಷಿ ಪರಿಹಾರಗಳು',
    predictCrop: 'ಬೆಳೆ ಭವಿಷ್ಯ',
    
    // Crop Prediction Form
    cropPredictionTitle: 'ಬೆಳೆ ಭವಿಷ್ಯವಾಣಿ',
    location: 'ಸ್ಥಳ',
    enterLocation: 'ನಿಮ್ಮ ನಗರದ ಹೆಸರನ್ನು ನಮೂದಿಸಿ',
    soilComposition: 'ಮಣ್ಣಿನ ಸಂಯೋಜನೆ',
    nitrogen: 'ಸಾರಜನಕ (N)',
    phosphorus: 'ರಂಜಕ (P)',
    potassium: 'ಪೊಟ್ಯಾಸಿಯಮ್ (K)',
    phLevel: 'pH ಮಟ್ಟ',
    rainfall: 'ಮಳೆ (ಮಿಮೀ)',
    predict: 'ಅತ್ಯುತ್ತಮ ಬೆಳೆ ಭವಿಷ್ಯವಾಣಿ',
    
    // Results
    recommendedCrop: 'ಶಿಫಾರಸು ಮಾಡಿದ ಬೆಳೆ',
    topSuggestions: 'ಟಾಪ್ 3 ಸಲಹೆಗಳು',
    weatherInfo: 'ಪ್ರಸ್ತುತ ಹವಾಮಾನ',
    temperature: 'ತಾಪಮಾನ',
    humidity: 'ತೇವಾಂಶ',
    
    // MSP Section
    mspTitle: 'ಕನಿಷ್ಠ ಬೆಂಬಲ ಬೆಲೆ (MSP)',
    currentRates: 'ಪ್ರಸ್ತುತ ಬೆಳೆ ದರಗಳು',
    
    // Government Schemes
    schemesTitle: 'ರೈತರಿಗೆ ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು',
    pmKisan: 'ಪಿಎಂ-ಕಿಸಾನ್',
    pmKisanDesc: 'ಸಣ್ಣ ರೈತರಿಗೆ ವಾರ್ಷಿಕ ₹6,000',
    cropInsurance: 'ಬೆಳೆ ವಿಮೆ',
    cropInsuranceDesc: 'ಬೆಳೆ ನಷ್ಟದ ವಿರುದ್ಧ ಆರ್ಥಿಕ ರಕ್ಷಣೆ',
    soilHealth: 'ಮಣ್ಣಿನ ಆರೋಗ್ಯ ಕಾರ್ಡ್',
    soilHealthDesc: 'ಉಚಿತ ಮಣ್ಣಿನ ಪರೀಕ್ಷೆ ಮತ್ತು ಶಿಫಾರಸುಗಳು',
    
    // Contact
    contactTitle: 'ಸಂಪರ್ಕ ಮಾಹಿತಿ',
    helpline: 'ರೈತ ಸಹಾಯವಾಣಿ',
    email: 'ಇಮೇಲ್ ಬೆಂಬಲ',
    
    // Language
    language: 'ಭಾಷೆ',
  },
};

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
  languages: { code: string; name: string; native: string }[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState('en');

  const t = (key: string): string => {
    return translations[language]?.[key] || translations.en[key] || key;
  };

  const languages = [
    { code: 'en', name: 'English', native: 'English' },
    { code: 'hi', name: 'Hindi', native: 'हिन्दी' },
    { code: 'mr', name: 'Marathi', native: 'मराठी' },
    { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ' },
  ];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, languages }}>
      {children}
    </LanguageContext.Provider>
  );
};