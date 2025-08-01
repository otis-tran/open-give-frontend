import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', size = 'md', children, ...props }, ref) => {
    const sizeClasses = {
      sm: 'px-2 py-0.5 text-xs',
      md: 'px-3 py-1 text-sm',
      lg: 'px-4 py-1.5 text-base',
    };

    const variantClasses = {
      default: ['bg-gray-100 text-gray-800', 'dark:bg-gray-800 dark:text-gray-200'].join(' '),

      success: [
        'bg-emerald-100 text-emerald-800',
        'dark:bg-emerald-900 dark:text-emerald-200',
      ].join(' '),

      warning: ['bg-amber-100 text-amber-800', 'dark:bg-amber-900 dark:text-amber-200'].join(' '),

      error: ['bg-red-100 text-red-800', 'dark:bg-red-900 dark:text-red-200'].join(' '),

      info: ['bg-blue-100 text-blue-800', 'dark:bg-blue-900 dark:text-blue-200'].join(' '),

      outline: [
        'border border-gray-300 text-gray-700 bg-transparent',
        'dark:border-gray-600 dark:text-gray-300',
      ].join(' '),
    };

    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center rounded-full font-medium',
          sizeClasses[size],
          variantClasses[variant],
          className,
        )}
        {...props}
      >
        {children}
      </span>
    );
  },
);

Badge.displayName = 'Badge';
