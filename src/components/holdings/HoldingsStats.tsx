import React from "react";
import { Holding } from "@/types/holding";
import { Wallet, TrendingUp, TrendingDown, PieChart } from "lucide-react";
import { cn } from "@/lib/utils";

interface HoldingsStatsProps {
  holdings: Holding[];
}

export function HoldingsStats({ holdings }: HoldingsStatsProps) {
  const stats = React.useMemo(() => {
    const totalValue = holdings.reduce((sum, h) => sum + h.value, 0);
    const totalProfitLoss = holdings.reduce((sum, h) => sum + h.profitLoss, 0);
    const profitableHoldings = holdings.filter((h) => h.profitLoss > 0);
    const unprofitableHoldings = holdings.filter((h) => h.profitLoss < 0);

    const avgProfitLossPercentage =
      holdings.length > 0
        ? holdings.reduce((sum, h) => sum + h.profitLossPercentage, 0) /
          holdings.length
        : 0;

    return {
      totalValue,
      totalProfitLoss,
      profitableCount: profitableHoldings.length,
      unprofitableCount: unprofitableHoldings.length,
      avgProfitLossPercentage,
      totalHoldings: holdings.length,
    };
  }, [holdings]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(Math.abs(value));
  };

  const formatPercentage = (value: number) => {
    return new Intl.NumberFormat("en", {
      style: "percent",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value / 100);
  };

  return (
    <div className="grid gap-4 md:grid-cols-4">
      <div className="rounded-lg border bg-card p-4 text-card-foreground">
        <div className="flex items-center gap-2">
          <Wallet className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">Portfolio Value</span>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-2xl font-bold">
            {formatCurrency(stats.totalValue)}
          </span>
          <span className="text-sm text-muted-foreground">
            {stats.totalHoldings} holdings
          </span>
        </div>
      </div>

      <div className="rounded-lg border bg-card p-4 text-card-foreground">
        <div className="flex items-center gap-2">
          <PieChart className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">Holdings Distribution</span>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm text-emerald-500">
              {stats.profitableCount} Profit
            </span>
            <span className="text-muted-foreground">•</span>
            <span className="text-sm text-red-500">
              {stats.unprofitableCount} Loss
            </span>
          </div>
        </div>
      </div>

      <div className="rounded-lg border bg-card p-4 text-card-foreground">
        <div className="flex items-center gap-2">
          {stats.totalProfitLoss > 0 ? (
            <TrendingUp className="h-4 w-4 text-emerald-500" />
          ) : (
            <TrendingDown className="h-4 w-4 text-red-500" />
          )}
          <span className="text-sm font-medium">Total Profit/Loss</span>
        </div>
        <div className="mt-2">
          <span
            className={cn(
              "text-2xl font-bold",
              stats.totalProfitLoss > 0 ? "text-emerald-500" : "text-red-500"
            )}
          >
            {formatCurrency(stats.totalProfitLoss)}
          </span>
        </div>
      </div>

      <div className="rounded-lg border bg-card p-4 text-card-foreground">
        <div className="flex items-center gap-2">
          {stats.avgProfitLossPercentage > 0 ? (
            <TrendingUp className="h-4 w-4 text-emerald-500" />
          ) : (
            <TrendingDown className="h-4 w-4 text-red-500" />
          )}
          <span className="text-sm font-medium">Average Return</span>
        </div>
        <div className="mt-2">
          <span
            className={cn(
              "text-2xl font-bold",
              stats.avgProfitLossPercentage > 0
                ? "text-emerald-500"
                : "text-red-500"
            )}
          >
            {formatPercentage(stats.avgProfitLossPercentage)}
          </span>
        </div>
      </div>
    </div>
  );
}
