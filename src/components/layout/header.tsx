'use client';
import { SidebarTrigger } from "@/components/ui/sidebar";
import { UserNav } from "@/components/layout/user-nav";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

function getPageTitle(pathname: string): string {
  if (pathname.startsWith("/dashboard/pricing-ai")) return "AI Pricing Assistant";
  if (pathname.startsWith("/dashboard")) return "Owner Dashboard";
  if (pathname.startsWith("/admin")) return "Admin Panel";
  if (pathname.startsWith("/display")) return "Price Ticker Display";
  return "BarExchange Pro";
}

export function Header() {
  const pathname = usePathname();
  const title = getPageTitle(pathname);

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-md md:px-6">
      <div className="flex items-center md:hidden">
        <SidebarTrigger />
      </div>
      <div className="hidden md:block">
        {/* Optional: Could put breadcrumbs or page title here if not using SidebarTrigger space */}
      </div>
      <div className="flex-1">
        <h1 className="text-xl font-semibold text-foreground">{title}</h1>
      </div>
      <UserNav />
    </header>
  );
}
