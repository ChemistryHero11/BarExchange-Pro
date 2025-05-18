
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MenuSquare } from "lucide-react";

export default function MenuManagementPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <MenuSquare className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold tracking-tight">Menu Management</h1>
        </div>
        <Link href="/dashboard">
          <Button variant="outline">Back to Dashboard</Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Drink Menu</CardTitle>
          <CardDescription>
            Add, edit, categorize, and manage all drinks offered at your bar. Set base prices and descriptions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed rounded-lg">
            <MenuSquare className="h-16 w-16 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Menu management interface will be displayed here.</p>
            <p className="text-sm text-muted-foreground">
              (Functionality to list, add, edit, and remove drinks, manage categories)
            </p>
            <Button className="mt-4">Add New Drink (Placeholder)</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
