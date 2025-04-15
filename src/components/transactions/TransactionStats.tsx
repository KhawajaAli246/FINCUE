import React from "react";
import { Transaction } from "@/types/transaction";
import { ArrowUpRight, ArrowDownRight, Wallet } from "lucide-react";
import { cn } from "@/lib/utils";

interface TransactionStatsProps {
  transactions: Transaction[];
}

export function TransactionStats({ transactions }: TransactionStatsProps) {
  const stats = React.useMemo(() => {
    const buyTransactions = transactions.filter((t) => t.type === "Buy");
    const sellTransactions = transactions.filter((t) => t.type === "Sell");

    const totalBuyValue = buyTransactions.reduce((sum, t) => sum + t.value, 0);
    const totalSellValue = sellTransactions.reduce(
      (sum, t) => sum + t.value,
      0
    );
    const netValue = totalBuyValue - totalSellValue;

    return {
      totalTransactions: transactions.length,
      buyCount: buyTransactions.length,
      sellCount: sellTransactions.length,
      totalBuyValue,
      totalSellValue,
      netValue,
    };
  }, [transactions]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(Math.abs(value));
  };

  return (
    <div className="grid gap-4 md:grid-cols-3 p-4">
      <div className="rounded-lg border bg-card p-4 text-card-foreground">
        <div className="flex items-center gap-2">
          <Wallet className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">Total Transactions</span>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-2xl font-bold">{stats.totalTransactions}</span>
          <div className="flex items-center gap-1 text-sm">
            <span className="text-muted-foreground">Buy: {stats.buyCount}</span>
            <span className="text-muted-foreground mx-1">•</span>
            <span className="text-muted-foreground">
              Sell: {stats.sellCount}
            </span>
          </div>
        </div>
      </div>

      <div className="rounded-lg border bg-card p-4 text-card-foreground">
        <div className="flex items-center gap-2">
          <ArrowUpRight className="h-4 w-4 text-emerald-500" />
          <span className="text-sm font-medium">Total Buy Value</span>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-2xl font-bold">
            {formatCurrency(stats.totalBuyValue)}
          </span>
          <span className="text-sm text-muted-foreground">
            {stats.buyCount} transactions
          </span>
        </div>
      </div>

      <div className="rounded-lg border bg-card p-4 text-card-foreground">
        <div className="flex items-center gap-2">
          <ArrowDownRight className="h-4 w-4 text-red-500" />
          <span className="text-sm font-medium">Total Sell Value</span>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-2xl font-bold">
            {formatCurrency(stats.totalSellValue)}
          </span>
          <span className="text-sm text-muted-foreground">
            {stats.sellCount} transactions
          </span>
        </div>
      </div>

      <div className="md:col-span-3 rounded-lg border bg-card p-4 text-card-foreground">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Net Position</span>
          <span
            className={cn(
              "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium",
              stats.netValue > 0
                ? "bg-emerald-500/10 text-emerald-500"
                : "bg-red-500/10 text-red-500"
            )}
          >
            {stats.netValue > 0 ? "Net Buy" : "Net Sell"}
          </span>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <span
            className={cn(
              "text-2xl font-bold",
              stats.netValue > 0 ? "text-emerald-500" : "text-red-500"
            )}
          >
            {formatCurrency(stats.netValue)}
          </span>
          <span className="text-sm text-muted-foreground">
            {Math.abs(stats.buyCount - stats.sellCount)} transaction difference
          </span>
        </div>
      </div>
    </div>
  );
}
