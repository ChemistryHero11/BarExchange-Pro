
'use client';
import React, { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/auth-context';
import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarFooter, SidebarInset, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import { Header } from '@/components/layout/header';
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, BarChart3, Settings, ShieldCheck, Tv, BrainCircuit, LogOut, Users, Building, DollarSign, MenuSquare
} from 'lucide-react';

// Logo component
const Logo = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-primary">
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
    <line x1="12" y1="22" x2="12" y2="12"></line>
    <line x1="2" y1="7" x2="2" y2="17"></line>
    <line x1="22" y1="7" x2="22" y2="17"></line>
    <line x1="17" y1="4.5" x2="7" y2="9.5"></line>
  </svg>
);


export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { user, loading, setUser } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/login');
    }
  }, [user, loading, router]);

  const handleMockLogout = () => {
    setUser(null);
    router.push('/login');
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center space-y-4">
          <Logo />
          <h1 className="text-2xl font-semibold">Loading BarExchange Pro</h1>
          <Skeleton className="h-4 w-64" />
        </div>
      </div>
    );
  }

  if (!user && pathname !== '/login') { 
    // If not loading, no user, and not on login page, redirect.
    // This helps if user context is somehow lost while on an authenticated page.
    return (
      <div className="flex h-screen items-center justify-center bg-background text-foreground">
        Redirecting to login...
      </div>
    );
  }
  
  // If the current page is the display page, render it full-screen without layout
  if (pathname === '/display') {
    return <>{children}</>;
  }

  // If no user is loaded yet (and it's not the display page which handles its own auth implicitly)
  // but we are not in the initial loading phase, this is an odd state, perhaps show a minimal error or redirect.
  // However, the useEffect above should handle redirection if !user.
  // This block is primarily to ensure user object is available for role checks below.
  if (!user) {
      return (
        <div className="flex h-screen items-center justify-center bg-background text-foreground">
          Authenticating... If this persists, please try logging in again.
        </div>
      );
  }

  const ownerNavItems = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/dashboard/menu', label: 'Menu Items', icon: MenuSquare },
    { href: '/dashboard/pricing-ai', label: 'AI Pricing', icon: BrainCircuit },
    { href: '/dashboard/analytics', label: 'Analytics', icon: BarChart3 },
    { href: '/dashboard/settings', label: 'Bar Settings', icon: Settings },
  ];

  const adminNavItems = [
    { href: '/admin', label: 'Admin Overview', icon: ShieldCheck },
    { href: '/admin/bars', label: 'Manage Bars', icon: Building },
    { href: '/admin/owners', label: 'Manage Owners', icon: Users },
    { href: '/admin/subscriptions', label: 'Subscriptions', icon: DollarSign },
  ];
  
  // displayNavItems are not used here anymore if /display bypasses this layout.
  // Keeping for structural reference or if display users could access other restricted pages.
  const displaySpecificNavItemsIfAny = [ 
     { href: '/display', label: 'Live Prices', icon: Tv },
  ];


  let navItems: { href: string; label: string; icon: React.ElementType }[] = [];
  let appName = "BarExchange Pro";
  let homePath = "/dashboard"; 

  if (user.role === 'owner') {
    navItems = ownerNavItems;
    appName = "Owner Dashboard";
    homePath = "/dashboard";
  } else if (user.role === 'admin') {
    navItems = adminNavItems;
    appName = "Admin Panel";
    homePath = "/admin";
  } else if (user.role === 'display') {
    // Display role users are typically just for /display page which bypasses this main layout.
    // If they could access other (hypothetical) restricted pages, this would apply.
    navItems = displaySpecificNavItemsIfAny;
    appName = "Price Display Controls"; // Or similar, if there were settings.
    homePath = "/display"; // Though they'd be redirected to /display which has no sidebar.
  }
  // Add 'staff' role later if needed

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="p-4 border-b border-sidebar-border">
          <Link href={homePath} className="flex items-center gap-3">
            <Logo />
            <div className="flex flex-col">
              <h1 className="text-lg font-semibold text-sidebar-foreground">BarExchange</h1>
              <span className="text-xs text-sidebar-foreground/70 -mt-1">{appName}</span>
            </div>
          </Link>
        </SidebarHeader>
        <SidebarContent className="p-2">
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <Link href={item.href} legacyBehavior passHref>
                  <SidebarMenuButton isActive={pathname === item.href || (item.href !== homePath && pathname.startsWith(item.href))} tooltip={item.label}>
                    <item.icon className="h-5 w-5" />
                    <span className="truncate">{item.label}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="p-2 border-t border-sidebar-border">
          <SidebarMenuButton onClick={handleMockLogout} variant="ghost" className="w-full justify-start text-sidebar-foreground/80 hover:text-destructive hover:bg-destructive/10">
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </SidebarMenuButton>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <Header />
        <main className="flex-1 p-4 md:p-6 lg:p-8 bg-background text-foreground overflow-auto">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
