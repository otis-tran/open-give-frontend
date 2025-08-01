import { forwardRef } from 'react';
import { cn } from '@/lib/utils'; // Cần tạo utility function

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      disabled,
      children,
      ...props
    },
    ref,
  ) => {
    const baseClasses = [
      // Base styles
      'inline-flex items-center justify-center font-medium rounded-lg',
      'transition-all duration-200 ease-in-out',
      'focus:outline-none focus:ring-2 focus:ring-offset-2',
      'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',

      // Loading state
      isLoading && 'cursor-wait',
    ];

    // Size variants
    const sizeClasses = {
      sm: 'px-3 py-1.5 text-sm h-8 gap-1.5',
      md: 'px-4 py-2 text-sm h-9 gap-2',
      lg: 'px-6 py-2.5 text-base h-11 gap-2',
      xl: 'px-8 py-3 text-lg h-12 gap-3',
    };

    // Variant styles
    const variantClasses = {
      primary: [
        'bg-blue-600 text-white shadow-sm',
        'hover:bg-blue-700 hover:shadow-md',
        'focus:ring-blue-600',
        'dark:bg-blue-400 dark:text-gray-900',
        'dark:hover:bg-blue-500',
        'dark:focus:ring-blue-400',
      ].join(' '),

      secondary: [
        'bg-blue-400 text-white shadow-sm',
        'hover:bg-blue-500 hover:shadow-md',
        'focus:ring-blue-400',
        'dark:bg-blue-300 dark:text-gray-900',
        'dark:hover:bg-blue-200',
        'dark:focus:ring-blue-300',
      ].join(' '),

      outline: [
        'border border-blue-600 text-blue-600 bg-transparent',
        'hover:bg-blue-50 hover:border-blue-700',
        'focus:ring-blue-600',
        'dark:border-blue-400 dark:text-blue-400',
        'dark:hover:bg-gray-800 dark:hover:border-blue-300',
        'dark:focus:ring-blue-400',
      ].join(' '),

      ghost: [
        'text-blue-600 bg-transparent',
        'hover:bg-blue-50 hover:text-blue-700',
        'focus:ring-blue-600',
        'dark:text-blue-400',
        'dark:hover:bg-gray-800 dark:hover:text-blue-300',
        'dark:focus:ring-blue-400',
      ].join(' '),

      destructive: [
        'bg-red-500 text-white shadow-sm',
        'hover:bg-red-600 hover:shadow-md',
        'focus:ring-red-500',
        'dark:bg-red-600',
        'dark:hover:bg-red-700',
        'dark:focus:ring-red-500',
      ].join(' '),
    };

    return (
      <button
        ref={ref}
        className={cn(baseClasses, sizeClasses[size], variantClasses[variant], className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <svg
              className="animate-spin h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Loading...
          </>
        ) : (
          <>
            {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
            <span>{children}</span>
            {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
          </>
        )}
      </button>
    );
  },
);

Button.displayName = 'Button';
