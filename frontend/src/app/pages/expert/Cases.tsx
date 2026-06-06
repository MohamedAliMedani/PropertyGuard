import { Link } from "react-router";
import { Search, Filter } from "lucide-react";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";

export default function ExpertCases() {
  const cases = [
    {
      id: "REQ-2401",
      propertyType: "Apartment",
      location: "New Cairo, Egypt",
      status: "In Progress",
      priority: "High",
      assignedDate: "May 18, 2026",
      dueDate: "May 25, 2026",
    },
    {
      id: "REQ-2398",
      propertyType: "Villa",
      location: "6th October City",
      status: "Pending Review",
      priority: "Normal",
      assignedDate: "May 17, 2026",
      dueDate: "May 24, 2026",
    },
    {
      id: "REQ-2395",
      propertyType: "Commercial",
      location: "Nasr City, Cairo",
      status: "In Progress",
      priority: "High",
      assignedDate: "May 16, 2026",
      dueDate: "May 23, 2026",
    },
    {
      id: "REQ-2390",
      propertyType: "Land",
      location: "Sheikh Zayed",
      status: "Completed",
      priority: "Normal",
      assignedDate: "May 10, 2026",
      completedDate: "May 17, 2026",
    },
    {
      id: "REQ-2385",
      propertyType: "Apartment",
      location: "Maadi, Cairo",
      status: "Completed",
      priority: "Normal",
      assignedDate: "May 8, 2026",
      completedDate: "May 15, 2026",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[--color-trust-blue] mb-2">My Cases</h1>
        <p className="text-muted-foreground">All cases assigned to you</p>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search by case ID or location..." className="pl-10" />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="progress">In Progress</SelectItem>
                <SelectItem value="review">Pending Review</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priority</SelectItem>
                <SelectItem value="high">High Priority</SelectItem>
                <SelectItem value="normal">Normal Priority</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Cases List */}
      <div className="space-y-4">
        {cases.map((caseItem) => (
          <Card key={caseItem.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <Link to={`/expert/cases/${caseItem.id}`}>
                <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className="text-xl font-semibold text-[--color-trust-blue]">
                        {caseItem.id}
                      </h3>
                      <Badge
                        className={
                          caseItem.status === "Completed"
                            ? "bg-[--color-security-green]"
                            : caseItem.status === "In Progress"
                            ? "bg-blue-500"
                            : "bg-orange-500"
                        }
                      >
                        {caseItem.status}
                      </Badge>
                      {caseItem.priority === "High" && (
                        <Badge variant="outline" className="border-red-500 text-red-500">
                          High Priority
                        </Badge>
                      )}
                    </div>

                    <div className="grid md:grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-muted-foreground">Property Type: </span>
                        <span className="font-medium">{caseItem.propertyType}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Location: </span>
                        <span className="font-medium">{caseItem.location}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Assigned: </span>
                        <span className="font-medium">{caseItem.assignedDate}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">
                          {caseItem.status === "Completed" ? "Completed: " : "Due: "}
                        </span>
                        <span className="font-medium">
                          {caseItem.completedDate || caseItem.dueDate}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="lg:w-48">
                    <Button className="w-full" variant="outline">
                      View Case Details
                    </Button>
                  </div>
                </div>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
