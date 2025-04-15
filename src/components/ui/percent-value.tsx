
import React from "react";
import { ArrowDown, ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatPercent, getValueColorClass } from "@/utils/formatUtils";

interface PercentValueProps {
  value: number;
  showIcon?: boolean;
  className?: string;
  iconSize?: number;
}

export function PercentValue({ value, showIcon = true, className, iconSize = 16 }: PercentValueProps) {
  const colorClass = getValueColorClass(value);
  
  return (
    <span className={cn("inline-flex items-center", colorClass, className)}>
      {showIcon && (
        value >= 0 ? (
          <ArrowUp className="mr-1" style={{ width: iconSize, height: iconSize }} />
        ) : (
          <ArrowDown className="mr-1" style={{ width: iconSize, height: iconSize }} />
        )
      )}
      {formatPercent(Math.abs(value))}
    </span>
  );
}
