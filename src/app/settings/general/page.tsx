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
          <div className={`h-8 rounded mb-8 ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}></div>
          <div className={`h-96 rounded ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto py-10 px-4">
      <h1 className={`text-2xl font-bold mb-8 ${isDark ? 'text-gray-50' : 'text-gray-900'}`}>
        General Settings
      </h1>

      <section
        className={`p-6 rounded-xl shadow-sm border ${
          isDark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'
        }`}
      >
        <div className="mb-6">
          <h2 className={`text-lg font-semibold mb-1 ${isDark ? 'text-gray-50' : 'text-gray-900'}`}>
            Appearance
          </h2>
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Customize how our app appears on your device
          </p>
        </div>

        <ThemeSelector />

        <div className={`mt-6 pt-6 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
          <h3 className={`text-sm font-medium mb-3 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Theme Preview
          </h3>
          <div className="flex gap-4">
            <div
              className={`flex-1 p-4 rounded-lg border ${
                isDark ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'
              }`}
            >
              <div
                className={`h-8 mb-2 rounded transition-colors ${
                  isDark ? 'bg-blue-400' : 'bg-blue-600'
                }`}
              ></div>
              <div className="space-y-2">
                <div
                  className={`h-4 rounded transition-colors ${
                    isDark ? 'bg-gray-600' : 'bg-gray-300'
                  }`}
                ></div>
                <div
                  className={`h-4 rounded w-3/4 transition-colors ${
                    isDark ? 'bg-gray-600' : 'bg-gray-300'
                  }`}
                ></div>
              </div>
            </div>

            <div
              className={`flex-1 p-4 rounded-lg border ${
                isDark ? 'bg-gray-900 border-gray-600' : 'bg-white border-gray-300'
              }`}
            >
              <div
                className={`h-8 mb-2 rounded transition-colors ${
                  isDark ? 'bg-blue-300' : 'bg-blue-400'
                }`}
              ></div>
              <div className="space-y-2">
                <div
                  className={`h-4 rounded transition-colors ${
                    isDark ? 'bg-gray-700' : 'bg-gray-200'
                  }`}
                ></div>
                <div
                  className={`h-4 rounded w-3/4 transition-colors ${
                    isDark ? 'bg-gray-700' : 'bg-gray-200'
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
