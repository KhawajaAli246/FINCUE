
import React from "react";
import { cn } from "@/lib/utils";

interface NotificationBadgeProps {
  count?: number;
  className?: string;
  max?: number;
}

export function NotificationBadge({ 
  count = 0, 
  className, 
  max = 99 
}: NotificationBadgeProps) {
  if (count === 0) return null;
  
  const displayCount = count > max ? `${max}+` : count;
  
  return (
    <span 
      className={cn(
        "inline-flex items-center justify-center min-w-5 h-5 px-1.5 text-xs font-medium rounded-full bg-red-500 text-white",
        className
      )}
    >
      {displayCount}
    </span>
  );
}
