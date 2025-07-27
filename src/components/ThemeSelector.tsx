'use client';

import { Theme } from '@/types/theme';
import { useTheme } from 'next-themes';

export default function ThemeSelector() {
  const { theme, setTheme } = useTheme();

  return (
    <label className="flex items-center gap-2">
      Theme&nbsp;
      <select
        value={theme}
        onChange={(e) => setTheme(e.target.value as Theme)}
        className="border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-transparent"
      >
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </label>
  );
}
