import { User, Mail, Phone, MapPin, Lock, Camera } from "lucide-react";
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../../contexts/AuthContext';
import { formatDate } from '../../../utils/date';
import { useRef, useState } from 'react';
import { toast } from 'sonner';

export function CustomerProfile() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const photoInputRef = useRef<HTMLInputElement>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const fullName = user?.fullName || '';
  const email = user?.email || '';
  const phone = user?.phone || '';
  const createdOn = user?.createdAt || '';
  const initials = fullName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setAvatarPreview(ev.target?.result as string);
      toast.success(t('profile.photoUpdated', { defaultValue: 'Profile photo updated!' }));
    };
    reader.readAsDataURL(file);
  };

  const handleSaveChanges = () => {
    toast.success(t('common.saveChanges') + ' ' + t('common.completed', { defaultValue: '– saved!' }));
  };

  const handleUpdatePassword = () => {
    toast.success(t('profile.updatePassword') + ' – ' + t('common.completed', { defaultValue: 'updated!' }));
  };

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">{t('profile.title')}</h1>
        <p className="text-muted-foreground">{t('profile.subtitle')}</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 border border-border text-center">
          <div className="relative w-24 h-24 mx-auto mb-4">
            {avatarPreview ? (
              <img src={avatarPreview} alt="avatar" className="w-24 h-24 rounded-full object-cover" />
            ) : (
              <div className="w-24 h-24 bg-[#059669] rounded-full flex items-center justify-center">
                <span className="text-white text-3xl font-bold">{initials}</span>
              </div>
            )}
          </div>
          <h2 className="font-semibold text-lg">{fullName}</h2>
          <p className="text-sm text-muted-foreground">{formatDate(createdOn)}</p>
          <input
            ref={photoInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handlePhotoChange}
          />
          <button
            onClick={() => photoInputRef.current?.click()}
            className="mt-4 px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors text-sm flex items-center gap-2 mx-auto"
          >
            <Camera className="w-4 h-4" />
            {t('profile.changePhoto')}
          </button>
        </div>

        <div className="md:col-span-2 bg-white rounded-xl p-6 border border-border">
          <h3 className="font-semibold mb-4">{t('profile.personalInfo')}</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">{t('profile.fullName')}</label>
              <div className="flex items-center gap-3 px-4 py-2.5 bg-background border border-border rounded-lg">
                <User className="w-5 h-5 text-muted-foreground" />
                <input type="text" defaultValue={fullName} className="flex-1 bg-transparent focus:outline-none" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">{t('profile.email')}</label>
              <div className="flex items-center gap-3 px-4 py-2.5 bg-background border border-border rounded-lg">
                <Mail className="w-5 h-5 text-muted-foreground" />
                <input type="email" defaultValue={email} className="flex-1 bg-transparent focus:outline-none" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">{t('profile.phone')}</label>
              <div className="flex items-center gap-3 px-4 py-2.5 bg-background border border-border rounded-lg">
                <Phone className="w-5 h-5 text-muted-foreground" />
                <input type="tel" defaultValue={phone} className="flex-1 bg-transparent focus:outline-none" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">{t('profile.location')}</label>
              <div className="flex items-center gap-3 px-4 py-2.5 bg-background border border-border rounded-lg">
                <MapPin className="w-5 h-5 text-muted-foreground" />
                <input type="text" defaultValue="Cairo, Egypt" className="flex-1 bg-transparent focus:outline-none" />
              </div>
            </div>
            <button onClick={handleSaveChanges} className="w-full px-6 py-2.5 bg-[#059669] text-white rounded-lg hover:bg-[#047857] transition-colors">
              {t('common.saveChanges')}
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 border border-border">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <Lock className="w-5 h-5" />
          {t('profile.changePassword')}
        </h3>
        <div className="space-y-4 max-w-md">
          <div>
            <label className="block text-sm font-medium mb-2">{t('profile.currentPassword')}</label>
            <input type="password" className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#059669]" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">{t('profile.newPassword')}</label>
            <input type="password" className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#059669]" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">{t('profile.confirmPassword')}</label>
            <input type="password" className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#059669]" />
          </div>
          <button onClick={handleUpdatePassword} className="px-6 py-2.5 bg-[#1e3a8a] text-white rounded-lg hover:bg-[#1e40af] transition-colors">
            {t('profile.updatePassword')}
          </button>
        </div>
      </div>
    </div>
  );
}
