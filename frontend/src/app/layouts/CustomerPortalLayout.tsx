import { Outlet, Link, useLocation, useNavigate } from 'react-router';
import { Shield, Home, FileText, Upload, CreditCard, MessageSquare, User, Bell, LogOut, Menu } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';
import { LanguageSwitcher } from '../components/shared/LanguageSwitcher';

export function CustomerPortalLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigation = [
    { name: t('common.dashboard'), href: '/customer', icon: Home },
    { name: t('nav.myRequests'), href: '/customer/requests', icon: FileText },
    { name: t('nav.createRequest'), href: '/customer/create-request', icon: Upload },
    { name: t('nav.documents'), href: '/customer/documents', icon: FileText },
    { name: t('nav.payments'), href: '/customer/payments', icon: CreditCard },
    { name: t('nav.messages'), href: '/customer/messages', icon: MessageSquare },
    { name: t('common.profile'), href: '/customer/profile', icon: User },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const initials = user?.fullName
    ? user.fullName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
    : 'U';

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 bg-white border-b border-border shadow-sm">
        <div className="flex items-center justify-between h-16 px-4 lg:px-6">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden p-2 hover:bg-muted rounded-lg">
              <Menu className="w-5 h-5" />
            </button>
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-[#1e3a8a] to-[#059669] rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
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
              <div className="w-8 h-8 bg-[#059669] rounded-full flex items-center justify-center">
                <span className="text-white text-sm">{initials}</span>
              </div>
              <div className="hidden sm:block">
                <div className="text-sm font-medium">{user?.fullName}</div>
                <div className="text-xs text-muted-foreground">{t('auth.customer')}</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        <aside className={`fixed lg:sticky top-16 start-0 z-30 h-[calc(100vh-4rem)] w-64 bg-white border-e border-border transition-transform lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0 rtl:-translate-x-0' : '-translate-x-full rtl:translate-x-full'
        }`}>
          <nav className="p-4 space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              return (
                <Link key={item.href} to={item.href} onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                    isActive ? 'bg-[#059669] text-white' : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`}>
                  <Icon className="w-5 h-5" />
                  <span className="text-sm">{item.name}</span>
                </Link>
              );
            })}
            <button onClick={handleLogout}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors mt-4 border-t border-border pt-4 w-full">
              <LogOut className="w-5 h-5" />
              <span className="text-sm">{t('common.logout')}</span>
            </button>
          </nav>
        </aside>

        {sidebarOpen && (
          <div className="fixed inset-0 z-20 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />
        )}

        <main className="flex-1 p-4 lg:p-6 min-h-[calc(100vh-4rem)]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
