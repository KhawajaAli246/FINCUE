
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, Check, Plus } from "lucide-react";
import { toast } from "sonner";

const BillingSettings = () => {
  const invoices = [
    { id: "INV-001", date: "Apr 1, 2023", amount: "$49.00", status: "Paid" },
    { id: "INV-002", date: "Mar 1, 2023", amount: "$49.00", status: "Paid" },
    { id: "INV-003", date: "Feb 1, 2023", amount: "$49.00", status: "Paid" },
    { id: "INV-004", date: "Jan 1, 2023", amount: "$49.00", status: "Paid" },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Current Plan</CardTitle>
          <CardDescription>Manage your subscription and billing information</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900 rounded-xl p-6 mb-6">
            <div className="flex items-center gap-2 mb-2">
              <div className="bg-emerald-100 dark:bg-emerald-900 p-1.5 rounded-full">
                <Check className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="font-semibold text-emerald-700 dark:text-emerald-400">Premium Plan</h3>
            </div>
            <p className="text-sm text-emerald-700 dark:text-emerald-400 mb-4">You're currently on the Premium plan, which includes advanced analytics and real-time data.</p>
            <div className="flex justify-between items-center">
              <div>
                <span className="text-2xl font-bold">$49</span>
                <span className="text-sm text-muted-foreground">/month</span>
              </div>
              <Button variant="outline" onClick={() => toast.info("This would take you to plan upgrade options")}>
                Upgrade Plan
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium text-lg">Payment Methods</h3>
            
            <div className="border rounded-lg divide-y">
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <CreditCard className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Visa ending in 4242</p>
                    <p className="text-sm text-muted-foreground">Expires 04/25</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="px-2 py-1 bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-400 text-xs font-medium rounded">
                    Default
                  </div>
                  <Button variant="ghost" size="sm">Edit</Button>
                </div>
              </div>
              
              <div className="p-4">
                <Button variant="outline" className="w-full" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Payment Method
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Billing History</CardTitle>
          <CardDescription>View your recent invoices and payment history</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-muted/50">
                  <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Invoice</th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Date</th>
                  <th className="text-right px-4 py-3 text-sm font-medium text-muted-foreground">Amount</th>
                  <th className="text-right px-4 py-3 text-sm font-medium text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {invoices.map((invoice) => (
                  <tr key={invoice.id} className="hover:bg-muted/30">
                    <td className="px-4 py-3 text-sm">
                      <Button variant="link" className="p-0 h-auto text-blue-600 dark:text-blue-400">
                        {invoice.id}
                      </Button>
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{invoice.date}</td>
                    <td className="px-4 py-3 text-sm text-right">{invoice.amount}</td>
                    <td className="px-4 py-3 text-sm text-right">
                      <span className="px-2 py-1 bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-400 text-xs font-medium rounded">
                        {invoice.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center border-t">
          <Button variant="ghost" size="sm">
            View All Invoices
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default BillingSettings;
