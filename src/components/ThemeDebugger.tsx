// components/ThemeDebugger.tsx
'use client';
import { useTheme } from 'next-themes';

export default function ThemeDebugger() {
  const { theme, systemTheme, resolvedTheme } = useTheme();

  return (
    <div className="fixed bottom-4 right-4 bg-white dark:bg-slate-800 p-3 rounded-lg shadow-lg text-xs">
      <pre className="text-xs">
        {JSON.stringify(
          {
            theme,
            systemTheme,
            resolvedTheme,
            time: new Date().toLocaleTimeString(),
          },
          null,
          2,
        )}
      </pre>
    </div>
  );
}
