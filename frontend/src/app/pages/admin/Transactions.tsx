import { DollarSign, Download } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";

export default function AdminTransactions() {
  const stats = [
    { title: "Total Revenue (MTD)", value: "1,200,000 EGP" },
    { title: "Transactions (MTD)", value: "120" },
    { title: "Avg. Transaction", value: "10,000 EGP" },
  ];

  const transactions = [
    { id: "TXN-5420", requestId: "REQ-2420", customer: "Ahmed Hassan", amount: "5,500 EGP", method: "Visa", status: "Completed", date: "May 18, 2026" },
    { id: "TXN-5419", requestId: "REQ-2419", customer: "Fatima Mohamed", amount: "9,500 EGP", method: "InstaPay", status: "Completed", date: "May 17, 2026" },
    { id: "TXN-5418", requestId: "REQ-2418", customer: "Khaled Samir", amount: "5,500 EGP", method: "Mastercard", status: "Completed", date: "May 16, 2026" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-[--color-trust-blue]">Transaction Management</h1>
          <p className="text-muted-foreground mt-1">Monitor revenue and payments</p>
        </div>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Export Report
        </Button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <DollarSign className="w-5 h-5 text-[--color-premium-gold]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[--color-trust-blue]">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Transaction ID</TableHead>
                <TableHead>Request ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((txn) => (
                <TableRow key={txn.id}>
                  <TableCell className="font-medium">{txn.id}</TableCell>
                  <TableCell className="text-[--color-trust-blue]">{txn.requestId}</TableCell>
                  <TableCell>{txn.customer}</TableCell>
                  <TableCell className="font-semibold">{txn.amount}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{txn.method}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className="bg-[--color-security-green]">{txn.status}</Badge>
                  </TableCell>
                  <TableCell>{txn.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
