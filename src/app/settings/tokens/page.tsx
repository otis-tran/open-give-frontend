'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import {
  Copy,
  Check,
  Palette,
  Type,
  Square,
  Circle,
  Eye,
  EyeOff,
  Code2,
  Moon,
  Sun,
  Badge,
} from 'lucide-react';
import { Button } from '@/design-system/components/ui/Button/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/design-system/components/ui/Card/Card';

// Token data structures
const colorTokens = {
  blue: {
    50: { hex: '#eff6ff', rgb: '239 246 255', usage: 'Ultra light backgrounds' },
    100: { hex: '#dbeafe', rgb: '219 234 254', usage: 'Light surfaces' },
    200: { hex: '#bfdbfe', rgb: '191 219 254', usage: 'Soft accents' },
    300: { hex: '#93c5fd', rgb: '147 197 253', usage: 'Light interactive' },
    400: { hex: '#60a5fa', rgb: '96 165 250', usage: 'Medium interactive' },
    500: { hex: '#3b82f6', rgb: '59 130 246', usage: 'Base blue' },
    600: { hex: '#2563eb', rgb: '37 99 235', usage: 'Primary brand' },
    700: { hex: '#1d4ed8', rgb: '29 78 216', usage: 'Primary hover' },
    800: { hex: '#1e40af', rgb: '30 64 175', usage: 'Deep interactive' },
    900: { hex: '#1e3a8a', rgb: '30 58 138', usage: 'Darkest blue' },
    950: { hex: '#172554', rgb: '23 37 84', usage: 'Ultra deep' },
  },
  gray: {
    50: { hex: '#f9fafb', rgb: '249 250 251', usage: 'Light backgrounds' },
    100: { hex: '#f3f4f6', rgb: '243 244 246', usage: 'Subtle borders' },
    200: { hex: '#e5e7eb', rgb: '229 231 235', usage: 'Default borders' },
    300: { hex: '#d1d5db', rgb: '209 213 219', usage: 'Strong borders' },
    400: { hex: '#9ca3af', rgb: '156 163 175', usage: 'Tertiary text' },
    500: { hex: '#6b7280', rgb: '107 114 128', usage: 'Secondary text' },
    600: { hex: '#4b5563', rgb: '75 85 99', usage: 'Primary text (light)' },
    700: { hex: '#374151', rgb: '55 65 81', usage: 'Elevated surfaces (dark)' },
    800: { hex: '#1f2937', rgb: '31 41 55', usage: 'Secondary bg (dark)' },
    900: { hex: '#111827', rgb: '17 24 39', usage: 'Primary text (dark)' },
    950: { hex: '#030712', rgb: '3 7 18', usage: 'Primary bg (dark)' },
  },
};

const semanticTokens = {
  light: {
    background: {
      primary: { value: 'rgb(255 255 255)', usage: 'Main page background' },
      secondary: { value: 'rgb(249 250 251)', usage: 'Cards, panels' },
      tertiary: { value: 'rgb(239 246 255)', usage: 'Highlighted sections' },
      elevated: { value: 'rgb(255 255 255)', usage: 'Modals, dropdowns' },
    },
    text: {
      primary: { value: 'rgb(17 24 39)', usage: 'Headlines, body text' },
      secondary: { value: 'rgb(75 85 99)', usage: 'Descriptions' },
      tertiary: { value: 'rgb(107 114 128)', usage: 'Captions, labels' },
      link: { value: 'rgb(30 64 175)', usage: 'Interactive text' },
    },
    border: {
      subtle: { value: 'rgb(243 244 246)', usage: 'Light separators' },
      default: { value: 'rgb(229 231 235)', usage: 'Standard borders' },
      strong: { value: 'rgb(209 213 219)', usage: 'Emphasized borders' },
      interactive: { value: 'rgb(191 219 254)', usage: 'Focus states' },
    },
    surface: {
      primary: { value: 'rgb(37 99 235)', usage: 'CTA buttons' },
      primaryHover: { value: 'rgb(29 78 216)', usage: 'Button hover' },
      secondary: { value: 'rgb(96 165 250)', usage: 'Secondary buttons' },
      secondaryHover: { value: 'rgb(59 130 246)', usage: 'Secondary hover' },
    },
  },
  dark: {
    background: {
      primary: { value: 'rgb(3 7 18)', usage: 'Main page background' },
      secondary: { value: 'rgb(17 24 39)', usage: 'Cards, panels' },
      tertiary: { value: 'rgb(31 41 55)', usage: 'Highlighted sections' },
      elevated: { value: 'rgb(55 65 81)', usage: 'Modals, dropdowns' },
    },
    text: {
      primary: { value: 'rgb(249 250 251)', usage: 'Headlines, body text' },
      secondary: { value: 'rgb(209 213 219)', usage: 'Descriptions' },
      tertiary: { value: 'rgb(156 163 175)', usage: 'Captions, labels' },
      link: { value: 'rgb(191 219 254)', usage: 'Interactive text' },
    },
    border: {
      subtle: { value: 'rgb(55 65 81)', usage: 'Light separators' },
      default: { value: 'rgb(75 85 99)', usage: 'Standard borders' },
      strong: { value: 'rgb(107 114 128)', usage: 'Emphasized borders' },
      interactive: { value: 'rgb(147 197 253)', usage: 'Focus states' },
    },
    surface: {
      primary: { value: 'rgb(96 165 250)', usage: 'CTA buttons' },
      primaryHover: { value: 'rgb(59 130 246)', usage: 'Button hover' },
      secondary: { value: 'rgb(147 197 253)', usage: 'Secondary buttons' },
      secondaryHover: { value: 'rgb(191 219 254)', usage: 'Secondary hover' },
    },
  },
};

const statusColors = {
  success: {
    light: { hex: '#10b981', rgb: '16 185 129' },
    dark: { hex: '#34d399', rgb: '52 211 153' },
  },
  warning: {
    light: { hex: '#f59e0b', rgb: '245 158 11' },
    dark: { hex: '#fbbf24', rgb: '251 191 36' },
  },
  error: {
    light: { hex: '#ef4444', rgb: '239 68 68' },
    dark: { hex: '#f87171', rgb: '248 113 113' },
  },
};

const spacingTokens = {
  1: '0.25rem', // 4px
  2: '0.5rem', // 8px
  3: '0.75rem', // 12px
  4: '1rem', // 16px
  5: '1.25rem', // 20px
  6: '1.5rem', // 24px
  8: '2rem', // 32px
  10: '2.5rem', // 40px
  12: '3rem', // 48px
  16: '4rem', // 64px
  20: '5rem', // 80px
};

const typographyTokens = {
  fontSize: {
    xs: { size: '0.75rem', lineHeight: '1rem' },
    sm: { size: '0.875rem', lineHeight: '1.25rem' },
    base: { size: '1rem', lineHeight: '1.5rem' },
    lg: { size: '1.125rem', lineHeight: '1.75rem' },
    xl: { size: '1.25rem', lineHeight: '1.75rem' },
    '2xl': { size: '1.5rem', lineHeight: '2rem' },
    '3xl': { size: '1.875rem', lineHeight: '2.25rem' },
    '4xl': { size: '2.25rem', lineHeight: '2.5rem' },
  },
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
};

// Component for copying values
function CopyButton({ value, label }: { value: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleCopy}
      className="h-6 px-2 text-xs"
      title={`Copy ${label || 'value'}`}
    >
      {copied ? <Check className="h-3 w-3 text-emerald-600" /> : <Copy className="h-3 w-3" />}
    </Button>
  );
}

// Color swatch component
function ColorSwatch({
  color,
  name,
  showRgb = false,
  className,
}: {
  color: string;
  name: string;
  showRgb?: boolean;
  className?: string;
}) {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <div
        className="w-10 h-10 rounded-lg border border-gray-200 dark:border-gray-600 shadow-sm flex-shrink-0"
        style={{ backgroundColor: color }}
      />
      <div className="flex-1 min-w-0">
        <div className="font-medium text-sm">{name}</div>
        <div className="text-xs text-gray-500 dark:text-gray-400 font-mono">
          {showRgb ? color : color}
        </div>
      </div>
      <CopyButton value={color} label={name} />
    </div>
  );
}

export default function DesignTokensPage() {
  const [selectedSection, setSelectedSection] = useState('colors');
  const [showUsage, setShowUsage] = useState(true);
  const [viewMode, setViewMode] = useState<'visual' | 'code'>('visual');

  const sections = [
    { id: 'colors', name: 'Color Palette', icon: Palette },
    { id: 'semantic', name: 'Semantic Tokens', icon: Square },
    { id: 'typography', name: 'Typography', icon: Type },
    { id: 'spacing', name: 'Spacing', icon: Circle },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-50">Design Tokens</h1>
          <p className="mt-1 text-gray-600 dark:text-gray-300">
            Complete Ocean Blue System design tokens reference
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant={showUsage ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setShowUsage(!showUsage)}
            leftIcon={showUsage ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
          >
            Usage Info
          </Button>

          <div className="flex rounded-lg border border-gray-200 dark:border-gray-700 p-1">
            <Button
              variant={viewMode === 'visual' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('visual')}
              leftIcon={<Palette className="h-4 w-4" />}
            >
              Visual
            </Button>
            <Button
              variant={viewMode === 'code' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('code')}
              leftIcon={<Code2 className="h-4 w-4" />}
            >
              Code
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Navigation */}
        <div className="lg:col-span-1">
          <nav className="space-y-1">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setSelectedSection(section.id)}
                  className={cn(
                    'w-full flex items-center gap-3 px-3 py-2 text-left rounded-lg transition-colors',
                    selectedSection === section.id
                      ? 'bg-blue-600 text-white dark:bg-blue-400 dark:text-gray-900'
                      : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800',
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {section.name}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Color Palette */}
          {selectedSection === 'colors' && (
            <div className="space-y-6">
              {/* Blue Scale */}
              <Card>
                <CardHeader>
                  <CardTitle>Blue Scale - Primary Brand Colors</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Object.entries(colorTokens.blue).map(([shade, data]) => (
                      <div key={shade} className="space-y-2">
                        <ColorSwatch color={data.hex} name={`blue-${shade}`} />
                        {showUsage && (
                          <p className="text-xs text-gray-500 dark:text-gray-400 ml-13">
                            {data.usage}
                          </p>
                        )}
                        {viewMode === 'code' && (
                          <div className="ml-13 space-y-1">
                            <div className="text-xs font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                              <span className="text-gray-600 dark:text-gray-400">HEX:</span>{' '}
                              {data.hex}
                            </div>
                            <div className="text-xs font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                              <span className="text-gray-600 dark:text-gray-400">RGB:</span>{' '}
                              {data.rgb}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Gray Scale */}
              <Card>
                <CardHeader>
                  <CardTitle>Gray Scale - Neutral Colors</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Object.entries(colorTokens.gray).map(([shade, data]) => (
                      <div key={shade} className="space-y-2">
                        <ColorSwatch color={data.hex} name={`gray-${shade}`} />
                        {showUsage && (
                          <p className="text-xs text-gray-500 dark:text-gray-400 ml-13">
                            {data.usage}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Status Colors */}
              <Card>
                <CardHeader>
                  <CardTitle>Status Colors</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {Object.entries(statusColors).map(([status, colors]) => (
                      <div key={status} className="space-y-3">
                        <h4 className="font-medium capitalize text-gray-900 dark:text-gray-50">
                          {status}
                        </h4>
                        <div className="space-y-2">
                          <ColorSwatch color={colors.light.hex} name={`${status}-light`} />
                          <ColorSwatch color={colors.dark.hex} name={`${status}-dark`} />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Semantic Tokens */}
          {selectedSection === 'semantic' && (
            <div className="space-y-6">
              {['light', 'dark'].map((theme) => (
                <Card key={theme} variant={theme === 'dark' ? 'highlighted' : 'default'}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      {theme === 'dark' ? (
                        <Moon className="h-5 w-5" />
                      ) : (
                        <Sun className="h-5 w-5" />
                      )}
                      {theme.charAt(0).toUpperCase() + theme.slice(1)} Theme Tokens
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {Object.entries(semanticTokens[theme as keyof typeof semanticTokens]).map(
                      ([category, tokens]) => (
                        <div key={category} className="mb-6 last:mb-0">
                          <h4 className="font-medium mb-3 capitalize text-gray-900 dark:text-gray-50">
                            {category}
                          </h4>
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                            {Object.entries(tokens).map(([token, data]) => (
                              <div
                                key={token}
                                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                              >
                                <div className="flex items-center gap-3">
                                  <div
                                    className="w-6 h-6 rounded border border-gray-200 dark:border-gray-600"
                                    style={{
                                      backgroundColor: data.value
                                        .replace('rgb(', 'rgb(')
                                        .replace(')', ')'),
                                    }}
                                  />
                                  <div>
                                    <div className="font-mono text-sm">
                                      --{category}-{token}
                                    </div>
                                    {showUsage && (
                                      <div className="text-xs text-gray-500 dark:text-gray-400">
                                        {data.usage}
                                      </div>
                                    )}
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  {viewMode === 'code' && (
                                    <code className="text-xs bg-white dark:bg-gray-900 px-2 py-1 rounded border">
                                      {data.value}
                                    </code>
                                  )}
                                  <CopyButton value={data.value} />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ),
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Typography */}
          {selectedSection === 'typography' && (
            <div className="space-y-6">
              {/* Font Sizes */}
              <Card>
                <CardHeader>
                  <CardTitle>Font Size Scale</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(typographyTokens.fontSize).map(([size, data]) => (
                      <div
                        key={size}
                        className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
                      >
                        <div className="flex items-center gap-4">
                          <Badge fontVariant="outline">{size}</Badge>
                          <span
                            style={{ fontSize: data.size, lineHeight: data.lineHeight }}
                            className="font-medium"
                          >
                            The quick brown fox jumps
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="text-sm text-gray-500 dark:text-gray-400 font-mono">
                            {data.size} / {data.lineHeight}
                          </div>
                          <CopyButton value={`text-${size}`} />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Font Weights */}
              <Card>
                <CardHeader>
                  <CardTitle>Font Weight Scale</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(typographyTokens.fontWeight).map(([weight, value]) => (
                      <div
                        key={weight}
                        className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
                      >
                        <div className="flex items-center gap-4">
                          <Badge fontVariant="outline">{weight}</Badge>
                          <span style={{ fontWeight: value }} className="text-lg">
                            Typography Sample
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="text-sm text-gray-500 dark:text-gray-400 font-mono">
                            {value}
                          </div>
                          <CopyButton value={`font-${weight}`} />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Spacing */}
          {selectedSection === 'spacing' && (
            <Card>
              <CardHeader>
                <CardTitle>Spacing Scale</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(spacingTokens).map(([token, value]) => (
                    <div
                      key={token}
                      className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
                    >
                      <div className="flex items-center gap-4">
                        <Badge fontVariant="outline">space-{token}</Badge>
                        <div className="flex items-center gap-3">
                          <div
                            className="bg-blue-600 dark:bg-blue-400"
                            style={{ width: value, height: '1rem' }}
                          />
                          <span className="text-sm text-gray-600 dark:text-gray-300">
                            {value} ({parseInt(value) * 16}px)
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <code className="text-sm bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                          p-{token}
                        </code>
                        <CopyButton value={`p-${token}`} />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
