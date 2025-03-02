
import React from 'react';
import { cn } from "@/lib/utils";
import { motion } from 'framer-motion';

interface LoaderProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  message?: string;
}

const Loader = ({ className, size = 'md', message }: LoaderProps) => {
  const sizeClasses = {
    sm: 'w-5 h-5 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4'
  };
  
  return (
    <div className={cn("flex flex-col items-center justify-center", className)}>
      <motion.div 
        className={cn(
          "border-primary/30 border-t-primary rounded-full", 
          sizeClasses[size]
        )}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
      {message && (
        <motion.p 
          className="mt-4 text-muted-foreground text-gradient font-medium"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          {message}
        </motion.p>
      )}
    </div>
  );
};

export default Loader;
