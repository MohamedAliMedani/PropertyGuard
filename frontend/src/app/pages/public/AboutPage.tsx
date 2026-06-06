import { useTranslation } from "react-i18next";
import { Shield, Target, Award, Heart } from "lucide-react";

export function AboutPage() {
  const { t } = useTranslation();

  const values = [
    {
      icon: Shield,
      title: t('about.trustSecurity'),
      description: t('about.trustSecurityDesc'),
    },
    {
      icon: Target,
      title: t('about.transparency'),
      description: t('about.transparencyDesc'),
    },
    {
      icon: Award,
      title: t('about.excellence'),
      description: t('about.excellenceDesc'),
    },
    {
      icon: Heart,
      title: t('about.customerFirst'),
      description: t('about.customerFirstDesc'),
    },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0f172a] to-[#1e3a8a] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">{t('about.title')}</h1>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
            {t('about.subtitle')}
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">{t('about.ourMission')}</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t('about.missionText')}
            </p>
          </div>
          <div className="text-lg text-muted-foreground leading-relaxed space-y-4">
            <p>
              {t('about.missionText2')}
            </p>
            <p>
              {t('about.missionText3')}
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">{t('about.ourValues')}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('about.ourValuesDesc')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="bg-white rounded-xl p-6 border border-border text-center">
                  <div className="w-16 h-16 bg-[#059669]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-[#059669]" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">{t('about.expertNetwork')}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('about.expertNetworkDesc')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-background rounded-xl p-8 border border-border text-center">
              <div className="text-4xl font-bold text-[#1e3a8a] mb-2">50+</div>
              <div className="text-sm text-muted-foreground">{t('about.licensedLawyers')}</div>
            </div>
            <div className="bg-background rounded-xl p-8 border border-border text-center">
              <div className="text-4xl font-bold text-[#059669] mb-2">75+</div>
              <div className="text-sm text-muted-foreground">{t('about.certifiedEngineers')}</div>
            </div>
            <div className="bg-background rounded-xl p-8 border border-border text-center">
              <div className="text-4xl font-bold text-[#d97706] mb-2">25+</div>
              <div className="text-sm text-muted-foreground">{t('about.governmentExperts')}</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
