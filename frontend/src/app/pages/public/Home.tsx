import { Link } from "react-router";
import { Shield, FileCheck, Hammer, Building2, CheckCircle, Star, ChevronRight, Award, Clock, Users } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { TrustBadge } from "../../components/shared/TrustBadge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../components/ui/accordion";
import { ImageWithFallback } from "../../components/figma/ImageWithFallback";

export default function Home() {
  const services = [
    {
      icon: FileCheck,
      title: "Legal Verification",
      description: "Expert lawyers verify all ownership documents, contracts, and legal status",
      color: "text-[--color-trust-blue]",
      bgColor: "bg-[--color-trust-blue]/10",
    },
    {
      icon: Hammer,
      title: "Engineering Inspection",
      description: "Professional engineers inspect property quality, structure, and safety",
      color: "text-[--color-security-green]",
      bgColor: "bg-[--color-security-green]/10",
    },
    {
      icon: Building2,
      title: "Government Verification",
      description: "Verify permits, licenses, and compliance with government regulations",
      color: "text-[--color-premium-gold]",
      bgColor: "bg-[--color-premium-gold]/10",
    },
    {
      icon: Shield,
      title: "Full Protection Package",
      description: "Complete end-to-end verification covering all aspects of your property",
      color: "text-[--color-trust-blue]",
      bgColor: "bg-[--color-trust-blue]/10",
    },
  ];

  const howItWorks = [
    {
      step: "1",
      title: "Submit Your Request",
      description: "Create an account and submit your property verification request with basic details",
    },
    {
      step: "2",
      title: "Upload Documents",
      description: "Securely upload all property documents, contracts, and identification papers",
    },
    {
      step: "3",
      title: "Expert Review",
      description: "Our lawyers, engineers, and government experts review your property",
    },
    {
      step: "4",
      title: "Get Your Report",
      description: "Receive a comprehensive protection report with our seal of approval",
    },
  ];

  const testimonials = [
    {
      name: "Ahmed Hassan",
      role: "Property Buyer",
      content: "PropertyGuard saved me from making a huge mistake. They discovered legal issues with the property that the seller didn't disclose.",
      rating: 5,
    },
    {
      name: "Fatima Mohamed",
      role: "Investor",
      content: "As someone buying from abroad, I needed assurance. PropertyGuard gave me complete peace of mind with their thorough verification.",
      rating: 5,
    },
    {
      name: "Khaled Samir",
      role: "First-time Buyer",
      content: "The engineering inspection revealed structural problems. I'm so grateful I used PropertyGuard before purchasing.",
      rating: 5,
    },
  ];

  const faqs = [
    {
      question: "What types of properties can you verify?",
      answer: "We verify all types of properties including apartments, villas, land, and commercial properties throughout Egypt.",
    },
    {
      question: "How long does the verification process take?",
      answer: "The complete verification process typically takes 7-14 business days depending on the package selected and property location.",
    },
    {
      question: "What documents do I need to provide?",
      answer: "You'll need ownership documents, sales contracts, property permits, government approvals, and identification documents. Our team will guide you through the specific requirements.",
    },
    {
      question: "Can I use PropertyGuard if I'm buying from abroad?",
      answer: "Absolutely! We specialize in helping Egyptians abroad verify properties remotely with secure document upload and video consultations.",
    },
    {
      question: "What happens if you find issues with the property?",
      answer: "We provide a detailed report of all findings. This empowers you to negotiate with the seller, request repairs, or make an informed decision about proceeding with the purchase.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[--color-trust-blue] via-[--color-trust-blue-dark] to-[--color-trust-blue-light] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1724921812241-6554e4703ef0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBlZ3lwdGlhbiUyMGFwYXJ0bWVudCUyMGJ1aWxkaW5nJTIwZXh0ZXJpb3J8ZW58MXx8fHwxNzc5MTQ4MTYwfDA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Building"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full mb-6">
              <Shield className="w-4 h-4" />
              <span className="text-sm">Egypt's #1 Property Protection Platform</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Protect Your Property Investment
            </h1>
            <p className="text-xl mb-8 text-white/90">
              Verify ownership, legal papers, engineering quality, and government approvals before you buy. 
              Trusted by thousands of Egyptian property buyers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-[--color-security-green] hover:bg-[--color-security-green-dark] text-white"
                asChild
              >
                <Link to="/customer/create-request">
                  Start Verification <ChevronRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-white/10 border-white/30 text-white hover:bg-white/20"
                asChild
              >
                <Link to="/pricing">View Pricing</Link>
              </Button>
            </div>
            <div className="flex flex-wrap gap-6 mt-8">
              <TrustBadge icon="shield" text="Bank-Level Security" className="text-white/90" />
              <TrustBadge icon="check" text="Verified Experts" className="text-white/90" />
              <TrustBadge icon="lock" text="100% Confidential" className="text-white/90" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[--color-trust-blue] mb-2">5,000+</div>
              <div className="text-muted-foreground">Properties Verified</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[--color-security-green] mb-2">98%</div>
              <div className="text-muted-foreground">Customer Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[--color-premium-gold] mb-2">150+</div>
              <div className="text-muted-foreground">Expert Professionals</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[--color-trust-blue] mb-2">7-14</div>
              <div className="text-muted-foreground">Days Average</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[--color-trust-blue] mb-4">
              Our Protection Services
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive verification services to ensure your property investment is safe and secure
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card key={index} className="border-2 hover:border-[--color-trust-blue] transition-all hover:shadow-lg">
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-xl ${service.bgColor} flex items-center justify-center mb-4`}>
                      <Icon className={`w-6 h-6 ${service.color}`} />
                    </div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {service.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" variant="outline" asChild>
              <Link to="/services">
                View All Services <ChevronRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[--color-trust-blue] mb-4">
              How It Works
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Simple, transparent process from start to finish
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((item, index) => (
              <div key={index} className="relative">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[--color-trust-blue] to-[--color-security-green] text-white flex items-center justify-center text-2xl font-bold mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
                {index < howItWorks.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-[60%] w-full h-0.5 bg-gradient-to-r from-[--color-security-green] to-transparent" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Trust Us */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[--color-trust-blue] mb-4">
              Why Trust PropertyGuard
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-6">
              <Award className="w-12 h-12 text-[--color-premium-gold] mx-auto mb-4" />
              <CardTitle className="mb-3">Licensed Experts</CardTitle>
              <CardDescription>
                All our lawyers, engineers, and government experts are fully licensed and certified professionals
              </CardDescription>
            </Card>
            <Card className="text-center p-6">
              <Clock className="w-12 h-12 text-[--color-security-green] mx-auto mb-4" />
              <CardTitle className="mb-3">Fast Turnaround</CardTitle>
              <CardDescription>
                Get your complete verification report within 7-14 business days with priority options available
              </CardDescription>
            </Card>
            <Card className="text-center p-6">
              <Users className="w-12 h-12 text-[--color-trust-blue] mx-auto mb-4" />
              <CardTitle className="mb-3">5,000+ Happy Clients</CardTitle>
              <CardDescription>
                Join thousands of satisfied customers who protected their property investments with us
              </CardDescription>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[--color-trust-blue] mb-4">
              Customer Testimonials
            </h2>
            <p className="text-lg text-muted-foreground">
              See what our customers say about us
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[--color-premium-gold] text-[--color-premium-gold]" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">"{testimonial.content}"</p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[--color-trust-blue] mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="bg-white rounded-lg px-6">
                <AccordionTrigger className="text-left hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[--color-trust-blue] to-[--color-trust-blue-dark] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Shield className="w-16 h-16 mx-auto mb-6 text-[--color-security-green]" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Protect Your Investment?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Start your property verification today and buy with confidence
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-[--color-security-green] hover:bg-[--color-security-green-dark]"
              asChild
            >
              <Link to="/customer/create-request">
                Start Verification Now
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-white text-[--color-trust-blue] hover:bg-gray-100"
              asChild
            >
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
