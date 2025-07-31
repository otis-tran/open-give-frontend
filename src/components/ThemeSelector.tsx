// components/ThemeSelector.tsx
'use client';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export type Theme = 'light' | 'dark' | 'system';

type ThemeOption = {
  id: Theme;
  name: string;
  description: string;
};

const themeOptions: ThemeOption[] = [
  {
    id: 'light',
    name: 'Light',
    description: 'Bright color scheme',
  },
  {
    id: 'dark',
    name: 'Dark',
    description: 'Low-light color scheme',
  },
  {
    id: 'system',
    name: 'System',
    description: 'Follows your OS settings',
  },
];

export default function ThemeSelector() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // Effect chỉ chạy trên client, tránh hydration mismatch
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className="flex gap-4">
        {themeOptions.map((option) => (
          <div
            key={option.id}
            className="flex-1 p-4 rounded-lg bg-slate-200/30 dark:bg-slate-700/30 animate-pulse"
          >
            <div className="h-6 bg-slate-300 dark:bg-slate-600 rounded w-1/2 mb-2"></div>
            <div className="h-4 bg-slate-300/70 dark:bg-slate-600/70 rounded w-3/4"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {themeOptions.map((option) => (
        <button
          key={option.id}
          onClick={() => setTheme(option.id)}
          className={`text-left p-4 rounded-lg border-2 transition-all duration-200 ${
            theme === option.id
              ? 'border-blue-500 dark:border-cyan-500 bg-blue-50/50 dark:bg-cyan-900/20'
              : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
          }`}
        >
          <div
            className={`font-medium mb-1 ${
              theme === option.id
                ? 'text-blue-600 dark:text-cyan-400'
                : 'text-slate-700 dark:text-slate-300'
            }`}
          >
            {option.name}
          </div>
          <div className="text-sm text-slate-500 dark:text-slate-400">{option.description}</div>
        </button>
      ))}
    </div>
  );
}
