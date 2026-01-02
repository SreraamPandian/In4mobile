import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '../../lib/utils';

interface CardProps extends HTMLMotionProps<"div"> {
  noPadding?: boolean;
}

const Card: React.FC<CardProps> = ({ className, children, noPadding, ...props }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "bg-surface rounded-2xl shadow-soft-md border border-border/50 overflow-hidden",
        !noPadding && "p-5",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Card;
