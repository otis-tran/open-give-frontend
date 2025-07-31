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
  const { theme, setTheme, systemTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const safeSystemTheme = systemTheme || 'light';
  const isDark = resolvedTheme === 'dark';

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
  );

  const handleThemeChange = useCallback(
    (selectedTheme: ThemeValue) => {
      setTheme(selectedTheme);
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
            className={`h-24 rounded-xl ${isDark ? 'bg-gray-800/30' : 'bg-gray-100/50'}`}
            aria-hidden="true"
          />
        ))}
      </div>
    );
  }

  const getCardClassName = (isActive: boolean) =>
    `relative overflow-hidden p-5 rounded-xl border transition-all duration-300 flex flex-col items-start ${
      isActive
        ? isDark
          ? 'border-blue-300 bg-blue-900/10 shadow-lg shadow-blue-900/20'
          : 'border-blue-200 bg-blue-50 shadow-lg shadow-blue-100'
        : isDark
          ? 'border-gray-700 hover:border-gray-600'
          : 'border-gray-200 hover:border-gray-300'
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
            {isActive && (
              <>
                <div
                  className={`absolute inset-0 bg-gradient-to-b to-transparent ${
                    isDark ? 'from-blue-400/5' : 'from-blue-400/5'
                  }`}
                />
                <div
                  className={`absolute top-3 right-3 w-2.5 h-2.5 rounded-full animate-ping-once ${
                    isDark ? 'bg-blue-400' : 'bg-blue-600'
                  }`}
                />
              </>
            )}

            <div className="flex items-center gap-3 mb-3">
              <span
                className={`font-medium ${
                  isActive
                    ? isDark
                      ? 'text-blue-200'
                      : 'text-blue-800'
                    : isDark
                      ? 'text-gray-300'
                      : 'text-gray-600'
                }`}
              >
                {option.name}
              </span>
            </div>

            <div
              id={`${option.id}-desc`}
              className={`text-sm text-left ${
                isActive
                  ? isDark
                    ? 'text-blue-200'
                    : 'text-blue-800'
                  : isDark
                    ? 'text-gray-400'
                    : 'text-gray-500'
              }`}
            >
              {isActive ? option.activeDescription : option.description}
            </div>
          </button>
        );
      })}
    </div>
  );
}
