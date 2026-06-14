import { Link, useNavigate } from 'react-router';
import { Globe, Eye, EyeOff, Check, X } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../../contexts/AuthContext';
import { DarekLogo } from '../../components/shared/DarekLogo';

const countryCodes = [
  { code: '+20', flag: '🇪🇬', name: 'Egypt' },
  { code: '+966', flag: '🇸🇦', name: 'Saudi Arabia' },
  { code: '+971', flag: '🇦🇪', name: 'UAE' },
  { code: '+974', flag: '🇶🇦', name: 'Qatar' },
  { code: '+965', flag: '🇰🇼', name: 'Kuwait' },
  { code: '+973', flag: '🇧🇭', name: 'Bahrain' },
  { code: '+968', flag: '🇴🇲', name: 'Oman' },
  { code: '+962', flag: '🇯🇴', name: 'Jordan' },
  { code: '+1', flag: '🇺🇸', name: 'USA' },
  { code: '+44', flag: '🇬🇧', name: 'UK' },
];

export function RegisterPage() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { register } = useAuth();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [countryCode, setCountryCode] = useState('+20');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const currentLang = i18n.language;
  const switchLang = (lang: string) => i18n.changeLanguage(lang);

  const passwordChecks = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };
  const passwordStrong = Object.values(passwordChecks).every(Boolean);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!fullName.trim()) {
      newErrors.fullName = t('auth.validation.nameRequired');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      newErrors.email = t('auth.validation.emailInvalid');
    }

    const digitsOnly = phone.replace(/\s/g, '');
    if (!digitsOnly || digitsOnly.length < 8 || digitsOnly.length > 15 || !/^\d+$/.test(digitsOnly)) {
      newErrors.phone = t('auth.validation.phoneInvalid');
    }

    if (!passwordStrong) {
      newErrors.password = t('auth.validation.passwordWeak');
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = t('auth.validation.passwordMismatch');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsLoading(true);

    try {
      const fullPhone = `${countryCode} ${phone.replace(/\s/g, '')}`;
      await register({ fullName, email, password, phone: fullPhone, preferredLanguage: currentLang });
      toast.success(t('auth.registerSuccess'));
      navigate('/customer');
    } catch {
      toast.error(t('auth.registerError'));
    } finally {
      setIsLoading(false);
    }
  };

  const inputClass = (field: string) =>
    `w-full px-4 py-2.5 bg-background border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
      errors[field] ? 'border-red-400 focus:ring-red-300' : 'border-border focus:ring-[#059669]'
    }`;

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
          <h1 className="text-3xl font-bold text-white mb-2">{t('auth.createAccount')}</h1>
          <p className="text-gray-300">{t('auth.createAccountDesc')}</p>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-2xl">
          <form onSubmit={handleRegister} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium mb-2">{t('auth.fullName')}</label>
              <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)}
                className={inputClass('fullName')}
                placeholder={t('auth.fullNamePlaceholder')} />
              {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-2">{t('auth.email')}</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                className={inputClass('email')}
                placeholder="your@email.com" />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            {/* Phone with country code */}
            <div>
              <label className="block text-sm font-medium mb-2">{t('auth.phone')}</label>
              <div className="flex gap-2">
                <select
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  className="w-28 px-2 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#059669] text-sm"
                >
                  {countryCodes.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.flag} {c.code}
                    </option>
                  ))}
                </select>
                <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)}
                  className={`flex-1 ${inputClass('phone')}`}
                  placeholder="1xx xxx xxxx" />
              </div>
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium mb-2">{t('auth.password')}</label>
              <div className="relative">
                <input type={showPassword ? 'text' : 'password'} value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={inputClass('password')}
                  placeholder="••••••••" />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute end-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {password && (
                <div className="mt-2 space-y-1">
                  {[
                    { key: 'length', label: t('auth.validation.min8') },
                    { key: 'uppercase', label: t('auth.validation.uppercase') },
                    { key: 'lowercase', label: t('auth.validation.lowercase') },
                    { key: 'number', label: t('auth.validation.number') },
                    { key: 'special', label: t('auth.validation.special') },
                  ].map(({ key, label }) => (
                    <div key={key} className="flex items-center gap-1.5 text-xs">
                      {passwordChecks[key as keyof typeof passwordChecks] ? (
                        <Check className="w-3.5 h-3.5 text-[#059669]" />
                      ) : (
                        <X className="w-3.5 h-3.5 text-red-400" />
                      )}
                      <span className={passwordChecks[key as keyof typeof passwordChecks] ? 'text-[#059669]' : 'text-muted-foreground'}>
                        {label}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium mb-2">{t('auth.confirmPassword')}</label>
              <div className="relative">
                <input type={showConfirm ? 'text' : 'password'} value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={inputClass('confirmPassword')}
                  placeholder="••••••••" />
                <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute end-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
              {confirmPassword && password === confirmPassword && (
                <p className="text-[#059669] text-xs mt-1 flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> {t('auth.validation.passwordsMatch')}
                </p>
              )}
            </div>

            <button type="submit" disabled={isLoading}
              className="w-full px-6 py-3 bg-[#059669] text-white rounded-lg hover:bg-[#047857] transition-colors font-medium disabled:bg-gray-400">
              {isLoading ? t('common.loading') : t('auth.register')}
            </button>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">{t('auth.haveAccount')} </span>
            <Link to="/login" className="text-[#059669] hover:underline font-medium">
              {t('auth.signIn')}
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
