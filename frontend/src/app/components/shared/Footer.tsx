import { Link } from "react-router";
import { Shield, Mail, Phone, MapPin } from "lucide-react";
import { useTranslation } from 'react-i18next';

export function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="bg-[--color-trust-blue] text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-white to-[--color-security-green] rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-[--color-trust-blue]" />
              </div>
              <span className="text-lg font-semibold">{t('common.propertyGuardEgypt')}</span>
            </div>
            <p className="text-sm text-white/80">
              {t('footer.description')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">{t('footer.quickLinks')}</h4>
            <div className="space-y-2 text-sm">
              <Link to="/" className="block text-white/80 hover:text-white transition-colors">
                {t('common.home')}
              </Link>
              <Link to="/services" className="block text-white/80 hover:text-white transition-colors">
                {t('common.services')}
              </Link>
              <Link to="/pricing" className="block text-white/80 hover:text-white transition-colors">
                {t('common.pricing')}
              </Link>
              <Link to="/about" className="block text-white/80 hover:text-white transition-colors">
                {t('common.aboutUs')}
              </Link>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">{t('footer.services')}</h4>
            <div className="space-y-2 text-sm text-white/80">
              <p>{t('footer.legalVerification')}</p>
              <p>{t('footer.engineeringInspection')}</p>
              <p>{t('footer.governmentVerification')}</p>
              <p>{t('footer.fullProtection')}</p>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">{t('footer.contactUs')}</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2 text-white/80">
                <Phone className="w-4 h-4" />
                <span>+20 123 456 7890</span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <Mail className="w-4 h-4" />
                <span>info@propertyguard.eg</span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <MapPin className="w-4 h-4" />
                <span>Cairo, Egypt</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 text-center text-sm text-white/80">
          <p>{t('common.allRights')}</p>
        </div>
      </div>
    </footer>
  );
}
