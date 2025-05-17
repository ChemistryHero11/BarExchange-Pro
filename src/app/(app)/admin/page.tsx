import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Building, Users, DollarSign, ShieldCheck } from "lucide-react";

export default function AdminDashboardPage() {
  const adminFeatures = [
    { name: "Manage Bars", description: "Oversee all registered bars and their details.", icon: Building, href: "/admin/bars", cta: "Manage Bars" },
    { name: "Manage Owners", description: "Assign owners to bars and manage user accounts.", icon: Users, href: "/admin/owners", cta: "Manage Owners" },
    { name: "Subscription Tiers", description: "Configure and manage subscription plans for bar owners.", icon: DollarSign, href: "/admin/subscriptions", cta: "Manage Subscriptions" },
  ];

  return (
    <div className="space-y-8">
      <div className="bg-card p-6 rounded-lg shadow-lg">
        <div className="flex items-center gap-3 mb-2">
          <ShieldCheck className="h-10 w-10 text-primary" />
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-card-foreground">Admin Panel</h1>
            <p className="text-muted-foreground">
              Platform administration and oversight.
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {adminFeatures.map((feature) => (
          <Card key={feature.name} className="flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <feature.icon className="h-8 w-8 text-primary" />
                <CardTitle className="text-xl">{feature.name}</CardTitle>
              </div>
              <CardDescription>{feature.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow" />
            <div className="p-6 pt-0">
              <Link href={feature.href} passHref>
                <Button className="w-full" variant="outline">
                  {feature.cta}
                </Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Platform Statistics</CardTitle>
          <CardDescription>Key metrics for BarExchange Pro.</CardDescription>
        </CardHeader>
        <CardContent className="grid md:grid-cols-3 gap-4">
          <div className="p-4 bg-secondary rounded-md">
            <h3 className="text-sm font-medium text-secondary-foreground">Total Bars</h3>
            <p className="text-2xl font-bold text-primary">12</p> {/* Placeholder */}
          </div>
          <div className="p-4 bg-secondary rounded-md">
            <h3 className="text-sm font-medium text-secondary-foreground">Active Owners</h3>
            <p className="text-2xl font-bold text-primary">10</p> {/* Placeholder */}
          </div>
          <div className="p-4 bg-secondary rounded-md">
            <h3 className="text-sm font-medium text-secondary-foreground">Subscriptions</h3>
            <p className="text-2xl font-bold text-primary">Gold: 5, Silver: 5</p> {/* Placeholder */}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
