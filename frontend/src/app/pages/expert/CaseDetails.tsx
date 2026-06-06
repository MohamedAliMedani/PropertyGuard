import { Upload, FileText, CheckCircle } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Textarea } from "../../components/ui/textarea";
import { Label } from "../../components/ui/label";

export default function ExpertCaseDetails() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold text-[--color-trust-blue]">REQ-2401</h1>
            <Badge className="bg-blue-500 text-white">In Progress</Badge>
            <Badge variant="outline" className="border-red-500 text-red-500">
              High Priority
            </Badge>
          </div>
          <p className="text-muted-foreground">Apartment • New Cairo, Egypt</p>
        </div>
        <Button className="bg-[--color-security-green] hover:bg-[--color-security-green-dark]">
          Submit Report
        </Button>
      </div>

      {/* Property Info */}
      <Card>
        <CardHeader>
          <CardTitle>Property Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Property Type</p>
              <p className="font-semibold">Apartment</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Location</p>
              <p className="font-semibold">New Cairo, Egypt</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Area</p>
              <p className="font-semibold">150 sqm</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Price</p>
              <p className="font-semibold">2,500,000 EGP</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Documents */}
      <Card>
        <CardHeader>
          <CardTitle>Customer Documents</CardTitle>
          <CardDescription>Review uploaded documents</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {["Title Deed.pdf", "Sales Contract.pdf", "Building Permit.pdf"].map((doc, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-[--color-trust-blue]" />
                  <span>{doc}</span>
                </div>
                <Button variant="ghost" size="sm">Download</Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Report Submission */}
      <Card>
        <CardHeader>
          <CardTitle>Submit Your Report</CardTitle>
          <CardDescription>Add your findings and upload report documents</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="findings">Findings & Comments</Label>
            <Textarea
              id="findings"
              rows={6}
              placeholder="Enter your detailed findings here..."
            />
          </div>

          <div className="border-2 border-dashed rounded-lg p-6 text-center">
            <Upload className="w-8 h-8 text-[--color-trust-blue] mx-auto mb-2" />
            <p className="font-medium mb-1">Upload Report Documents</p>
            <p className="text-sm text-muted-foreground mb-3">PDF, Images (Max 20MB)</p>
            <Button variant="outline">Choose Files</Button>
          </div>

          <div className="flex items-center gap-2">
            <input type="checkbox" id="confirm" className="w-4 h-4" />
            <Label htmlFor="confirm" className="text-sm">
              I confirm all information is accurate and complete
            </Label>
          </div>

          <Button className="w-full bg-[--color-security-green] hover:bg-[--color-security-green-dark]">
            <CheckCircle className="w-4 h-4 mr-2" />
            Submit Report
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
