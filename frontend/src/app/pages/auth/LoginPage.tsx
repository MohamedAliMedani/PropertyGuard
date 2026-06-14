import { Link, useNavigate } from 'react-router';
import { Globe } from 'lucide-react';
import { DarekLogo } from '../../components/shared/DarekLogo';
import { useState } from 'react';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../../contexts/AuthContext';

export function LoginPage() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const currentLang = i18n.language;
  const switchLang = (lang: string) => i18n.changeLanguage(lang);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login({ email, password });
      toast.success(t('auth.signIn') + ' ✓');

      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        const user = JSON.parse(savedUser);
        if (user.role === 'Customer') navigate('/customer');
        else if (user.role === 'Lawyer') navigate('/expert/lawyer');
        else if (user.role === 'Engineer') navigate('/expert/engineer');
        else if (user.role === 'GovExpert') navigate('/expert/government');
        else if (user.role === 'Admin') navigate('/admin');
      }
    } catch {
      toast.error(t('auth.invalidCredentials'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e3a8a] to-[#0f172a] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-start mb-4">
            <div className="flex items-center gap-1 p-1 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
              <button
                onClick={() => switchLang('en')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                  currentLang === 'en'
                    ? 'bg-white text-[#1e3a8a] shadow-sm'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                <Globe className="w-3.5 h-3.5" />
                English
              </button>
              <button
                onClick={() => switchLang('ar')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                  currentLang === 'ar'
                    ? 'bg-white text-[#1e3a8a] shadow-sm'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                العربية
              </button>
            </div>
          </div>
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <DarekLogo size="lg" />
            <span className="text-2xl font-bold text-white">{t('nav.propertyGuard')}</span>
          </Link>
          <h1 className="text-3xl font-bold text-white mb-2">{t('auth.welcomeBack')}</h1>
          <p className="text-gray-300">{t('auth.signInDesc')}</p>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-2xl">
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">{t('auth.email')}</label>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#059669]"
                placeholder="your@email.com" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">{t('auth.password')}</label>
              <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#059669]"
                placeholder="••••••••" />
            </div>
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded" />
                <span>{t('auth.rememberMe')}</span>
              </label>
              <Link to="/forgot-password" className="text-[#059669] hover:underline">{t('auth.forgotPassword')}</Link>
            </div>
            <button type="submit" disabled={isLoading}
              className="w-full px-6 py-3 bg-[#059669] text-white rounded-lg hover:bg-[#047857] transition-colors font-medium disabled:bg-gray-400">
              {isLoading ? t('common.loading') : t('auth.signIn')}
            </button>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">{t('auth.noAccount')} </span>
            <Link to="/register" className="text-[#059669] hover:underline font-medium">
              {t('auth.register')}
            </Link>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link to="/" className="text-white hover:underline text-sm">{t('auth.backToHome')}</Link>
        </div>
      </div>
    </div>
  );
}
