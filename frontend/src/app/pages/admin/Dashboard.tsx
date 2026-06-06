import { Users, FileText, DollarSign, TrendingUp, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function AdminDashboard() {
  const stats = [
    {
      title: "Total Users",
      value: "2,547",
      change: "+12.5%",
      icon: Users,
      color: "text-[--color-trust-blue]",
      bgColor: "bg-[--color-trust-blue]/10",
    },
    {
      title: "Active Requests",
      value: "145",
      change: "+8.2%",
      icon: FileText,
      color: "text-[--color-security-green]",
      bgColor: "bg-[--color-security-green]/10",
    },
    {
      title: "Revenue (MTD)",
      value: "1.2M EGP",
      change: "+15.3%",
      icon: DollarSign,
      color: "text-[--color-premium-gold]",
      bgColor: "bg-[--color-premium-gold]/10",
    },
    {
      title: "Completion Rate",
      value: "94%",
      change: "+2.1%",
      icon: TrendingUp,
      color: "text-[--color-security-green]",
      bgColor: "bg-[--color-security-green]/10",
    },
  ];

  const monthlyRevenue = [
    { month: "Jan", revenue: 850000, requests: 85 },
    { month: "Feb", revenue: 920000, requests: 92 },
    { month: "Mar", revenue: 1050000, requests: 105 },
    { month: "Apr", revenue: 1150000, requests: 115 },
    { month: "May", revenue: 1200000, requests: 120 },
  ];

  const requestsByType = [
    { name: "Apartment", value: 45, color: "#0f3460" },
    { name: "Villa", value: 30, color: "#10b981" },
    { name: "Land", value: 15, color: "#d4af37" },
    { name: "Commercial", value: 10, color: "#3b82f6" },
  ];

  const packageDistribution = [
    { name: "Basic", value: 25 },
    { name: "Premium", value: 50 },
    { name: "Full Protection", value: 25 },
  ];

  const recentRequests = [
    { id: "REQ-2420", customer: "Ahmed Hassan", type: "Apartment", status: "In Progress", date: "May 18, 2026" },
    { id: "REQ-2419", customer: "Fatima Mohamed", type: "Villa", status: "Under Review", date: "May 18, 2026" },
    { id: "REQ-2418", customer: "Khaled Samir", type: "Commercial", status: "Completed", date: "May 17, 2026" },
  ];

  const alerts = [
    { type: "warning", message: "5 requests approaching deadline", count: 5 },
    { type: "info", message: "12 new user registrations today", count: 12 },
    { type: "error", message: "2 delayed expert assignments", count: 2 },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-[--color-trust-blue]">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-1">Platform overview and analytics</p>
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
                <div className="text-3xl font-bold text-[--color-trust-blue] mb-1">{stat.value}</div>
                <p className="text-sm text-[--color-security-green]">{stat.change} from last month</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Alerts */}
      <div className="grid md:grid-cols-3 gap-4">
        {alerts.map((alert, index) => (
          <Card key={index} className={`border-l-4 ${
            alert.type === "warning" ? "border-l-orange-500" :
            alert.type === "error" ? "border-l-red-500" :
            "border-l-blue-500"
          }`}>
            <CardContent className="p-4 flex items-center gap-3">
              <AlertTriangle className={`w-5 h-5 ${
                alert.type === "warning" ? "text-orange-500" :
                alert.type === "error" ? "text-red-500" :
                "text-blue-500"
              }`} />
              <div className="flex-1">
                <p className="text-sm font-medium">{alert.message}</p>
              </div>
              <Badge variant="outline">{alert.count}</Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue & Requests Trend</CardTitle>
            <CardDescription>Monthly performance overview</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyRevenue}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="revenue" stroke="#0f3460" name="Revenue (EGP)" />
                <Line yAxisId="right" type="monotone" dataKey="requests" stroke="#10b981" name="Requests" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Property Types */}
        <Card>
          <CardHeader>
            <CardTitle>Requests by Property Type</CardTitle>
            <CardDescription>Distribution of current requests</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={requestsByType}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {requestsByType.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Package Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Package Distribution</CardTitle>
          <CardDescription>Popularity of verification packages</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={packageDistribution}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Recent Requests */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Requests</CardTitle>
          <CardDescription>Latest verification requests</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentRequests.map((request) => (
              <div key={request.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-semibold text-[--color-trust-blue]">{request.id}</p>
                  <p className="text-sm text-muted-foreground">
                    {request.customer} • {request.type}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className={
                    request.status === "Completed" ? "bg-[--color-security-green]" :
                    request.status === "In Progress" ? "bg-blue-500" : "bg-orange-500"
                  }>
                    {request.status}
                  </Badge>
                  <span className="text-sm text-muted-foreground">{request.date}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
