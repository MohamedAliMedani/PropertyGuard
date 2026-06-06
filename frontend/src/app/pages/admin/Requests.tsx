import { Search } from "lucide-react";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";

export default function AdminRequests() {
  const requests = [
    { id: "REQ-2420", customer: "Ahmed Hassan", type: "Apartment", package: "Premium", status: "In Progress", expert: "Eng. Sarah Hassan" },
    { id: "REQ-2419", customer: "Fatima Mohamed", type: "Villa", package: "Full Protection", status: "Under Review", expert: "Dr. Mohamed Ahmed" },
    { id: "REQ-2418", customer: "Khaled Samir", type: "Commercial", package: "Premium", status: "Completed", expert: "Ahmed Khalil" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[--color-trust-blue]">Request Management</h1>
        <p className="text-muted-foreground mt-1">Monitor and manage all verification requests</p>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search requests..." className="pl-10" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Request ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Package</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Assigned Expert</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell className="font-medium text-[--color-trust-blue]">{request.id}</TableCell>
                  <TableCell>{request.customer}</TableCell>
                  <TableCell>{request.type}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{request.package}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={
                      request.status === "Completed" ? "bg-[--color-security-green]" :
                      request.status === "In Progress" ? "bg-blue-500" : "bg-orange-500"
                    }>
                      {request.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{request.expert}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">View</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
