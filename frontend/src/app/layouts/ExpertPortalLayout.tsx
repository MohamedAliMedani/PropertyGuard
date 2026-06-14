import { Outlet, Link, useLocation, useNavigate } from 'react-router';
import { Home, FileText, Calendar, Bell, LogOut, Menu } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';
import { LanguageSwitcher } from '../components/shared/LanguageSwitcher';
import { DarekLogo } from '../components/shared/DarekLogo';

export function ExpertPortalLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const expertType = location.pathname.includes('/lawyer') ? 'Lawyer'
    : location.pathname.includes('/engineer') ? 'Engineer' : 'GovExpert';

  const baseUrl = location.pathname.includes('/lawyer') ? '/expert/lawyer'
    : location.pathname.includes('/engineer') ? '/expert/engineer' : '/expert/government';

  const navigation = [
    { name: t('common.dashboard'), href: baseUrl, icon: Home },
    { name: t('expert.myCases'), href: baseUrl, icon: FileText },
    ...(expertType !== 'GovExpert' ? [{ name: t('expert.scheduledVisits'), href: `${baseUrl}/schedule`, icon: Calendar }] : []),
  ];

  const handleLogout = () => { logout(); navigate('/'); };

  const initials = user?.fullName ? user.fullName.split(' ').map(n => n[0]).join('').slice(0, 2) : 'EX';

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 bg-white border-b border-border shadow-sm">
        <div className="flex items-center justify-between h-16 px-4 lg:px-6">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden p-2 hover:bg-muted rounded-lg">
              <Menu className="w-5 h-5" />
            </button>
            <Link to="/" className="flex items-center gap-2">
              <DarekLogo size="sm" />
              <span className="font-bold text-lg hidden sm:inline">{t('nav.propertyGuard')}</span>
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <button className="p-2 hover:bg-muted rounded-lg relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#dc2626] rounded-full" />
            </button>
            <div className="flex items-center gap-2 ps-3 border-s border-border">
              <div className="w-8 h-8 bg-[#1e3a8a] rounded-full flex items-center justify-center">
                <span className="text-white text-sm">{initials}</span>
              </div>
              <div className="hidden sm:block">
                <div className="text-sm font-medium">{user?.fullName}</div>
                <div className="text-xs text-muted-foreground">{expertType}</div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="flex">
        <aside className={`fixed lg:sticky top-16 start-0 z-30 h-[calc(100vh-4rem)] w-64 bg-white border-e border-border transition-transform lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : 'max-lg:-translate-x-full max-lg:rtl:translate-x-full'
        }`}>
          <nav className="p-4 space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              return (
                <Link key={item.name} to={item.href} onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                    isActive ? 'bg-[#1e3a8a] text-white' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}>
                  <Icon className="w-5 h-5" /><span className="text-sm">{item.name}</span>
                </Link>
              );
            })}
            <button onClick={handleLogout}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors mt-4 border-t border-border pt-4 w-full">
              <LogOut className="w-5 h-5" /><span className="text-sm">{t('common.logout')}</span>
            </button>
          </nav>
        </aside>
        {sidebarOpen && <div className="fixed inset-0 z-20 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />}
        <main className="flex-1 p-4 lg:p-6 min-h-[calc(100vh-4rem)]"><Outlet /></main>
      </div>
    </div>
  );
}
