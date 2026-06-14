import { Outlet, Link, useLocation } from 'react-router';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from '../components/shared/LanguageSwitcher';
import { useAuth } from '../../contexts/AuthContext';
import { DarekLogo } from '../components/shared/DarekLogo';

export function PublicLayout() {
  const location = useLocation();
  const { t } = useTranslation();
  const { user, isAuthenticated } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const getDashboardLink = () => {
    if (!user) return '/customer';
    if (user.role === 'Admin') return '/admin';
    if (user.role === 'Lawyer') return '/expert/lawyer';
    if (user.role === 'Engineer') return '/expert/engineer';
    if (user.role === 'GovExpert') return '/expert/government';
    return '/customer';
  };

  const navigation = [
    { name: t('common.home'), href: '/' },
    { name: t('common.services'), href: '/services' },
    { name: t('common.about'), href: '/about' },
    { name: t('common.contact'), href: '/contact' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center gap-2">
              <DarekLogo />
              <div>
                <div className="font-bold text-lg text-[#0f172a]">{t('nav.propertyGuard')}</div>
                <div className="text-xs text-[#059669]">{t('home.heroTitle')}</div>
              </div>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              {navigation.map((item) => (
                <Link key={item.href} to={item.href}
                  className={`text-sm transition-colors ${location.pathname === item.href ? 'text-[#1e3a8a] font-medium' : 'text-muted-foreground hover:text-[#1e3a8a]'}`}>
                  {item.name}
                </Link>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-3">
              <LanguageSwitcher />
              {isAuthenticated ? (
                <Link to={getDashboardLink()}
                  className="px-5 py-2.5 bg-[#059669] text-white rounded-lg hover:bg-[#047857] transition-colors shadow-sm">
                  {t('common.dashboard')}
                </Link>
              ) : (
                <>
                  <Link to="/login" className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {t('common.login')}
                  </Link>
                  <Link to="/customer/create-request"
                    className="px-5 py-2.5 bg-[#059669] text-white rounded-lg hover:bg-[#047857] transition-colors shadow-sm">
                    {t('nav.startVerification')}
                  </Link>
                </>
              )}
            </div>

            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 text-foreground">
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-border">
              <div className="flex flex-col gap-4">
                {navigation.map((item) => (
                  <Link key={item.href} to={item.href} onClick={() => setMobileMenuOpen(false)}
                    className={`text-sm px-2 py-2 ${location.pathname === item.href ? 'text-[#1e3a8a] font-medium' : 'text-muted-foreground'}`}>
                    {item.name}
                  </Link>
                ))}
                <div className="flex items-center gap-2 px-2">
                  <LanguageSwitcher />
                </div>
                <div className="flex flex-col gap-2 pt-2 border-t border-border">
                  {isAuthenticated ? (
                    <Link to={getDashboardLink()} onClick={() => setMobileMenuOpen(false)}
                      className="px-4 py-2 text-sm text-center bg-[#059669] text-white rounded-lg">{t('common.dashboard')}</Link>
                  ) : (
                    <>
                      <Link to="/login" onClick={() => setMobileMenuOpen(false)}
                        className="px-4 py-2 text-sm text-center border border-border rounded-lg">{t('common.login')}</Link>
                      <Link to="/customer/create-request" onClick={() => setMobileMenuOpen(false)}
                        className="px-4 py-2 text-sm text-center bg-[#059669] text-white rounded-lg">{t('nav.startVerification')}</Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </nav>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="bg-[#0f172a] text-white mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <DarekLogo />
                <div>
                  <div className="font-bold text-lg">{t('nav.propertyGuard')}</div>
                  <div className="text-xs text-[#059669]">{t('home.heroTitle')}</div>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{t('common.services')}</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link to="/services" className="hover:text-white transition-colors">{t('common.services')}</Link></li>
                <li><Link to="/services#pricing" className="hover:text-white transition-colors">{t('common.pricing')}</Link></li>
                <li><Link to="/about" className="hover:text-white transition-colors">{t('common.about')}</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">{t('common.contact')}</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{t('common.contact')}</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>{t('locations.cairo')}</li>
                <li>+20 123 456 7890</li>
                <li>support@propertyguard.eg</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-sm text-gray-400 text-center">
            <p>&copy; 2026 {t('nav.propertyGuard')}.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
