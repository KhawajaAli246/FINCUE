import React from "react";
import { Transaction } from "@/types/transaction";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface TransactionTableRowsProps {
  transactions: Transaction[];
}

export function TransactionTableRows({
  transactions,
}: TransactionTableRowsProps) {
  return (
    <tbody>
      {transactions.map((transaction, index) => (
        <tr
          key={`${transaction.date}-${index}`}
          className={cn(
            "group transition-colors hover:bg-muted/5",
            "animate-fade-in [animation-fill-mode:both]",
            "[animation-delay:var(--delay)]"
          )}
          style={{ "--delay": `${index * 50}ms` } as React.CSSProperties}
        >
          <td className="px-4 py-3 whitespace-nowrap text-sm">
            {format(new Date(transaction.date), "MMM d, yyyy")}
          </td>
          <td className="px-4 py-3 text-sm">
            <div className="flex flex-col">
              <span className="font-medium text-foreground">
                {transaction.asset}
              </span>
              <span className="text-xs text-muted-foreground">
                {transaction.ticker}
              </span>
            </div>
          </td>
          <td className="px-4 py-3 whitespace-nowrap text-sm">
            <span
              className={cn(
                "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                transaction.type === "Buy"
                  ? "bg-success/10 text-success"
                  : "bg-danger/10 text-danger"
              )}
            >
              {transaction.type}
            </span>
          </td>
          <td className="px-4 py-3 whitespace-nowrap text-right text-sm">
            <span className="font-medium">
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
                maximumFractionDigits: 0,
              }).format(transaction.value)}
            </span>
          </td>
        </tr>
      ))}
    </tbody>
  );
}
