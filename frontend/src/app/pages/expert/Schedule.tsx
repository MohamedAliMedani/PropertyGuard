import { Calendar, MapPin, Clock } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";

export default function ExpertSchedule() {
  const visits = [
    {
      id: "REQ-2401",
      propertyType: "Apartment",
      location: "New Cairo, Building 5, Apt 12",
      date: "May 20, 2026",
      time: "2:00 PM - 3:30 PM",
      status: "Confirmed",
      contactName: "Ahmed Hassan",
      contactPhone: "+20 123 456 7890",
    },
    {
      id: "REQ-2405",
      propertyType: "Villa",
      location: "Sheikh Zayed, Compound A",
      date: "May 22, 2026",
      time: "10:00 AM - 12:00 PM",
      status: "Pending",
      contactName: "Fatima Mohamed",
      contactPhone: "+20 111 222 3333",
    },
    {
      id: "REQ-2410",
      propertyType: "Commercial",
      location: "Nasr City, Shop 45",
      date: "May 23, 2026",
      time: "3:00 PM - 4:30 PM",
      status: "Confirmed",
      contactName: "Khaled Samir",
      contactPhone: "+20 100 555 6666",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[--color-trust-blue] mb-2">Visit Schedule</h1>
        <p className="text-muted-foreground">Manage your property visit appointments</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Upcoming Visits</CardTitle>
          <CardDescription>Your scheduled property inspections</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {visits.map((visit) => (
              <div key={visit.id} className="border-2 rounded-lg p-6">
                <div className="flex flex-col lg:flex-row justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-lg font-semibold text-[--color-trust-blue]">
                        {visit.id}
                      </h3>
                      <Badge
                        className={
                          visit.status === "Confirmed"
                            ? "bg-[--color-security-green]"
                            : "bg-orange-500"
                        }
                      >
                        {visit.status}
                      </Badge>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium">{visit.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span>{visit.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span>{visit.location}</span>
                      </div>
                    </div>
                  </div>

                  <div className="lg:w-64 space-y-3">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">Contact Person</p>
                      <p className="font-medium">{visit.contactName}</p>
                      <p className="text-sm text-muted-foreground">{visit.contactPhone}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        View Case
                      </Button>
                      <Button size="sm" className="flex-1 bg-[--color-security-green] hover:bg-[--color-security-green-dark]">
                        Start Visit
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
