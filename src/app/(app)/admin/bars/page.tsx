
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Building } from "lucide-react";

export default function ManageBarsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Building className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold tracking-tight">Manage Bars</h1>
        </div>
        <Link href="/admin">
          <Button variant="outline">Back to Admin Overview</Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Bars Overview</CardTitle>
          <CardDescription>
            View, add, edit, or remove bars from the platform. Assign owners and manage bar-specific settings.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed rounded-lg">
            <Building className="h-16 w-16 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Bars management interface will be displayed here.</p>
            <p className="text-sm text-muted-foreground">
              (Functionality to list, create, edit, and delete bars)
            </p>
            <Button className="mt-4">Add New Bar (Placeholder)</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
