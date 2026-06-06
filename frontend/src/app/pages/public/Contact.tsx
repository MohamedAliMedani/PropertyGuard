import { Mail, Phone, MapPin, MessageCircle, Clock } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";

export default function Contact() {
  const contactMethods = [
    {
      icon: Phone,
      title: "Phone",
      value: "+20 123 456 7890",
      description: "Mon-Sat, 9 AM - 6 PM",
      color: "text-[--color-trust-blue]",
      bgColor: "bg-[--color-trust-blue]/10",
    },
    {
      icon: Mail,
      title: "Email",
      value: "info@propertyguard.eg",
      description: "We'll respond within 24 hours",
      color: "text-[--color-security-green]",
      bgColor: "bg-[--color-security-green]/10",
    },
    {
      icon: MessageCircle,
      title: "WhatsApp",
      value: "+20 123 456 7890",
      description: "Quick responses",
      color: "text-[--color-premium-gold]",
      bgColor: "bg-[--color-premium-gold]/10",
    },
    {
      icon: MapPin,
      title: "Office",
      value: "Cairo, Egypt",
      description: "By appointment only",
      color: "text-[--color-trust-blue]",
      bgColor: "bg-[--color-trust-blue]/10",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[--color-trust-blue] to-[--color-trust-blue-light] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Have questions? We're here to help. Reach out to our team and we'll get back to you as soon as possible.
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactMethods.map((method, index) => {
              const Icon = method.icon;
              return (
                <Card key={index} className="text-center p-6">
                  <div className={`w-14 h-14 ${method.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <Icon className={`w-7 h-7 ${method.color}`} />
                  </div>
                  <h3 className="font-semibold mb-2">{method.title}</h3>
                  <p className="text-sm font-medium text-[--color-trust-blue] mb-1">
                    {method.value}
                  </p>
                  <p className="text-xs text-muted-foreground">{method.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[--color-trust-blue] mb-4">
              Send Us a Message
            </h2>
            <p className="text-lg text-muted-foreground">
              Fill out the form below and we'll get back to you within 24 hours
            </p>
          </div>

          <Card className="p-8">
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input id="name" placeholder="Ahmed Hassan" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input id="email" type="email" placeholder="ahmed@example.com" />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" placeholder="+20 123 456 7890" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject *</Label>
                  <Select>
                    <SelectTrigger id="subject">
                      <SelectValue placeholder="Select a subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General Inquiry</SelectItem>
                      <SelectItem value="pricing">Pricing Question</SelectItem>
                      <SelectItem value="service">Service Information</SelectItem>
                      <SelectItem value="support">Technical Support</SelectItem>
                      <SelectItem value="partnership">Partnership</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message *</Label>
                <Textarea
                  id="message"
                  rows={6}
                  placeholder="Tell us how we can help you..."
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full bg-[--color-trust-blue] hover:bg-[--color-trust-blue-dark]"
              >
                Send Message
              </Button>
            </form>
          </Card>
        </div>
      </section>

      {/* Business Hours */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[--color-trust-blue] mb-4">
              Business Hours
            </h2>
          </div>

          <Card className="p-8">
            <CardContent className="p-0">
              <div className="flex items-center gap-4 mb-6">
                <Clock className="w-8 h-8 text-[--color-security-green]" />
                <div>
                  <h3 className="font-semibold text-lg">We're Here to Help</h3>
                  <p className="text-muted-foreground">
                    Our customer support team is available during the following hours:
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b">
                  <span className="font-medium">Monday - Friday</span>
                  <span className="text-muted-foreground">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="font-medium">Saturday</span>
                  <span className="text-muted-foreground">10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="font-medium">Sunday</span>
                  <span className="text-muted-foreground">Closed</span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-[--color-security-green]/10 rounded-lg">
                <p className="text-sm text-center">
                  <strong>Premium & Full Protection customers</strong> have access to 24/7 phone support
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ Link */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-[--color-trust-blue] mb-4">
            Have a Quick Question?
          </h2>
          <p className="text-lg text-muted-foreground mb-6">
            Check out our FAQ section for instant answers to common questions
          </p>
          <Button variant="outline" size="lg">
            View FAQs
          </Button>
        </div>
      </section>
    </div>
  );
}
