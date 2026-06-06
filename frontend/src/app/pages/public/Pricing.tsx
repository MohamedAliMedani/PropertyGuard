import { Link } from "react-router";
import { Check, Shield } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";

export default function Pricing() {
  const packages = [
    {
      name: "Basic",
      price: "2,500",
      currency: "EGP",
      description: "Essential verification for straightforward purchases",
      features: [
        "Legal document review",
        "Basic ownership verification",
        "Contract analysis",
        "Written legal report",
        "Email support",
        "7-10 business days",
      ],
      notIncluded: [
        "Engineering inspection",
        "Government verification",
        "On-site visits",
        "Priority processing",
      ],
      color: "border-gray-300",
      buttonVariant: "outline" as const,
      popular: false,
    },
    {
      name: "Premium",
      price: "5,500",
      currency: "EGP",
      description: "Complete verification with engineering inspection",
      features: [
        "Everything in Basic",
        "Full engineering inspection",
        "On-site property visit",
        "Structural assessment",
        "Photo documentation",
        "Government permit check",
        "Phone & email support",
        "5-7 business days",
      ],
      notIncluded: [
        "Priority 24h processing",
        "Dedicated case manager",
      ],
      color: "border-[--color-security-green]",
      buttonVariant: "default" as const,
      buttonClass: "bg-[--color-security-green] hover:bg-[--color-security-green-dark]",
      popular: true,
    },
    {
      name: "Full Protection",
      price: "9,500",
      currency: "EGP",
      description: "Comprehensive protection package with all services",
      features: [
        "Everything in Premium",
        "Full government verification",
        "Municipality compliance check",
        "Zoning verification",
        "Tax clearance check",
        "Dedicated case manager",
        "Priority processing (3-5 days)",
        "24/7 phone support",
        "Video consultation",
        "Comprehensive final report",
      ],
      notIncluded: [],
      color: "border-[--color-premium-gold]",
      buttonVariant: "default" as const,
      buttonClass: "bg-gradient-to-r from-[--color-trust-blue] to-[--color-premium-gold] hover:opacity-90",
      popular: false,
      premium: true,
    },
  ];

  const addons = [
    { name: "Priority Processing (24-48 hours)", price: "1,500 EGP" },
    { name: "Additional Property Visit", price: "800 EGP" },
    { name: "Land Survey", price: "2,000 EGP" },
    { name: "Environmental Assessment", price: "1,200 EGP" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[--color-trust-blue] to-[--color-trust-blue-light] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Simple, Transparent Pricing</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Choose the package that best fits your needs. All packages include our money-back guarantee.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <Card
                key={index}
                className={`relative border-2 ${pkg.color} ${pkg.popular ? 'shadow-xl scale-105' : ''} transition-all hover:shadow-2xl`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge className="bg-[--color-security-green] text-white px-4 py-1">
                      Most Popular
                    </Badge>
                  </div>
                )}
                {pkg.premium && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-[--color-trust-blue] to-[--color-premium-gold] text-white px-4 py-1">
                      Best Value
                    </Badge>
                  </div>
                )}
                <CardHeader className="text-center pb-8 pt-8">
                  <CardTitle className="text-2xl mb-2">{pkg.name}</CardTitle>
                  <div className="mb-4">
                    <span className="text-5xl font-bold text-[--color-trust-blue]">
                      {pkg.price}
                    </span>
                    <span className="text-xl text-muted-foreground ml-2">{pkg.currency}</span>
                  </div>
                  <CardDescription className="text-base">
                    {pkg.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-6">
                    {pkg.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-[--color-security-green] shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                    {pkg.notIncluded.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2 opacity-40">
                        <Check className="w-5 h-5 shrink-0 mt-0.5" />
                        <span className="text-sm line-through">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Button
                    className={`w-full ${pkg.buttonClass || ''}`}
                    variant={pkg.buttonVariant}
                    size="lg"
                    asChild
                  >
                    <Link to="/customer/create-request">Get Started</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Add-ons */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[--color-trust-blue] mb-4">
              Optional Add-ons
            </h2>
            <p className="text-lg text-muted-foreground">
              Enhance your package with additional services
            </p>
          </div>

          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                {addons.map((addon, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center py-3 border-b last:border-0"
                  >
                    <span>{addon.name}</span>
                    <span className="font-semibold text-[--color-trust-blue]">
                      {addon.price}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Payment Methods */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[--color-trust-blue] mb-4">
              Secure Payment Methods
            </h2>
          </div>

          <Card className="p-8">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="w-16 h-16 bg-[--color-trust-blue]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-[--color-trust-blue]" />
                </div>
                <h3 className="font-semibold mb-2">Credit Cards</h3>
                <p className="text-sm text-muted-foreground">Visa, Mastercard</p>
              </div>
              <div>
                <div className="w-16 h-16 bg-[--color-security-green]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-[--color-security-green]" />
                </div>
                <h3 className="font-semibold mb-2">InstaPay</h3>
                <p className="text-sm text-muted-foreground">Instant transfer</p>
              </div>
              <div>
                <div className="w-16 h-16 bg-[--color-premium-gold]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-[--color-premium-gold]" />
                </div>
                <h3 className="font-semibold mb-2">Bank Transfer</h3>
                <p className="text-sm text-muted-foreground">Direct transfer</p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[--color-trust-blue] mb-4">
              Pricing FAQs
            </h2>
          </div>

          <div className="space-y-6">
            {[
              {
                q: "What's included in the price?",
                a: "All prices include expert review, reports, and support. No hidden fees.",
              },
              {
                q: "Can I upgrade my package later?",
                a: "Yes, you can upgrade at any time and pay the difference.",
              },
              {
                q: "Is there a money-back guarantee?",
                a: "Yes, if we fail to deliver the service as promised, you get a full refund.",
              },
              {
                q: "Do you offer discounts for multiple properties?",
                a: "Yes, contact us for special pricing on multiple property verifications.",
              },
            ].map((faq, index) => (
              <Card key={index} className="p-6">
                <h3 className="font-semibold mb-2">{faq.q}</h3>
                <p className="text-muted-foreground">{faq.a}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-[--color-trust-blue] to-[--color-security-green] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Still Have Questions?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Our team is here to help you choose the right package
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-[--color-trust-blue] hover:bg-gray-100"
              asChild
            >
              <Link to="/contact">Contact Us</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10"
              asChild
            >
              <Link to="/customer/create-request">Start Now</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
