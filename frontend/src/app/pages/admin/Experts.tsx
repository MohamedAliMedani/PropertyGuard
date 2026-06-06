import { Search, UserPlus } from "lucide-react";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";

export default function AdminExperts() {
  const experts = [
    { id: 1, name: "Dr. Mohamed Ahmed", role: "Lawyer", cases: 24, rating: 4.9, status: "Active" },
    { id: 2, name: "Eng. Sarah Hassan", role: "Engineer", cases: 18, rating: 4.8, status: "Active" },
    { id: 3, name: "Ahmed Khalil", role: "Gov. Expert", cases: 15, rating: 4.7, status: "Active" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-[--color-trust-blue]">Expert Management</h1>
          <p className="text-muted-foreground mt-1">Manage lawyers, engineers, and specialists</p>
        </div>
        <Button className="bg-[--color-security-green] hover:bg-[--color-security-green-dark]">
          <UserPlus className="w-4 h-4 mr-2" />
          Add Expert
        </Button>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search experts..." className="pl-10" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Active Cases</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {experts.map((expert) => (
                <TableRow key={expert.id}>
                  <TableCell className="font-medium">{expert.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{expert.role}</Badge>
                  </TableCell>
                  <TableCell>{expert.cases}</TableCell>
                  <TableCell>
                    <span className="text-[--color-premium-gold]">★ {expert.rating}</span>
                  </TableCell>
                  <TableCell>
                    <Badge className="bg-[--color-security-green]">{expert.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">Manage</Button>
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
