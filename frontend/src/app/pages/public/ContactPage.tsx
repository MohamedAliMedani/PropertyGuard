import { Mail, Phone, MapPin, MessageSquare, Send } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

export function ContactPage() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(t('contact.successMessage'));
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0f172a] to-[#1e3a8a] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">{t('contact.title')}</h1>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-6">{t('contact.getInTouch')}</h2>
                <p className="text-muted-foreground mb-8">
                  {t('contact.getInTouchDesc')}
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#1e3a8a]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-[#1e3a8a]" />
                  </div>
                  <div>
                    <div className="font-medium mb-1">{t('contact.phone')}</div>
                    <div className="text-muted-foreground">+20 123 456 7890</div>
                    <div className="text-sm text-muted-foreground mt-1">{t('contact.phoneHours')}</div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#059669]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-[#059669]" />
                  </div>
                  <div>
                    <div className="font-medium mb-1">{t('contact.emailLabel')}</div>
                    <div className="text-muted-foreground">support@propertyguard.eg</div>
                    <div className="text-sm text-muted-foreground mt-1">{t('contact.emailResponse')}</div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#d97706]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="w-6 h-6 text-[#d97706]" />
                  </div>
                  <div>
                    <div className="font-medium mb-1">{t('contact.whatsapp')}</div>
                    <div className="text-muted-foreground">+20 123 456 7890</div>
                    <div className="text-sm text-muted-foreground mt-1">{t('contact.whatsappResponse')}</div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#8b5cf6]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-[#8b5cf6]" />
                  </div>
                  <div>
                    <div className="font-medium mb-1">{t('contact.office')}</div>
                    <div className="text-muted-foreground">Cairo, Egypt</div>
                    <div className="text-sm text-muted-foreground mt-1">{t('contact.officeNote')}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-2xl p-8 border border-border shadow-sm">
                <h3 className="text-xl font-semibold mb-6">{t('contact.sendMessage')}</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">{t('contact.fullName')}</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#059669]"
                        placeholder={t('contact.namePlaceholder')}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">{t('contact.emailRequired')}</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#059669]"
                        placeholder={t('contact.emailPlaceholder')}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">{t('contact.phoneOptional')}</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#059669]"
                        placeholder={t('contact.phonePlaceholder')}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">{t('contact.subjectRequired')}</label>
                      <input
                        type="text"
                        required
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#059669]"
                        placeholder={t('contact.subjectPlaceholder')}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">{t('contact.messageRequired')}</label>
                    <textarea
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={6}
                      className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#059669] resize-none"
                      placeholder={t('contact.messagePlaceholder')}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#059669] text-white rounded-lg hover:bg-[#047857] transition-colors"
                  >
                    <Send className="w-4 h-4" />
                    {t('contact.sendBtn')}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
