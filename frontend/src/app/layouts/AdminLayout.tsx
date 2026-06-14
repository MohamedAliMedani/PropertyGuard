import { Outlet, Link, useLocation, useNavigate } from 'react-router';
import { LayoutDashboard, Users, UserCog, FileText, CreditCard, MessageSquare, BarChart3, Bell, LogOut, Menu } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';
import { LanguageSwitcher } from '../components/shared/LanguageSwitcher';
import { DarekLogo } from '../components/shared/DarekLogo';

export function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigation = [
    { name: t('common.dashboard'), href: '/admin', icon: LayoutDashboard },
    { name: t('admin.userManagement'), href: '/admin/users', icon: Users },
    { name: t('admin.expertManagement'), href: '/admin/experts', icon: UserCog },
    { name: t('admin.requestManagement'), href: '/admin/requests', icon: FileText },
    { name: t('admin.transactionManagement'), href: '/admin/transactions', icon: CreditCard },
    { name: t('admin.supportTickets'), href: '/admin/support', icon: MessageSquare },
    { name: t('admin.analytics'), href: '/admin/analytics', icon: BarChart3 },
  ];

  const handleLogout = () => { logout(); navigate('/'); };

  const initials = user?.fullName ? user.fullName.split(' ').map(n => n[0]).join('').slice(0, 2) : 'AD';

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 bg-[#0f172a] text-white shadow-lg">
        <div className="flex items-center justify-between h-16 px-4 lg:px-6">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden p-2 hover:bg-white/10 rounded-lg">
              <Menu className="w-5 h-5" />
            </button>
            <Link to="/" className="flex items-center gap-2">
              <DarekLogo size="sm" />
              <span className="font-bold text-lg hidden sm:inline">{t('nav.propertyGuard')}</span>
            </Link>
            <span className="hidden sm:inline text-sm text-gray-300 border-s border-gray-600 ps-3 ms-3">
              {t('auth.admin')}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <button className="p-2 hover:bg-white/10 rounded-lg relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#dc2626] rounded-full" />
            </button>
            <div className="flex items-center gap-2 ps-3 border-s border-gray-600">
              <div className="w-8 h-8 bg-[#d97706] rounded-full flex items-center justify-center">
                <span className="text-white text-sm">{initials}</span>
              </div>
              <div className="hidden sm:block">
                <div className="text-sm font-medium">{user?.fullName}</div>
                <div className="text-xs text-gray-300">{t('auth.admin')}</div>
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
                <Link key={item.href} to={item.href} onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                    isActive ? 'bg-[#0f172a] text-white' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}>
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
