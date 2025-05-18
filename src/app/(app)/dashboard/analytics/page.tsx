
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BarChart3 } from "lucide-react";

export default function SalesAnalyticsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <BarChart3 className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold tracking-tight">Sales Analytics</h1>
        </div>
        <Link href="/dashboard">
          <Button variant="outline">Back to Dashboard</Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Performance Insights</CardTitle>
          <CardDescription>
            Track sales, revenue, popular drinks, and pricing effectiveness over time.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed rounded-lg">
            <BarChart3 className="h-16 w-16 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Sales analytics and reports will be displayed here.</p>
            <p className="text-sm text-muted-foreground">
              (Charts for sales trends, top drinks, revenue, price change impact, etc.)
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
