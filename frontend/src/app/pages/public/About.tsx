import { Shield, Target, Users, Award, Heart, TrendingUp } from "lucide-react";
import { Card, CardContent } from "../../components/ui/card";

export default function About() {
  const values = [
    {
      icon: Shield,
      title: "Trust & Security",
      description: "We prioritize the security of your information and the integrity of our verification process.",
    },
    {
      icon: Target,
      title: "Accuracy",
      description: "Our expert team ensures every detail is verified with precision and thoroughness.",
    },
    {
      icon: Heart,
      title: "Customer First",
      description: "Your peace of mind is our priority. We're here to protect your investment.",
    },
    {
      icon: Award,
      title: "Excellence",
      description: "We maintain the highest standards in property verification services.",
    },
  ];

  const team = [
    {
      role: "Licensed Lawyers",
      count: "50+",
      description: "Expert legal professionals specialized in real estate law",
    },
    {
      role: "Civil Engineers",
      count: "75+",
      description: "Certified engineers with extensive property inspection experience",
    },
    {
      role: "Government Experts",
      count: "25+",
      description: "Specialists in permits, compliance, and government procedures",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[--color-trust-blue] to-[--color-trust-blue-light] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About PropertyGuard Egypt</h1>
            <p className="text-xl text-white/90">
              Egypt's leading property protection platform, dedicated to helping buyers make safe and informed real estate investments
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[--color-trust-blue] mb-6">
              Our Mission
            </h2>
            <p className="text-lg text-foreground leading-relaxed">
              We believe every Egyptian deserves to buy property with confidence. Our mission is to protect property buyers from fraud, legal issues, and poor-quality investments by providing comprehensive, professional verification services that bring transparency and trust to Egypt's real estate market.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-16">
            <Card className="text-center p-6">
              <TrendingUp className="w-12 h-12 text-[--color-security-green] mx-auto mb-4" />
              <div className="text-3xl font-bold text-[--color-trust-blue] mb-2">5,000+</div>
              <p className="text-muted-foreground">Properties Verified</p>
            </Card>
            <Card className="text-center p-6">
              <Users className="w-12 h-12 text-[--color-security-green] mx-auto mb-4" />
              <div className="text-3xl font-bold text-[--color-trust-blue] mb-2">150+</div>
              <p className="text-muted-foreground">Expert Professionals</p>
            </Card>
            <Card className="text-center p-6">
              <Award className="w-12 h-12 text-[--color-security-green] mx-auto mb-4" />
              <div className="text-3xl font-bold text-[--color-trust-blue] mb-2">98%</div>
              <p className="text-muted-foreground">Satisfaction Rate</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[--color-trust-blue] mb-4">
              Our Core Values
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card key={index} className="text-center p-6">
                  <div className="w-14 h-14 bg-[--color-trust-blue]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-7 h-7 text-[--color-trust-blue]" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[--color-trust-blue] mb-4">
              Our Expert Team
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              All our experts are licensed, certified, and experienced professionals
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="p-8 text-center border-2 hover:border-[--color-trust-blue] transition-all">
                <CardContent className="p-0">
                  <div className="text-5xl font-bold text-[--color-security-green] mb-2">
                    {member.count}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{member.role}</h3>
                  <p className="text-muted-foreground">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[--color-trust-blue] mb-6">
              Our Story
            </h2>
          </div>

          <div className="space-y-6 text-lg leading-relaxed">
            <p>
              PropertyGuard Egypt was founded in 2020 by a team of legal and real estate professionals who witnessed too many families lose money due to property fraud and undisclosed issues. We saw a gap in the Egyptian market for a trusted, comprehensive property verification service.
            </p>
            <p>
              Starting with just 5 team members, we've grown to over 150 licensed professionals serving thousands of customers across Egypt. Our platform has prevented millions of Egyptian pounds in potential losses by identifying legal issues, structural problems, and fraudulent property deals before buyers committed.
            </p>
            <p>
              Today, we're proud to be Egypt's most trusted property protection platform, helping families, investors, and Egyptians abroad make safe property investments with complete confidence.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[--color-trust-blue] mb-4">
              Why Choose PropertyGuard?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Licensed Professionals",
                description: "All our experts are licensed, certified, and insured professionals with years of experience.",
              },
              {
                title: "Comprehensive Reports",
                description: "Detailed, easy-to-understand reports with photos, findings, and clear recommendations.",
              },
              {
                title: "Fast Turnaround",
                description: "Most verifications completed within 7-14 days with priority options available.",
              },
              {
                title: "Secure Platform",
                description: "Bank-level encryption to protect your documents and personal information.",
              },
              {
                title: "Transparent Pricing",
                description: "No hidden fees. You know exactly what you're paying for upfront.",
              },
              {
                title: "Expert Support",
                description: "Dedicated customer support team available via phone, email, and WhatsApp.",
              },
            ].map((item, index) => (
              <Card key={index} className="p-6">
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
