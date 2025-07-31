'use client';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import ThemeSelector from '@/components/ThemeSelector';

export default function GeneralSettingsPage() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Determine if current resolved theme is dark
  const isDark = resolvedTheme === 'dark';

  if (!mounted) {
    return (
      <div className="max-w-xl mx-auto py-10 px-4">
        <div className="animate-pulse">
          <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded mb-8"></div>
          <div className="h-96 bg-slate-200 dark:bg-slate-700 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto py-10 px-4">
      <h1 className={`text-2xl font-bold mb-8 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
        General Settings
      </h1>

      <section
        className={`p-6 rounded-xl shadow-sm border ${
          isDark ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200'
        }`}
      >
        <div className="mb-6">
          <h2
            className={`text-lg font-semibold mb-1 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}
          >
            Appearance
          </h2>
          <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            Customize how our app appears on your device
          </p>
        </div>

        <ThemeSelector />

        <div className={`mt-6 pt-6 border-t ${isDark ? 'border-slate-700' : 'border-slate-200'}`}>
          <h3
            className={`text-sm font-medium mb-3 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}
          >
            Theme Preview
          </h3>
          <div className="flex gap-4">
            <div
              className={`flex-1 p-4 rounded-lg border ${
                isDark ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div
                className={`h-8 mb-2 rounded transition-colors ${
                  isDark ? 'bg-cyan-500' : 'bg-blue-600'
                }`}
              ></div>
              <div className="space-y-2">
                <div
                  className={`h-4 rounded transition-colors ${
                    isDark ? 'bg-slate-600' : 'bg-slate-300'
                  }`}
                ></div>
                <div
                  className={`h-4 rounded w-3/4 transition-colors ${
                    isDark ? 'bg-slate-600' : 'bg-slate-300'
                  }`}
                ></div>
              </div>
            </div>

            <div
              className={`flex-1 p-4 rounded-lg border ${
                isDark ? 'bg-slate-900 border-slate-600' : 'bg-white border-slate-300'
              }`}
            >
              <div
                className={`h-8 mb-2 rounded transition-colors ${
                  isDark ? 'bg-cyan-500' : 'bg-blue-600'
                }`}
              ></div>
              <div className="space-y-2">
                <div
                  className={`h-4 rounded transition-colors ${
                    isDark ? 'bg-slate-700' : 'bg-slate-200'
                  }`}
                ></div>
                <div
                  className={`h-4 rounded w-3/4 transition-colors ${
                    isDark ? 'bg-slate-700' : 'bg-slate-200'
                  }`}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
