import { Link } from "react-router";
import { FileText, Clock, CheckCircle, AlertCircle, Plus, TrendingUp } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Progress } from "../../components/ui/progress";

export default function CustomerDashboard() {
  const stats = [
    {
      title: "Active Requests",
      value: "2",
      icon: Clock,
      color: "text-[--color-trust-blue]",
      bgColor: "bg-[--color-trust-blue]/10",
    },
    {
      title: "Completed",
      value: "3",
      icon: CheckCircle,
      color: "text-[--color-security-green]",
      bgColor: "bg-[--color-security-green]/10",
    },
    {
      title: "Total Requests",
      value: "5",
      icon: FileText,
      color: "text-[--color-premium-gold]",
      bgColor: "bg-[--color-premium-gold]/10",
    },
  ];

  const recentRequests = [
    {
      id: "REQ-2401",
      propertyType: "Apartment",
      location: "New Cairo, Egypt",
      status: "In Progress",
      progress: 65,
      statusColor: "bg-blue-500",
      currentStep: "Engineering Inspection",
      date: "May 15, 2026",
    },
    {
      id: "REQ-2398",
      propertyType: "Villa",
      location: "6th October City",
      status: "Under Review",
      progress: 35,
      statusColor: "bg-orange-500",
      currentStep: "Legal Verification",
      date: "May 12, 2026",
    },
    {
      id: "REQ-2385",
      propertyType: "Commercial",
      location: "Nasr City, Cairo",
      status: "Completed",
      progress: 100,
      statusColor: "bg-[--color-security-green]",
      currentStep: "Report Ready",
      date: "May 8, 2026",
    },
  ];

  const notifications = [
    {
      type: "success",
      message: "Engineering report uploaded for REQ-2401",
      time: "2 hours ago",
    },
    {
      type: "info",
      message: "Expert assigned to your case REQ-2398",
      time: "1 day ago",
    },
    {
      type: "warning",
      message: "Additional documents required for REQ-2401",
      time: "2 days ago",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[--color-trust-blue]">Welcome Back!</h1>
          <p className="text-muted-foreground mt-1">Manage your property verification requests</p>
        </div>
        <Button
          className="bg-[--color-security-green] hover:bg-[--color-security-green-dark]"
          asChild
        >
          <Link to="/customer/create-request">
            <Plus className="w-5 h-5 mr-2" />
            New Request
          </Link>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6">
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

      {/* Recent Requests */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Recent Requests</CardTitle>
              <CardDescription>Track your property verification progress</CardDescription>
            </div>
            <Button variant="ghost" asChild>
              <Link to="/customer/requests">View All</Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentRequests.map((request) => (
              <Link
                key={request.id}
                to={`/customer/requests/${request.id}`}
                className="block"
              >
                <div className="border rounded-lg p-4 hover:border-[--color-trust-blue] transition-all cursor-pointer">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-semibold text-[--color-trust-blue]">
                          {request.id}
                        </span>
                        <Badge className={`${request.statusColor} text-white`}>
                          {request.status}
                        </Badge>
                      </div>
                      <p className="font-medium">{request.propertyType}</p>
                      <p className="text-sm text-muted-foreground">{request.location}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Current: {request.currentStep}
                      </p>
                    </div>
                    <div className="flex-1 max-w-xs">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium">{request.progress}%</span>
                      </div>
                      <Progress value={request.progress} className="h-2" />
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">{request.date}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Notifications & Quick Actions */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates on your requests</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {notifications.map((notif, index) => (
                <div key={index} className="flex items-start gap-3 pb-3 border-b last:border-0">
                  {notif.type === "success" && (
                    <CheckCircle className="w-5 h-5 text-[--color-security-green] mt-0.5" />
                  )}
                  {notif.type === "info" && (
                    <FileText className="w-5 h-5 text-[--color-trust-blue] mt-0.5" />
                  )}
                  {notif.type === "warning" && (
                    <AlertCircle className="w-5 h-5 text-orange-500 mt-0.5" />
                  )}
                  <div className="flex-1">
                    <p className="text-sm">{notif.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">{notif.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and features</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button
                variant="outline"
                className="w-full justify-start"
                asChild
              >
                <Link to="/customer/create-request">
                  <Plus className="w-5 h-5 mr-3" />
                  Create New Verification Request
                </Link>
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                asChild
              >
                <Link to="/customer/requests">
                  <FileText className="w-5 h-5 mr-3" />
                  View All My Requests
                </Link>
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                asChild
              >
                <Link to="/customer/messages">
                  <TrendingUp className="w-5 h-5 mr-3" />
                  Message Support Team
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
