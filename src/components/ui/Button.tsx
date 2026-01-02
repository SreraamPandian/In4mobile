import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '../../lib/utils';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  className,
  variant = 'primary',
  size = 'md',
  isLoading,
  fullWidth,
  children,
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center rounded-xl font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
  
  const variants = {
    primary: "bg-primary text-white hover:bg-primary-dark shadow-soft-md focus:ring-primary",
    secondary: "bg-white text-text-main border border-border hover:bg-gray-50 shadow-soft-sm focus:ring-gray-200",
    outline: "border-2 border-primary text-primary hover:bg-primary/5 focus:ring-primary",
    ghost: "text-text-secondary hover:text-text-main hover:bg-gray-100",
    danger: "bg-error text-white hover:bg-red-600 shadow-soft-md focus:ring-error",
  };

  const sizes = {
    sm: "h-9 px-3 text-xs",
    md: "h-12 px-5 text-sm",
    lg: "h-14 px-8 text-base",
  };

  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        fullWidth && "w-full",
        className
      )}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </motion.button>
  );
};

export default Button;
