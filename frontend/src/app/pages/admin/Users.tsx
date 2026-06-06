import { Search, UserPlus } from "lucide-react";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";

export default function AdminUsers() {
  const users = [
    { id: 1, name: "Ahmed Hassan", email: "ahmed@example.com", phone: "+20 123 456 7890", requests: 5, joined: "Jan 15, 2026", status: "Active" },
    { id: 2, name: "Fatima Mohamed", email: "fatima@example.com", phone: "+20 111 222 3333", requests: 3, joined: "Feb 10, 2026", status: "Active" },
    { id: 3, name: "Khaled Samir", email: "khaled@example.com", phone: "+20 100 555 6666", requests: 8, joined: "Mar 5, 2026", status: "Active" },
    { id: 4, name: "Sara Ali", email: "sara@example.com", phone: "+20 122 333 4444", requests: 2, joined: "Apr 20, 2026", status: "Inactive" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-[--color-trust-blue]">User Management</h1>
          <p className="text-muted-foreground mt-1">Manage platform users</p>
        </div>
        <Button className="bg-[--color-security-green] hover:bg-[--color-security-green-dark]">
          <UserPlus className="w-4 h-4 mr-2" />
          Add User
        </Button>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search users..." className="pl-10" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Requests</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>{user.requests}</TableCell>
                  <TableCell>{user.joined}</TableCell>
                  <TableCell>
                    <Badge className={user.status === "Active" ? "bg-[--color-security-green]" : "bg-gray-500"}>
                      {user.status}
                    </Badge>
                  </TableCell>
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
