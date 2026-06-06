import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import { Shield, FileCheck, Building2, CheckCircle, Star, ArrowRight, Lock, Award, Users, TrendingUp } from "lucide-react";
import { TrustBadge } from "../../components/TrustBadge";
import { ImageWithFallback } from "../../components/figma/ImageWithFallback";

export function HomePage() {
  const { t } = useTranslation();

  const services = [
    {
      icon: FileCheck,
      title: t('services.legalVerification'),
      description: t('services.legalVerificationDesc'),
      color: "#1e3a8a",
    },
    {
      icon: Building2,
      title: t('services.engineeringInspection'),
      description: t('services.engineeringInspectionDesc'),
      color: "#059669",
    },
    {
      icon: Shield,
      title: t('services.governmentVerification'),
      description: t('services.governmentVerificationDesc'),
      color: "#d97706",
    },
    {
      icon: Award,
      title: t('services.fullProtection'),
      description: t('services.fullProtectionDesc'),
      color: "#8b5cf6",
    },
  ];

  const steps = [
    { number: "01", title: t('home.step1Title'), description: t('home.step1Desc') },
    { number: "02", title: t('home.step2Title'), description: t('home.step2Desc') },
    { number: "03", title: t('home.step3Title'), description: t('home.step3Desc') },
    { number: "04", title: t('home.step4Title'), description: t('home.step4Desc') },
  ];

  const testimonials = [
    {
      name: t('home.testimonial1Name'),
      role: t('home.testimonial1Role'),
      rating: 5,
      text: t('home.testimonial1Text'),
    },
    {
      name: t('home.testimonial2Name'),
      role: t('home.testimonial2Role'),
      rating: 5,
      text: t('home.testimonial2Text'),
    },
    {
      name: t('home.testimonial3Name'),
      role: t('home.testimonial3Role'),
      rating: 5,
      text: t('home.testimonial3Text'),
    },
  ];

  const stats = [
    { value: "5,000+", label: t('home.propertiesVerified') },
    { value: "98%", label: t('home.successRate') },
    { value: "150+", label: t('home.expertPartners') },
    { value: "24/7", label: t('home.supportAvailable') },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#0f172a] via-[#1e3a8a] to-[#0f172a] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#059669] rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#d97706] rounded-full blur-3xl" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex flex-wrap gap-2 mb-6">
                <TrustBadge type="protected" label={t('home.trustBadgeSecure')} />
                <TrustBadge type="verified" label={t('home.trustBadgeExperts')} />
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                {t('home.heroTitle')}
              </h1>

              <p className="text-lg sm:text-xl text-gray-300 mb-8 max-w-2xl">
                {t('home.heroSubtitle')}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link
                  to="/customer/create-request"
                  className="px-8 py-4 bg-[#059669] text-white rounded-xl hover:bg-[#047857] transition-all shadow-lg hover:shadow-xl text-center font-medium"
                >
                  {t('home.startNow')}
                </Link>
                <Link
                  to="/pricing"
                  className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-xl hover:bg-white/20 transition-all border border-white/20 text-center font-medium"
                >
                  {t('common.viewPricing')}
                </Link>
              </div>

              <div className="flex items-center gap-6 pt-6 border-t border-white/20">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-[#059669]" />
                  <span className="text-sm">{t('home.licensedProfessionals')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-[#059669]" />
                  <span className="text-sm">{t('home.fastTurnaround')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-[#059669]" />
                  <span className="text-sm">{t('home.confidential')}</span>
                </div>
              </div>
            </div>

            <div className="relative hidden lg:block">
              <div className="relative z-10">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1592317524546-3d4cc260c22b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBsdXh1cnklMjBhcGFydG1lbnQlMjBidWlsZGluZyUyMGVneXB0fGVufDF8fHx8MTc3OTE0ODE4MXww&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Modern Property"
                  className="rounded-2xl shadow-2xl"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-full h-full bg-gradient-to-br from-[#059669] to-[#d97706] rounded-2xl -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-[#1e3a8a] mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">{t('home.ourServices')}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('home.ourServicesDesc')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 border border-border hover:shadow-lg transition-all hover:-translate-y-1 group"
                >
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
                    style={{ backgroundColor: `${service.color}15` }}
                  >
                    <Icon className="w-7 h-7" style={{ color: service.color }} />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{service.title}</h3>
                  <p className="text-sm text-muted-foreground">{service.description}</p>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#1e3a8a] text-white rounded-lg hover:bg-[#1e40af] transition-colors"
            >
              {t('home.viewAllServices')}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">{t('home.howItWorks')}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('home.howItWorksDesc')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#1e3a8a] to-[#059669] rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4 mx-auto">
                    {step.number}
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-[#1e3a8a] to-[#059669]" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Trust Us */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">{t('home.whyTrustUs')}</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-[#059669]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Lock className="w-6 h-6 text-[#059669]" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{t('home.secureConfidential')}</h3>
                    <p className="text-sm text-muted-foreground">
                      {t('home.secureConfidentialDesc')}
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-[#1e3a8a]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Award className="w-6 h-6 text-[#1e3a8a]" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{t('home.licensedExpertsOnly')}</h3>
                    <p className="text-sm text-muted-foreground">
                      {t('home.licensedExpertsOnlyDesc')}
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-[#d97706]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-[#d97706]" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{t('home.trustedByThousands')}</h3>
                    <p className="text-sm text-muted-foreground">
                      {t('home.trustedByThousandsDesc')}
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-[#8b5cf6]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-6 h-6 text-[#8b5cf6]" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{t('home.fastTurnaroundTitle')}</h3>
                    <p className="text-sm text-muted-foreground">
                      {t('home.fastTurnaroundDesc')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1562654501-a0ccc0fc3fb1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBsYXd5ZXIlMjBvZmZpY2UlMjBkb2N1bWVudHN8ZW58MXx8fHwxNzc5MTQ4MTgxfDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Professional Service"
                className="rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">{t('home.testimonials')}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('home.testimonialsDesc')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-background rounded-xl p-6 border border-border">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[#d97706] text-[#d97706]" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">{testimonial.text}</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#059669] rounded-full flex items-center justify-center">
                    <span className="text-white font-medium text-sm">
                      {testimonial.name.split(" ").map(n => n[0]).join("")}
                    </span>
                  </div>
                  <div>
                    <div className="font-medium text-sm">{testimonial.name}</div>
                    <div className="text-xs text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#1e3a8a] to-[#059669] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            {t('home.ctaTitle')}
          </h2>
          <p className="text-lg text-gray-100 mb-8 max-w-2xl mx-auto">
            {t('home.ctaDesc')}
          </p>
          <Link
            to="/customer/create-request"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#1e3a8a] rounded-xl hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl font-medium"
          >
            {t('home.startNow')}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
