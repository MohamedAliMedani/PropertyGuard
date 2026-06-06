import { Save } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Button } from "../../components/ui/button";
import { Separator } from "../../components/ui/separator";

export default function AdminSettings() {
  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[--color-trust-blue]">Platform Settings</h1>
        <p className="text-muted-foreground mt-1">Configure platform settings and preferences</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>General Settings</CardTitle>
          <CardDescription>Basic platform configuration</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="platformName">Platform Name</Label>
            <Input id="platformName" defaultValue="PropertyGuard Egypt" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="supportEmail">Support Email</Label>
            <Input id="supportEmail" type="email" defaultValue="info@propertyguard.eg" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="supportPhone">Support Phone</Label>
            <Input id="supportPhone" type="tel" defaultValue="+20 123 456 7890" />
          </div>
          <Button className="bg-[--color-trust-blue] hover:bg-[--color-trust-blue-dark]">
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Package Pricing</CardTitle>
          <CardDescription>Manage verification package prices</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="basicPrice">Basic Package (EGP)</Label>
              <Input id="basicPrice" type="number" defaultValue="2500" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="premiumPrice">Premium Package (EGP)</Label>
              <Input id="premiumPrice" type="number" defaultValue="5500" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fullPrice">Full Protection (EGP)</Label>
              <Input id="fullPrice" type="number" defaultValue="9500" />
            </div>
          </div>
          <Button className="bg-[--color-trust-blue] hover:bg-[--color-trust-blue-dark]">
            <Save className="w-4 h-4 mr-2" />
            Update Pricing
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>SLA Configuration</CardTitle>
          <CardDescription>Service level agreement timelines</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="basicSLA">Basic SLA (days)</Label>
              <Input id="basicSLA" type="number" defaultValue="10" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="premiumSLA">Premium SLA (days)</Label>
              <Input id="premiumSLA" type="number" defaultValue="7" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fullSLA">Full Protection SLA (days)</Label>
              <Input id="fullSLA" type="number" defaultValue="5" />
            </div>
          </div>
          <Button className="bg-[--color-trust-blue] hover:bg-[--color-trust-blue-dark]">
            <Save className="w-4 h-4 mr-2" />
            Save SLA
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notification Settings</CardTitle>
          <CardDescription>Configure platform notifications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            "Email notifications for new requests",
            "SMS notifications for urgent cases",
            "WhatsApp notifications for updates",
            "Daily summary reports",
          ].map((setting, index) => (
            <div key={index}>
              <div className="flex items-center justify-between">
                <Label>{setting}</Label>
                <input type="checkbox" defaultChecked className="w-4 h-4" />
              </div>
              {index < 3 && <Separator className="my-4" />}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
