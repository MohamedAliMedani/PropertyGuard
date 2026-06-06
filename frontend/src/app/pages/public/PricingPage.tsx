import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import { Check, Shield, ArrowRight } from "lucide-react";

export function PricingPage() {
  const { t } = useTranslation();

  const packages = [
    {
      name: t('packages.basic'),
      price: "5,000",
      description: t('packages.basicDesc'),
      features: [
        t('packages.basicFeature1'),
        t('packages.basicFeature2'),
        t('packages.basicFeature3'),
        t('packages.basicFeature4'),
        t('packages.basicFeature5'),
        t('packages.basicFeature6'),
      ],
      color: "#1e3a8a",
    },
    {
      name: t('packages.premium'),
      price: "12,000",
      description: t('packages.premiumDesc'),
      features: [
        t('packages.premiumFeature1'),
        t('packages.premiumFeature2'),
        t('packages.premiumFeature3'),
        t('packages.premiumFeature4'),
        t('packages.premiumFeature5'),
        t('packages.premiumFeature6'),
        t('packages.premiumFeature7'),
        t('packages.premiumFeature8'),
      ],
      popular: true,
      color: "#059669",
    },
    {
      name: t('packages.full'),
      price: "14,000",
      description: t('packages.fullDesc'),
      features: [
        t('packages.fullFeature1'),
        t('packages.fullFeature2'),
        t('packages.fullFeature3'),
        t('packages.fullFeature4'),
        t('packages.fullFeature5'),
        t('packages.fullFeature6'),
        t('packages.fullFeature7'),
        t('packages.fullFeature8'),
        t('packages.fullFeature9'),
      ],
      color: "#8b5cf6",
    },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0f172a] to-[#1e3a8a] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">{t('packages.title')}</h1>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
            {t('packages.subtitle')}
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl p-8 border-2 ${
                  pkg.popular
                    ? "border-[#059669] shadow-2xl scale-105 relative"
                    : "border-border shadow-sm"
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-[#059669] text-white px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                      <Shield className="w-4 h-4" />
                      {t('packages.recommended')}
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{pkg.description}</p>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-lg text-muted-foreground">{t('packages.egp')}</span>
                    <span className="text-5xl font-bold" style={{ color: pkg.color }}>
                      {pkg.price}
                    </span>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  {pkg.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-[#059669] flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <Link
                  to="/customer/create-request"
                  className={`flex items-center justify-center gap-2 w-full px-6 py-3 rounded-lg font-medium transition-all ${
                    pkg.popular
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
    </div>
  );
}
