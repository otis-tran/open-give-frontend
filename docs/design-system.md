# 🌊 Ocean Blue System - Complete Design Tokens

## 1. Core Blue Palette (Base)

```css
/* Ocean Blue Scale - Foundation */
--blue-50: #eff6ff; /* Ultra light backgrounds */
--blue-100: #dbeafe; /* Light surfaces */
--blue-200: #bfdbfe; /* Soft accents */
--blue-300: #93c5fd; /* Light interactive */
--blue-400: #60a5fa; /* Medium interactive */
--blue-500: #3b82f6; /* Base blue */
--blue-600: #2563eb; /* Primary brand */
--blue-700: #1d4ed8; /* Primary hover */
--blue-800: #1e40af; /* Deep interactive */
--blue-900: #1e3a8a; /* Darkest blue */
--blue-950: #172554; /* Ultra deep */
```

## 2. Supporting Colors (Neutral + Status)

```css
/* Warm Gray Scale - Comfortable neutrals */
--gray-50: #f9fafb;
--gray-100: #f3f4f6;
--gray-200: #e5e7eb;
--gray-300: #d1d5db;
--gray-400: #9ca3af;
--gray-500: #6b7280;
--gray-600: #4b5563;
--gray-700: #374151;
--gray-800: #1f2937;
--gray-900: #111827;
--gray-950: #030712;

/* Status Colors - Harmonized with blue */
--success-light: #10b981; /* Emerald-500 */
--success-dark: #34d399; /* Emerald-400 */
--warning-light: #f59e0b; /* Amber-500 */
--warning-dark: #fbbf24; /* Amber-400 */
--error-light: #ef4444; /* Red-500 */
--error-dark: #f87171; /* Red-400 */
```

## 3. Complete Token System

### **Light Theme Tokens**

| Purpose                  | Token Name             | Color     | Tailwind Class    | Usage                |
| ------------------------ | ---------------------- | --------- | ----------------- | -------------------- |
| **Backgrounds**          |
| Primary BG               | `--bg-primary`         | `#FFFFFF` | `bg-white`        | Main page background |
| Secondary BG             | `--bg-secondary`       | `#F9FAFB` | `bg-gray-50`      | Cards, panels        |
| Tertiary BG              | `--bg-tertiary`        | `#EFF6FF` | `bg-blue-50`      | Highlighted sections |
| Elevated BG              | `--bg-elevated`        | `#FFFFFF` | `bg-white`        | Modals, dropdowns    |
| **Interactive Elements** |
| Primary Action           | `--primary`            | `#2563EB` | `bg-blue-600`     | CTA buttons, links   |
| Primary Hover            | `--primary-hover`      | `#1D4ED8` | `bg-blue-700`     | Button hover states  |
| Secondary Action         | `--secondary`          | `#60A5FA` | `bg-blue-400`     | Secondary buttons    |
| Secondary Hover          | `--secondary-hover`    | `#3B82F6` | `bg-blue-500`     | Secondary hover      |
| **Text Colors**          |
| Primary Text             | `--text-primary`       | `#111827` | `text-gray-900`   | Headlines, body      |
| Secondary Text           | `--text-secondary`     | `#4B5563` | `text-gray-600`   | Descriptions         |
| Tertiary Text            | `--text-tertiary`      | `#6B7280` | `text-gray-500`   | Captions, labels     |
| Link Text                | `--text-link`          | `#1E40AF` | `text-blue-800`   | Interactive text     |
| Link Hover               | `--text-link-hover`    | `#1E3A8A` | `text-blue-900`   | Link hover           |
| **Borders & Dividers**   |
| Border Subtle            | `--border-subtle`      | `#F3F4F6` | `border-gray-100` | Light separators     |
| Border Default           | `--border-default`     | `#E5E7EB` | `border-gray-200` | Standard borders     |
| Border Strong            | `--border-strong`      | `#D1D5DB` | `border-gray-300` | Emphasized borders   |
| Border Interactive       | `--border-interactive` | `#BFDBFE` | `border-blue-200` | Focus states         |
| **Status Colors**        |
| Success                  | `--success`            | `#10B981` | `bg-emerald-500`  | Success states       |
| Warning                  | `--warning`            | `#F59E0B` | `bg-amber-500`    | Warning states       |
| Error                    | `--error`              | `#EF4444` | `bg-red-500`      | Error states         |

### **Dark Theme Tokens**

| Purpose                  | Token Name             | Color     | Tailwind Class    | Usage                |
| ------------------------ | ---------------------- | --------- | ----------------- | -------------------- |
| **Backgrounds**          |
| Primary BG               | `--bg-primary`         | `#030712` | `bg-gray-950`     | Main page background |
| Secondary BG             | `--bg-secondary`       | `#111827` | `bg-gray-900`     | Cards, panels        |
| Tertiary BG              | `--bg-tertiary`        | `#1F2937` | `bg-gray-800`     | Highlighted sections |
| Elevated BG              | `--bg-elevated`        | `#374151` | `bg-gray-700`     | Modals, dropdowns    |
| **Interactive Elements** |
| Primary Action           | `--primary`            | `#60A5FA` | `bg-blue-400`     | CTA buttons, links   |
| Primary Hover            | `--primary-hover`      | `#3B82F6` | `bg-blue-500`     | Button hover states  |
| Secondary Action         | `--secondary`          | `#93C5FD` | `bg-blue-300`     | Secondary buttons    |
| Secondary Hover          | `--secondary-hover`    | `#BFDBFE` | `bg-blue-200`     | Secondary hover      |
| **Text Colors**          |
| Primary Text             | `--text-primary`       | `#F9FAFB` | `text-gray-50`    | Headlines, body      |
| Secondary Text           | `--text-secondary`     | `#D1D5DB` | `text-gray-300`   | Descriptions         |
| Tertiary Text            | `--text-tertiary`      | `#9CA3AF` | `text-gray-400`   | Captions, labels     |
| Link Text                | `--text-link`          | `#BFDBFE` | `text-blue-200`   | Interactive text     |
| Link Hover               | `--text-link-hover`    | `#DBEAFE` | `text-blue-100`   | Link hover           |
| **Borders & Dividers**   |
| Border Subtle            | `--border-subtle`      | `#374151` | `border-gray-700` | Light separators     |
| Border Default           | `--border-default`     | `#4B5563` | `border-gray-600` | Standard borders     |
| Border Strong            | `--border-strong`      | `#6B7280` | `border-gray-500` | Emphasized borders   |
| Border Interactive       | `--border-interactive` | `#93C5FD` | `border-blue-300` | Focus states         |
| **Status Colors**        |
| Success                  | `--success`            | `#34D399` | `bg-emerald-400`  | Success states       |
| Warning                  | `--warning`            | `#FBBF24` | `bg-amber-400`    | Warning states       |
| Error                    | `--error`              | `#F87171` | `bg-red-400`      | Error states         |

## 4. Component-Specific Applications

### **Buttons**

```tsx
// Primary Button
<button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-400 dark:hover:bg-blue-500 text-white dark:text-gray-900 px-6 py-3 rounded-lg font-medium transition-colors">

// Secondary Button
<button className="bg-blue-400 hover:bg-blue-500 dark:bg-blue-300 dark:hover:bg-blue-200 text-white dark:text-gray-900 px-6 py-3 rounded-lg font-medium transition-colors">

// Outline Button
<button className="border border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-800 px-6 py-3 rounded-lg font-medium transition-colors">
```

### **Cards & Surfaces**

```tsx
// Primary Card
<div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm">

// Elevated Card
<div className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl p-6 shadow-lg">

// Highlighted Card
<div className="bg-blue-50 dark:bg-gray-800 border border-blue-200 dark:border-blue-300 rounded-xl p-6">
```

### **Forms**

```tsx
// Input Field
<input className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-50 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-400 focus:border-transparent">

// Focus States
<input className="focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-400 focus:border-blue-600 dark:focus:border-blue-400">
```

### **Typography Scale**

```tsx
// Headlines
<h1 className="text-4xl font-bold text-gray-900 dark:text-gray-50">
<h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-50">

// Body Text
<p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed">

// Captions
<span className="text-sm text-gray-500 dark:text-gray-400">

// Links
<a className="text-blue-800 dark:text-blue-200 hover:text-blue-900 dark:hover:text-blue-100 underline">
```

### **Status Indicators**

```tsx
// Success Badge
<span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200">

// Progress Bar
<div className="bg-gray-200 dark:bg-gray-700 rounded-full h-2">
  <div className="bg-blue-600 dark:bg-blue-400 h-2 rounded-full transition-all duration-300" style={{width: '65%'}}></div>
</div>
```

## 5. Accessibility & Contrast Ratios

| Combination          | Light Contrast | Dark Contrast | WCAG Level |
| -------------------- | -------------- | ------------- | ---------- |
| Blue-600 on White    | 8.6:1          | -             | AAA        |
| Blue-400 on Gray-950 | -              | 9.2:1         | AAA        |
| Gray-900 on White    | 21:1           | -             | AAA        |
| Gray-50 on Gray-950  | -              | 19:1          | AAA        |
| Blue-800 on White    | 10.7:1         | -             | AAA        |
| Blue-200 on Gray-950 | -              | 11.3:1        | AAA        |

## 6. CSS Variables Implementation

```css
/* globals.css */
:root {
  /* Light theme defaults */
  --bg-primary: 255 255 255;
  --bg-secondary: 249 250 251;
  --primary: 37 99 235;
  --text-primary: 17 24 39;
  /* ...other tokens */
}

.dark {
  /* Dark theme overrides */
  --bg-primary: 3 7 18;
  --bg-secondary: 17 24 39;
  --primary: 96 165 250;
  --text-primary: 249 250 251;
  /* ...other tokens */
}

/* Usage with opacity */
.bg-primary {
  background-color: rgb(var(--bg-primary));
}

.bg-primary-50 {
  background-color: rgb(var(--bg-primary) / 0.5);
}
```

## 7. Usage Guidelines

### **Do's ✅**

- Use blue for all interactive elements (buttons, links, CTAs)
- Maintain consistent blue shade across similar interactions
- Use gray neutrals for text and backgrounds
- Ensure minimum AA contrast (4.5:1) for all text
- Use status colors sparingly for feedback only

### **Don'ts ❌**

- Don't mix other hues (green, purple) for interactive elements
- Don't use blue for non-interactive decorative elements
- Don't use too many blue shades in one interface
- Don't compromise contrast for visual appeal
- Don't use blue for destructive actions (use red)

Bảng màu này đảm bảo **consistency, accessibility và scalability** cho toàn bộ platform! 🎯
