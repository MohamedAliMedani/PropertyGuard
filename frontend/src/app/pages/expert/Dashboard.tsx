import { Link } from "react-router";
import { Briefcase, CheckCircle, Clock, Calendar } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";

export default function ExpertDashboard() {
  const stats = [
    {
      title: "Active Cases",
      value: "8",
      icon: Briefcase,
      color: "text-[--color-trust-blue]",
      bgColor: "bg-[--color-trust-blue]/10",
    },
    {
      title: "Pending Review",
      value: "3",
      icon: Clock,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
    },
    {
      title: "Completed This Month",
      value: "24",
      icon: CheckCircle,
      color: "text-[--color-security-green]",
      bgColor: "bg-[--color-security-green]/10",
    },
    {
      title: "Upcoming Visits",
      value: "5",
      icon: Calendar,
      color: "text-[--color-premium-gold]",
      bgColor: "bg-[--color-premium-gold]/10",
    },
  ];

  const recentCases = [
    {
      id: "REQ-2401",
      propertyType: "Apartment",
      location: "New Cairo",
      status: "In Progress",
      priority: "High",
      assignedDate: "May 18, 2026",
    },
    {
      id: "REQ-2398",
      propertyType: "Villa",
      location: "6th October City",
      status: "Pending Review",
      priority: "Normal",
      assignedDate: "May 17, 2026",
    },
    {
      id: "REQ-2395",
      propertyType: "Commercial",
      location: "Nasr City",
      status: "In Progress",
      priority: "High",
      assignedDate: "May 16, 2026",
    },
  ];

  const upcomingVisits = [
    {
      requestId: "REQ-2401",
      propertyType: "Apartment",
      location: "New Cairo, Building 5",
      date: "May 20, 2026",
      time: "2:00 PM",
    },
    {
      requestId: "REQ-2405",
      propertyType: "Villa",
      location: "Sheikh Zayed",
      date: "May 22, 2026",
      time: "10:00 AM",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-[--color-trust-blue]">Expert Dashboard</h1>
        <p className="text-muted-foreground mt-1">Manage your assigned cases and schedule</p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className={`w-10 h-10 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-[--color-trust-blue]">{stat.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Cases and Upcoming Visits */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Cases */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Recent Cases</CardTitle>
                <CardDescription>Your recently assigned cases</CardDescription>
              </div>
              <Button variant="ghost" asChild>
                <Link to="/expert/cases">View All</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentCases.map((caseItem) => (
                <Link
                  key={caseItem.id}
                  to={`/expert/cases/${caseItem.id}`}
                  className="block"
                >
                  <div className="border rounded-lg p-4 hover:border-[--color-trust-blue] transition-all cursor-pointer">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-semibold text-[--color-trust-blue]">
                          {caseItem.id}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {caseItem.propertyType} • {caseItem.location}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Badge
                          className={
                            caseItem.status === "In Progress"
                              ? "bg-blue-500"
                              : "bg-orange-500"
                          }
                        >
                          {caseItem.status}
                        </Badge>
                        {caseItem.priority === "High" && (
                          <Badge variant="outline" className="border-red-500 text-red-500">
                            High
                          </Badge>
                        )}
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Assigned: {caseItem.assignedDate}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Visits */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Upcoming Visits</CardTitle>
                <CardDescription>Your scheduled property visits</CardDescription>
              </div>
              <Button variant="ghost" asChild>
                <Link to="/expert/schedule">View Schedule</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingVisits.map((visit, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-semibold text-[--color-trust-blue]">
                        {visit.requestId}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {visit.propertyType}
                      </p>
                      <p className="text-sm text-muted-foreground">{visit.location}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{visit.date}</p>
                      <p className="text-sm text-[--color-security-green]">{visit.time}</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="w-full mt-2">
                    View Details
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance */}
      <Card>
        <CardHeader>
          <CardTitle>This Month's Performance</CardTitle>
          <CardDescription>Your activity summary for May 2026</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-6">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Cases Reviewed</p>
              <p className="text-2xl font-bold text-[--color-trust-blue]">24</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Site Visits</p>
              <p className="text-2xl font-bold text-[--color-trust-blue]">18</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Reports Submitted</p>
              <p className="text-2xl font-bold text-[--color-trust-blue]">22</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Avg. Rating</p>
              <p className="text-2xl font-bold text-[--color-premium-gold]">4.9</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
