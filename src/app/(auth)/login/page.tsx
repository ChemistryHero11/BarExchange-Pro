'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";
import React, { useState } from 'react';

export default function LoginPage() {
  const { setUser } = useAuth(); // Using mock setUser
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    // Mock login logic
    // In a real app, this would call Firebase auth
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      if (email === "owner@example.com" && password === "password") {
        setUser({ uid: 'mock-owner-uid', email: 'owner@example.com', displayName: 'Bar Owner', role: 'owner', barId: 'bar123' });
        router.push('/dashboard');
      } else if (email === "admin@example.com" && password === "password") {
        setUser({ uid: 'mock-admin-uid', email: 'admin@example.com', displayName: 'Platform Admin', role: 'admin' });
        router.push('/admin');
      } else {
        setError("Invalid credentials. Try owner@example.com or admin@example.com with password 'password'.");
      }
    } catch (err) {
      setError("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-12 w-12 text-primary"><path d="M21 10V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h4M7.5 11.5L9 10l-1.5-1.5L9 7l1.5 1.5L9 10l1.5 1.5L9 13l-1.5-1.5ZM13 7h5m-5 3h5m-5 3h5m2-3v6m-3-3h3"/></svg>
          </div>
          <CardTitle className="text-3xl font-bold">Welcome Back!</CardTitle>
          <CardDescription>Enter your credentials to access BarExchange Pro</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="you@example.com" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                type="password" 
                placeholder="••••••••" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="text-center text-sm">
          <p className="text-muted-foreground">
            Don't have an account? Contact support.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
