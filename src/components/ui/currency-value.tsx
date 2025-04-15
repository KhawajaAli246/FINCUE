
import React from "react";
import { ArrowDown, ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatCurrency, getValueColorClass } from "@/utils/formatUtils";

interface CurrencyValueProps {
  value: number;
  showIcon?: boolean;
  showSign?: boolean;
  colorize?: boolean;
  className?: string;
  iconSize?: number;
}

export function CurrencyValue({ 
  value, 
  showIcon = false, 
  showSign = false, 
  colorize = true, 
  className,
  iconSize = 16
}: CurrencyValueProps) {
  const colorClass = colorize ? getValueColorClass(value) : "";
  
  return (
    <span className={cn("inline-flex items-center", colorize && colorClass, className)}>
      {showIcon && value !== 0 && (
        value > 0 ? (
          <ArrowUp className="mr-1" style={{ width: iconSize, height: iconSize }} />
        ) : (
          <ArrowDown className="mr-1" style={{ width: iconSize, height: iconSize }} />
        )
      )}
      {showSign && value > 0 && "+"}
      {formatCurrency(Math.abs(value))}
    </span>
  );
}
