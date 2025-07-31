'use client';
import { ThemeProvider as NextThemes } from 'next-themes';
import type { ThemeProviderProps as NextThemeProviderProps } from 'next-themes';
import { useEffect, useState } from 'react';

interface ThemeProviderProps extends NextThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div suppressHydrationWarning>{children}</div>;
  }

  return (
    <NextThemes
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      {...props}
    >
      {children}
    </NextThemes>
  );
}
