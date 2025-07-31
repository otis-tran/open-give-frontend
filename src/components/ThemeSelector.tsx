'use client';
import { useTheme } from 'next-themes';
import { useEffect, useState, useCallback } from 'react';

export type ThemeValue = 'light' | 'dark' | 'system';

type ThemeOption = {
  id: ThemeValue;
  name: string;
  description: string;
};

const themeOptions: ThemeOption[] = [
  {
    id: 'light',
    name: 'Light',
    description: 'For bright environments',
  },
  {
    id: 'dark',
    name: 'Dark',
    description: 'For low-light conditions',
  },
  {
    id: 'system',
    name: 'System',
    description: 'Sync with OS settings',
  },
];

export default function ThemeSelector() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, systemTheme, resolvedTheme } = useTheme();

  const getActiveState = useCallback(
    (optionId: ThemeValue): boolean => {
      if (optionId === 'system') return theme === 'system';
      return theme === optionId || (theme === 'system' && resolvedTheme === optionId);
    },
    [theme, resolvedTheme],
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Skeleton loader cải tiến
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {themeOptions.map((option) => (
          <div
            key={option.id}
            className="h-28 p-4 rounded-lg bg-slate-100/50 dark:bg-slate-800/30 animate-pulse"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {themeOptions.map((option) => {
        const isActive = getActiveState(option.id);
        const isSystem = option.id === 'system';
        const currentSystemTheme = isSystem ? `(${systemTheme})` : '';

        return (
          <button
            key={option.id}
            onClick={() => setTheme(option.id)}
            className={`text-left p-4 rounded-lg border-2 transition-all
              ${
                isActive
                  ? 'border-blue-500/80 dark:border-cyan-500 bg-blue-50/50 dark:bg-cyan-900/20'
                  : 'border-slate-200/80 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
              }`}
          >
            <div className="space-y-1">
              <div
                className={`font-medium flex items-center gap-2 ${
                  isActive
                    ? 'text-blue-600 dark:text-cyan-400'
                    : 'text-slate-700 dark:text-slate-300'
                }`}
              >
                {option.name}
                {isSystem && isActive && (
                  <span className="text-xs px-2 py-1 rounded-full bg-blue-100/50 dark:bg-cyan-900/30">
                    {systemTheme}
                  </span>
                )}
              </div>

              <div
                className={`text-sm ${
                  isActive
                    ? 'text-slate-600 dark:text-slate-300'
                    : 'text-slate-500 dark:text-slate-400'
                }`}
              >
                {isSystem && isActive ? `Using ${systemTheme} mode from OS` : option.description}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
