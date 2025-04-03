import { cn } from '@/utils';
import React from 'react';

interface CapsuleProps {
  children: React.ReactNode;
  color?: 'blue' | 'green' | 'red' | 'purple' | 'default';
  className?: string;
}

const baseStyles =
  'hover:shadow pointer-events-none px-2 py-1 flex items-center text-xs font-medium rounded-md border w-fit';

const colorStyles = {
  default: 'hover:shadow-secondary/20 bg-secondary text-foreground border-border hover:border-border/70',
  blue: 'hover:shadow-blue-700/20 bg-blue-500/10 text-blue-500 border-blue-500/10 hover:border-blue-500/10',
  green: 'hover:shadow-green-700/20 bg-green-500/10 text-green-500 border-green-500/10 hover:border-green-500/10',
  red: 'hover:shadow-red-700/20 bg-red-500/10 text-red-500 border-red-500/10 hover:border-red-500/10',
  purple: 'hover:shadow-purple-700/20 bg-purple-500/10 text-purple-500 border-purple-500/10 hover:border-purple-500/10',
};

const Capsule: React.FC<CapsuleProps> = ({ children, color = 'default', className }) => {
  return <p className={cn(baseStyles, colorStyles[color], className)}>{children}</p>;
};

export default Capsule;
