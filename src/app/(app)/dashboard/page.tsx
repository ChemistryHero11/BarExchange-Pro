import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MenuSquare, BrainCircuit, BarChart3, Settings, ListChecks } from "lucide-react";

export default function DashboardPage() {
  const features = [
    { name: "Menu Management", description: "Add, edit, and organize your drink menu.", icon: MenuSquare, href: "/dashboard/menu", cta: "Manage Menu" },
    { name: "AI Pricing Tool", description: "Get AI-powered suggestions for optimal drink prices.", icon: BrainCircuit, href: "/dashboard/pricing-ai", cta: "Optimize Prices" },
    { name: "Sales Analytics", description: "View reports and insights on your bar's performance.", icon: BarChart3, href: "/dashboard/analytics", cta: "View Analytics" },
    { name: "Bar Settings", description: "Configure dynamic pricing rules and bar details.", icon: Settings, href: "/dashboard/settings", cta: "Configure Settings" },
  ];

  return (
    <div className="space-y-8">
      <div className="bg-card p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold tracking-tight text-card-foreground">Welcome to your Dashboard!</h1>
        <p className="text-muted-foreground mt-2">
          Manage your bar's menu, pricing, and performance all in one place.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
        {features.map((feature) => (
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
                <Button className="w-full" variant="default">
                  {feature.cta}
                </Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>
      
      {/* Placeholder for quick stats or recent activity */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Quick Overview</CardTitle>
          <CardDescription>At a glance summary of your bar's status.</CardDescription>
        </CardHeader>
        <CardContent className="grid md:grid-cols-3 gap-4">
          <div className="p-4 bg-secondary rounded-md">
            <h3 className="text-sm font-medium text-secondary-foreground">Total Drinks</h3>
            <p className="text-2xl font-bold text-primary">42</p> {/* Placeholder */}
          </div>
          <div className="p-4 bg-secondary rounded-md">
            <h3 className="text-sm font-medium text-secondary-foreground">Price Updates Today</h3>
            <p className="text-2xl font-bold text-primary">15</p> {/* Placeholder */}
          </div>
          <div className="p-4 bg-secondary rounded-md">
            <h3 className="text-sm font-medium text-secondary-foreground">Avg. Price Change</h3>
            <p className="text-2xl font-bold text-primary">+ $0.25</p> {/* Placeholder */}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
