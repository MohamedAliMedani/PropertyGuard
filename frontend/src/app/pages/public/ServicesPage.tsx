import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import { FileCheck, Building2, Shield, Award, Check, ArrowRight } from "lucide-react";
import { usePackages } from "../../../hooks/usePackages";

export function ServicesPage() {
  const { t, i18n } = useTranslation();
  const { data: packagesData } = usePackages();

  const isAr = i18n.language === 'ar';
  const packages = packagesData || [];

  const services = [
    {
      icon: FileCheck,
      title: t('services.legalVerification'),
      description: t('services.legalVerificationDesc'),
      color: "#1e3a8a",
      features: [
        t('services.legalFeature1'),
        t('services.legalFeature2'),
        t('services.legalFeature3'),
        t('services.legalFeature4'),
        t('services.legalFeature5'),
        t('services.legalFeature6'),
        t('services.legalFeature7'),
        t('services.legalFeature8'),
      ],
    },
    {
      icon: Building2,
      title: t('services.engineeringInspection'),
      description: t('services.engineeringInspectionDesc'),
      color: "#059669",
      features: [
        t('services.engFeature1'),
        t('services.engFeature2'),
        t('services.engFeature3'),
        t('services.engFeature4'),
        t('services.engFeature5'),
        t('services.engFeature6'),
        t('services.engFeature7'),
        t('services.engFeature8'),
      ],
    },
    {
      icon: Shield,
      title: t('services.governmentVerification'),
      description: t('services.governmentVerificationDesc'),
      color: "#d97706",
      features: [
        t('services.govFeature1'),
        t('services.govFeature2'),
        t('services.govFeature3'),
        t('services.govFeature4'),
        t('services.govFeature5'),
        t('services.govFeature6'),
        t('services.govFeature7'),
        t('services.govFeature8'),
      ],
    },
  ];

  const packageColors = ["#1e3a8a", "#059669", "#8b5cf6"];

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0f172a] to-[#1e3a8a] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">{t('services.title')}</h1>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
            {t('services.subtitle')}
          </p>
        </div>
      </section>

      {/* Services Detail */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-8 border border-border shadow-sm"
                >
                  <div className="flex items-start gap-4 mb-6">
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${service.color}15` }}
                    >
                      <Icon className="w-7 h-7" style={{ color: service.color }} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                      <p className="text-muted-foreground">{service.description}</p>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-[#059669] flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Packages & Pricing (from API) */}
      <section id="pricing" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">{t('packages.title')}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('packages.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <div
                key={pkg.id}
                className={`bg-white rounded-2xl p-8 border-2 ${
                  pkg.isPopular
                    ? "border-[#059669] shadow-2xl scale-105 relative"
                    : "border-border shadow-sm"
                }`}
              >
                {pkg.isPopular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-[#059669] text-white px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                      <Shield className="w-4 h-4" />
                      {t('packages.recommended')}
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-2">{isAr ? pkg.nameAr : pkg.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{isAr ? pkg.descriptionAr : pkg.description}</p>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-lg text-muted-foreground">{t('packages.egp')}</span>
                    <span className="text-5xl font-bold" style={{ color: packageColors[index] || "#059669" }}>
                      {pkg.price.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  {(isAr ? pkg.featuresAr : pkg.features).map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-[#059669] flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <Link
                  to="/customer/create-request"
                  className={`flex items-center justify-center gap-2 w-full px-6 py-3 rounded-lg font-medium transition-all ${
                    pkg.isPopular
                      ? "bg-[#059669] text-white hover:bg-[#047857] shadow-lg"
                      : "bg-[#0f172a] text-white hover:bg-[#1e293b]"
                  }`}
                >
                  {t('common.getStarted')}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="text-muted-foreground mb-4">{t('packages.customPackage')}</p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 text-[#1e3a8a] font-medium hover:underline"
            >
              {t('packages.contactEnterprise')}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Property Types */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">{t('services.propertyTypes')}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('services.propertyTypesDesc')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[t('services.apartments'), t('services.villas'), t('services.land'), t('services.commercial')].map((type, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 border border-border text-center hover:shadow-lg transition-all"
              >
                <div className="w-16 h-16 bg-[#059669]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building2 className="w-8 h-8 text-[#059669]" />
                </div>
                <h3 className="font-semibold text-lg">{type}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
