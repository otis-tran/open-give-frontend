'use client';

import { useAuthContext } from '@/context/AuthProvider';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ProtectedRoute({
  children,
  redirectPath = '/auth/login',
}: {
  children: React.ReactNode;
  redirectPath?: string;
}) {
  const { isAuthenticated, loading, user } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push(redirectPath);
    }
  }, [isAuthenticated, loading, redirectPath, router]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return isAuthenticated && user ? <>{children}</> : null;
}
