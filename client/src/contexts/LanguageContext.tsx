import React, { createContext, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

type Language = 'en' | 'ar';
type Direction = 'ltr' | 'rtl';

interface LanguageContextType {
  language: Language;
  direction: Direction;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: React.ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const { i18n } = useTranslation();
  const [language, setLanguageState] = useState<Language>('en');
  const [direction, setDirection] = useState<Direction>('ltr');

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    setDirection(lang === 'ar' ? 'rtl' : 'ltr');
    i18n.changeLanguage(lang);
    
    // Update document direction and language
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    
    // Update body class for RTL-specific styling
    document.body.classList.remove('rtl', 'ltr');
    document.body.classList.add(lang === 'ar' ? 'rtl' : 'ltr');
  };

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'ar' : 'en';
    setLanguage(newLang);
  };

  useEffect(() => {
    // Initialize language from i18n
    const currentLang = i18n.language as Language;
    if (currentLang && ['en', 'ar'].includes(currentLang)) {
      setLanguage(currentLang);
    } else {
      // Fallback to English if language is not supported
      setLanguage('en');
    }
  }, [i18n.language]);

  const value: LanguageContextType = {
    language,
    direction,
    setLanguage,
    toggleLanguage,
    isRTL: direction === 'rtl',
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
