'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Settings, Palette, Component, Layers, Moon, Sun, Monitor } from 'lucide-react';

const navigation = [
  {
    name: 'General',
    href: '/settings/general',
    icon: Settings,
    description: 'Basic settings and preferences',
  },
  {
    name: 'Appearance',
    href: '/settings/appearance',
    icon: Palette,
    description: 'Theme and visual customization',
  },
  {
    name: 'Components',
    href: '/settings/components',
    icon: Component,
    description: 'UI component demonstrations',
  },
  {
    name: 'Design Tokens',
    href: '/settings/tokens',
    icon: Layers,
    description: 'Color system and design tokens',
  },
];

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50">Settings</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Manage your preferences and explore the Ocean Blue Design System
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Sidebar Navigation */}
          <aside className="lg:col-span-1">
            <nav className="space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      'group flex items-start gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-all duration-200',
                      isActive
                        ? 'bg-blue-600 text-white shadow-md dark:bg-blue-400 dark:text-gray-900'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-gray-100',
                    )}
                  >
                    <Icon
                      className={cn(
                        'h-5 w-5 flex-shrink-0 transition-colors',
                        isActive
                          ? 'text-white dark:text-gray-900'
                          : 'text-gray-400 group-hover:text-gray-600 dark:text-gray-500 dark:group-hover:text-gray-300',
                      )}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium">{item.name}</div>
                      <div
                        className={cn(
                          'text-xs mt-0.5',
                          isActive
                            ? 'text-blue-100 dark:text-gray-700'
                            : 'text-gray-500 dark:text-gray-400',
                        )}
                      >
                        {item.description}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </nav>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-4">
            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
