import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

export function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'ar' ? 'en' : 'ar';
    i18n.changeLanguage(newLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border hover:bg-muted transition-colors text-sm"
      title={i18n.language === 'ar' ? 'Switch to English' : 'التبديل للعربية'}
    >
      <Globe className="w-4 h-4" />
      <span>{i18n.language === 'ar' ? 'EN' : 'عربي'}</span>
    </button>
  );
}
