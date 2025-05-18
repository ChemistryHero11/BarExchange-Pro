
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { DollarSign } from "lucide-react";

export default function ManageSubscriptionsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <DollarSign className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold tracking-tight">Manage Subscriptions</h1>
        </div>
        <Link href="/admin">
          <Button variant="outline">Back to Admin Overview</Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Subscription Tiers Overview</CardTitle>
          <CardDescription>
            Configure subscription plans, features, and pricing for bar owners.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed rounded-lg">
            <DollarSign className="h-16 w-16 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Subscription management interface will be displayed here.</p>
            <p className="text-sm text-muted-foreground">
              (Functionality to create, edit, and manage subscription tiers and features)
            </p>
            <Button className="mt-4">Create New Tier (Placeholder)</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
