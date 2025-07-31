'use client';

import { ThemeProvider as NextThemes } from 'next-themes';
import { AuthProvider } from '@/context/AuthProvider';
import { ReactNode } from 'react';

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <NextThemes attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <AuthProvider>{children}</AuthProvider>
    </NextThemes>
  );
}
