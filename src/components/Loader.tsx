
import React from 'react';
import { cn } from "@/lib/utils";

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
      <div 
        className={cn(
          "border-primary/30 border-t-primary rounded-full animate-spin", 
          sizeClasses[size]
        )} 
      />
      {message && (
        <p className="mt-4 text-muted-foreground animate-pulse">{message}</p>
      )}
    </div>
  );
};

export default Loader;
