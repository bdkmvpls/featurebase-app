import * as React from 'react';

import { cn } from '@/utils';

const baseStyles =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[color,box-shadow] disabled:pointer-events-none cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-all duration-300";

const variantStyles = {
  default: 'bg-primary text-white shadow-xs hover:bg-primary/80 border-accent',
  outline: 'border border-border shadow-xs hover:bg-border text-foreground',
  secondary: 'bg-secondary border border-border text-foreground shadow-xs hover:bg-border/80',
};

const sizeStyles = {
  default: 'h-9 px-4 py-2 has-[>svg]:px-3',
  sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
  lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
};

export interface ButtonProps extends React.ComponentProps<'button'> {
  variant?: 'default' | 'secondary' | 'outline';
  size?: 'sm' | 'default' | 'lg';
  asChild?: boolean;
}

const Button: React.FC<ButtonProps> = ({ className, variant = 'default', size = 'default', children, ...props }) => {
  const buttonClasses = cn(baseStyles, sizeStyles[size], variantStyles[variant], className);
  return (
    <button data-slot="button" className={buttonClasses} {...props}>
      {children}
    </button>
  );
};

export { Button };
