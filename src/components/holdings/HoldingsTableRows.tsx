import React from "react";
import { Holding } from "@/types/holding";
import { cn } from "@/lib/utils";

interface HoldingsTableRowsProps {
  holdings: Holding[];
}

export function HoldingsTableRows({ holdings }: HoldingsTableRowsProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatPercentage = (value: number) => {
    return new Intl.NumberFormat("en", {
      style: "percent",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value / 100);
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat("en", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 6,
    }).format(value);
  };

  return (
    <tbody>
      {holdings.map((holding, index) => (
        <tr
          key={holding.id}
          className={cn(
            "group transition-colors hover:bg-muted/5",
            "animate-fade-in [animation-fill-mode:both]",
            "[animation-delay:var(--delay)]"
          )}
          style={{ "--delay": `${index * 50}ms` } as React.CSSProperties}
        >
          <td className="px-4 py-3 whitespace-nowrap">
            <div className="flex flex-col">
              <span className="font-medium text-foreground">
                {holding.asset}
              </span>
              <span className="text-xs text-muted-foreground">
                {holding.ticker}
              </span>
            </div>
          </td>
          <td className="px-4 py-3 text-right whitespace-nowrap">
            {formatNumber(holding.quantity)}
          </td>
          <td className="px-4 py-3 text-right whitespace-nowrap">
            {formatCurrency(holding.price)}
          </td>
          <td className="px-4 py-3 text-right whitespace-nowrap font-medium">
            {formatCurrency(holding.value)}
          </td>
          <td className="px-4 py-3 text-right whitespace-nowrap">
            {formatPercentage(holding.allocation)}
          </td>
          <td className="px-4 py-3 text-right whitespace-nowrap">
            <div className="flex flex-col items-end">
              <span
                className={cn(
                  "font-medium",
                  holding.profitLoss > 0 ? "text-emerald-500" : "text-red-500"
                )}
              >
                {formatCurrency(holding.profitLoss)}
              </span>
              <span
                className={cn(
                  "text-xs",
                  holding.profitLossPercentage > 0
                    ? "text-emerald-500"
                    : "text-red-500"
                )}
              >
                {formatPercentage(holding.profitLossPercentage)}
              </span>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  );
}
