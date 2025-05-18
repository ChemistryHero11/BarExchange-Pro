'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { Skeleton } from '@/components/ui/skeleton';

export default function HomePage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  // 🔑  Demo bypass flag baked by `.env.production`
  const bypass =
    process.env.NEXT_PUBLIC_ALLOW_PUBLIC_DASHBOARD === 'true';

  useEffect(() => {
    if (loading) return;               // wait for auth check

    /** ---------------------------------------------
     *  1)  No user AND no bypass  →  /login
     *  2)  Bypass active         →  /display
     *  3)  User present          →  role-based route
     * --------------------------------------------- */
    if (!user && !bypass) {
      router.replace('/login');
      return;
    }

    if (bypass && !user) {
      router.replace('/display');
      return;
    }

    // ── Authenticated user ─────────────────────────
    switch (user?.role) {
      case 'admin':
        router.replace('/admin');
        break;
      case 'owner':
        router.replace('/dashboard');
        break;
      case 'display':
        router.replace('/display');
        break;
      default:
        router.replace('/dashboard');
    }
  }, [user, loading, bypass, router]);

  /** Simple splash while redirecting */
  return (
    <div className="flex h-screen flex-col items-center justify-center space-y-4 bg-background p-8">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-16 w-16 animate-pulse text-primary"
      >
        <path d="M21 10V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h4M7.5 11.5L9 10l-1.5-1.5L9 7l1.5 1.5L9 10l1.5 1.5L9 13l-1.5-1.5ZM13 7h5m-5 3h5m-5 3h5m2-3v6m-3-3h3" />
      </svg>
      <h1 className="text-3xl font-bold text-foreground">BarExchange Pro</h1>
      <Skeleton className="h-4 w-48" />
      <p className="text-muted-foreground">Loading&nbsp;your&nbsp;experience…</p>
    </div>
  );
}
