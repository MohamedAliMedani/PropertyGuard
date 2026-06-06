import { Link } from "react-router";
import { Shield, FileCheck, Hammer, Building2, CheckCircle, Home as HomeIcon, Building, Store, Landmark } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";

export default function Services() {
  const mainServices = [
    {
      icon: FileCheck,
      title: "Legal Verification",
      description: "Complete legal review of all property documents and ownership status",
      features: [
        "Ownership document verification",
        "Contract review and validation",
        "Title deed authentication",
        "Legal dispute checking",
        "Inheritance verification",
        "Mortgage and lien checks",
      ],
      color: "text-[--color-trust-blue]",
      bgColor: "bg-[--color-trust-blue]/10",
    },
    {
      icon: Hammer,
      title: "Engineering Inspection",
      description: "Professional on-site inspection by licensed engineers",
      features: [
        "Structural integrity assessment",
        "Quality of construction materials",
        "Electrical systems inspection",
        "Plumbing and water systems",
        "Safety compliance check",
        "Detailed photo documentation",
      ],
      color: "text-[--color-security-green]",
      bgColor: "bg-[--color-security-green]/10",
    },
    {
      icon: Building2,
      title: "Government Verification",
      description: "Verify all government permits, licenses, and compliance",
      features: [
        "Building permit verification",
        "Municipality approval check",
        "Zoning compliance",
        "Occupancy certificate",
        "Tax clearance verification",
        "Utility connection permits",
      ],
      color: "text-[--color-premium-gold]",
      bgColor: "bg-[--color-premium-gold]/10",
    },
    {
      icon: Shield,
      title: "Full Protection Package",
      description: "Complete end-to-end verification covering all aspects",
      features: [
        "All legal verification services",
        "Complete engineering inspection",
        "Full government verification",
        "Priority processing",
        "Dedicated case manager",
        "Comprehensive final report",
      ],
      color: "text-[--color-trust-blue]",
      bgColor: "bg-gradient-to-br from-[--color-trust-blue]/10 to-[--color-security-green]/10",
    },
  ];

  const propertyTypes = [
    {
      icon: HomeIcon,
      title: "Apartments",
      description: "Comprehensive verification for apartment purchases including shared facilities",
    },
    {
      icon: Building,
      title: "Villas",
      description: "Complete inspection and verification for standalone villas and compounds",
    },
    {
      icon: Landmark,
      title: "Land",
      description: "Land ownership, zoning, and development rights verification",
    },
    {
      icon: Store,
      title: "Commercial Properties",
      description: "Business property verification including licenses and commercial permits",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[--color-trust-blue] to-[--color-trust-blue-light] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Protection Services</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Comprehensive property verification services designed to protect your investment in the Egyptian real estate market
          </p>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {mainServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card key={index} className="border-2 hover:border-[--color-trust-blue] transition-all">
                  <CardHeader>
                    <div className={`w-14 h-14 rounded-xl ${service.bgColor} flex items-center justify-center mb-4`}>
                      <Icon className={`w-7 h-7 ${service.color}`} />
                    </div>
                    <CardTitle className="text-2xl mb-2">{service.title}</CardTitle>
                    <CardDescription className="text-base">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <CheckCircle className="w-5 h-5 text-[--color-security-green] shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Property Types */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[--color-trust-blue] mb-4">
              Property Types We Cover
            </h2>
            <p className="text-lg text-muted-foreground">
              We verify all types of properties across Egypt
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {propertyTypes.map((type, index) => {
              const Icon = type.icon;
              return (
                <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                  <Icon className="w-12 h-12 text-[--color-trust-blue] mx-auto mb-4" />
                  <CardTitle className="mb-2">{type.title}</CardTitle>
                  <CardDescription>{type.description}</CardDescription>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[--color-trust-blue] mb-4">
              Our Verification Process
            </h2>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="space-y-8">
              {[
                {
                  step: "1",
                  title: "Document Collection",
                  description: "You securely upload all property documents through our encrypted platform",
                },
                {
                  step: "2",
                  title: "Expert Assignment",
                  description: "We assign licensed lawyers, engineers, and government experts to your case",
                },
                {
                  step: "3",
                  title: "Comprehensive Review",
                  description: "Experts conduct thorough verification including on-site visits when needed",
                },
                {
                  step: "4",
                  title: "Report Generation",
                  description: "You receive a detailed report with findings, photos, and recommendations",
                },
              ].map((item, index) => (
                <div key={index} className="flex gap-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[--color-trust-blue] to-[--color-security-green] text-white flex items-center justify-center font-bold text-xl shrink-0">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-[--color-security-green] to-[--color-security-green-dark] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Choose the service that fits your needs and protect your investment today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-[--color-security-green] hover:bg-gray-100"
              asChild
            >
              <Link to="/pricing">View Pricing</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10"
              asChild
            >
              <Link to="/customer/create-request">Start Verification</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
