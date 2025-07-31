'use client';
import { useTheme } from 'next-themes';
import { useEffect, useState, useMemo, useCallback } from 'react';

type ThemeValue = 'light' | 'dark' | 'system';

type ThemeOption = {
  id: ThemeValue;
  name: string;
  description: string;
  activeDescription: string;
};

const SKELETON_ITEMS = [1, 2, 3];

export default function ThemeSelector() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const safeSystemTheme = systemTheme || 'light'; // Fallback safety

  const themeOptions = useMemo<ThemeOption[]>(
    () => [
      {
        id: 'light',
        name: 'Light',
        description: 'Bright color scheme',
        activeDescription: 'Currently using light mode',
      },
      {
        id: 'dark',
        name: 'Dark',
        description: 'Low-light color scheme',
        activeDescription: 'Currently using dark mode',
      },
      {
        id: 'system',
        name: 'System',
        description: 'Sync with OS settings',
        activeDescription: `Following ${safeSystemTheme} mode`,
      },
    ],
    [safeSystemTheme],
  ); // ✅ Only rebuild when systemTheme changes

  const handleThemeChange = useCallback(
    (selectedTheme: ThemeValue) => {
      setTheme(selectedTheme);
      // 💡 Can add analytics tracking here
    },
    [setTheme],
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 animate-pulse">
        {SKELETON_ITEMS.map((i) => (
          <div
            key={i}
            className="h-24 rounded-xl bg-slate-100/50 dark:bg-slate-800/30"
            aria-hidden="true"
          />
        ))}
      </div>
    );
  }

  const getCardClassName = (isActive: boolean) =>
    `relative overflow-hidden p-5 rounded-xl border transition-all duration-300 flex flex-col items-start ${
      isActive
        ? 'border-blue-500/30 bg-blue-50/50 dark:bg-blue-900/10 shadow-lg shadow-blue-100 dark:shadow-blue-900/20'
        : 'border-slate-200/80 hover:border-slate-300/60 dark:border-slate-700/80 dark:hover:border-slate-600/70'
    }`;

  return (
    <div
      className="grid grid-cols-1 md:grid-cols-3 gap-3"
      role="radiogroup"
      aria-label="Select display theme"
    >
      {themeOptions.map((option) => {
        const isActive = theme === option.id;

        return (
          <button
            key={option.id}
            onClick={() => handleThemeChange(option.id)}
            className={getCardClassName(isActive)}
            role="radio"
            aria-checked={isActive}
            aria-describedby={`${option.id}-desc`}
          >
            {/* Active indicator */}
            {isActive && (
              <>
                <div className="absolute inset-0 bg-gradient-to-b from-blue-400/5 to-transparent" />
                <div className="absolute top-3 right-3 w-2.5 h-2.5 rounded-full bg-blue-500 animate-ping-once" />
              </>
            )}

            <div className="flex items-center gap-3 mb-3">
              <span
                className={`font-medium ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-300'}`}
              >
                {option.name}
              </span>
            </div>

            <div
              id={`${option.id}-desc`}
              className={`text-sm text-left ${isActive ? 'text-blue-800/80 dark:text-blue-200' : 'text-slate-500 dark:text-slate-400'}`}
            >
              {isActive ? option.activeDescription : option.description}
            </div>
          </button>
        );
      })}
    </div>
  );
}
