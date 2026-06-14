import { Link } from 'react-router';
import { useState } from 'react';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import { DarekLogo } from '../../components/shared/DarekLogo';

export function ForgotPasswordPage() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    toast.success(t('auth.resetEmailSent'));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e3a8a] to-[#0f172a] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <DarekLogo size="lg" />
            <span className="text-2xl font-bold text-white">{t('nav.propertyGuard')}</span>
          </Link>
          <h1 className="text-3xl font-bold text-white mb-2">{t('auth.forgotPassword')}</h1>
          <p className="text-gray-300">{t('auth.forgotPasswordDesc')}</p>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-2xl">
          {sent ? (
            <div className="text-center py-4">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#059669]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg mb-2">{t('auth.checkYourEmail')}</h3>
              <p className="text-sm text-muted-foreground mb-6">{t('auth.resetEmailSentDesc')}</p>
              <Link to="/login"
                className="inline-block px-6 py-2.5 bg-[#059669] text-white rounded-lg hover:bg-[#047857] transition-colors">
                {t('auth.backToLogin')}
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">{t('auth.email')}</label>
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#059669]"
                  placeholder="your@email.com" />
              </div>
              <button type="submit"
                className="w-full px-6 py-3 bg-[#059669] text-white rounded-lg hover:bg-[#047857] transition-colors font-medium">
                {t('auth.sendResetLink')}
              </button>
            </form>
          )}

          <div className="mt-6 text-center text-sm">
            <Link to="/login" className="text-[#059669] hover:underline font-medium">
              {t('auth.backToLogin')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
