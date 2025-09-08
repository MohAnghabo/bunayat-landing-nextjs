import React from 'react';
import { Button } from './button';
import { useLanguage } from '@/contexts/LanguageContext';
import { Languages } from 'lucide-react';

export const LanguageSwitcher: React.FC = () => {
  const { language, toggleLanguage, isRTL } = useLanguage();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className="flex items-center space-x-2 rtl:space-x-reverse text-primary hover:text-primary-foreground hover:bg-primary transition-all duration-200 border border-primary/20 hover:border-primary"
      aria-label={`Switch to ${language === 'en' ? 'Arabic' : 'English'}`}
    >
      <Languages className="w-4 h-4" />
      <span className="font-medium">
        {language === 'en' ? 'العربية' : 'English'}
      </span>
    </Button>
  );
};

export const MobileLanguageSwitcher: React.FC = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <Button
      variant="ghost"
      onClick={toggleLanguage}
      className="w-full justify-start text-primary hover:text-primary-foreground hover:bg-primary transition-all duration-200 border border-primary/20 hover:border-primary"
      aria-label={`Switch to ${language === 'en' ? 'Arabic' : 'English'}`}
    >
      <Languages className="w-4 h-4 mr-2 rtl:mr-0 rtl:ml-2" />
      {language === 'en' ? 'العربية' : 'English'}
    </Button>
  );
};
