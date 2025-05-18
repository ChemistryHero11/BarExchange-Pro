
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Users } from "lucide-react";

export default function ManageOwnersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Users className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold tracking-tight">Manage Owners</h1>
        </div>
        <Link href="/admin">
          <Button variant="outline">Back to Admin Overview</Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Owners Overview</CardTitle>
          <CardDescription>
            Manage bar owner accounts, assign them to bars, and oversee their platform access.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed rounded-lg">
            <Users className="h-16 w-16 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Owner management interface will be displayed here.</p>
            <p className="text-sm text-muted-foreground">
              (Functionality to list, invite, edit roles, and manage owner accounts)
            </p>
            <Button className="mt-4">Invite New Owner (Placeholder)</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
