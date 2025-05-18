
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Settings } from "lucide-react";

export default function BarSettingsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Settings className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold tracking-tight">Bar Settings</h1>
        </div>
        <Link href="/dashboard">
          <Button variant="outline">Back to Dashboard</Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Configure Your Bar</CardTitle>
          <CardDescription>
            Manage dynamic pricing parameters, bar details, staff access, and display settings.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed rounded-lg">
            <Settings className="h-16 w-16 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Bar configuration options will be displayed here.</p>
            <p className="text-sm text-muted-foreground">
              (Controls for pricing sensitivity, decay rates, opening hours, staff roles, display themes, etc.)
            </p>
            <Button className="mt-4">Save Settings (Placeholder)</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
