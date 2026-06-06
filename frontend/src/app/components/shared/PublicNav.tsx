import { Link } from "react-router";
import { Shield, Menu } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import { cn } from "../ui/utils";
import { useTranslation } from 'react-i18next';

export function PublicNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <nav className="bg-white border-b border-border sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-[--color-trust-blue] to-[--color-security-green] rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-semibold text-[--color-trust-blue]">
              {t('common.propertyGuardEgypt')}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-foreground hover:text-[--color-trust-blue] transition-colors">
              {t('common.home')}
            </Link>
            <Link to="/services" className="text-foreground hover:text-[--color-trust-blue] transition-colors">
              {t('common.services')}
            </Link>
            <Link to="/pricing" className="text-foreground hover:text-[--color-trust-blue] transition-colors">
              {t('common.pricing')}
            </Link>
            <Link to="/about" className="text-foreground hover:text-[--color-trust-blue] transition-colors">
              {t('common.about')}
            </Link>
            <Link to="/contact" className="text-foreground hover:text-[--color-trust-blue] transition-colors">
              {t('common.contact')}
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" asChild>
              <Link to="/customer">{t('common.customerPortal')}</Link>
            </Button>
            <Button className="bg-[--color-trust-blue] hover:bg-[--color-trust-blue-dark]" asChild>
              <Link to="/customer/create-request">{t('common.startVerification')}</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn(
            "md:hidden overflow-hidden transition-all duration-300",
            mobileMenuOpen ? "max-h-96 pb-4" : "max-h-0"
          )}
        >
          <div className="flex flex-col gap-3">
            <Link to="/" className="py-2 text-foreground hover:text-[--color-trust-blue]">
              {t('common.home')}
            </Link>
            <Link to="/services" className="py-2 text-foreground hover:text-[--color-trust-blue]">
              {t('common.services')}
            </Link>
            <Link to="/pricing" className="py-2 text-foreground hover:text-[--color-trust-blue]">
              {t('common.pricing')}
            </Link>
            <Link to="/about" className="py-2 text-foreground hover:text-[--color-trust-blue]">
              {t('common.about')}
            </Link>
            <Link to="/contact" className="py-2 text-foreground hover:text-[--color-trust-blue]">
              {t('common.contact')}
            </Link>
            <Button variant="outline" className="w-full" asChild>
              <Link to="/customer">{t('common.customerPortal')}</Link>
            </Button>
            <Button className="w-full bg-[--color-trust-blue] hover:bg-[--color-trust-blue-dark]" asChild>
              <Link to="/customer/create-request">{t('common.startVerification')}</Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
