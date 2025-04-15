import React from "react";
import { SortState } from "@/types/holding";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface HoldingsTableHeaderProps {
  sort: SortState;
  onSort: (column: string) => void;
}

export function HoldingsTableHeader({
  sort,
  onSort,
}: HoldingsTableHeaderProps) {
  const headers = [
    { key: "asset", label: "Asset", align: "left" as const },
    { key: "quantity", label: "Quantity", align: "right" as const },
    { key: "price", label: "Price", align: "right" as const },
    { key: "value", label: "Value", align: "right" as const },
    { key: "allocation", label: "Allocation", align: "right" as const },
    { key: "profitLoss", label: "Profit/Loss", align: "right" as const },
  ] as const;

  return (
    <thead className="border-b border-muted/20 bg-background/50 backdrop-blur-sm">
      <tr>
        {headers.map(({ key, label, align }) => (
          <th
            key={key}
            onClick={() => onSort(key)}
            className={cn(
              "px-4 py-3 text-xs font-medium uppercase tracking-wider text-muted-foreground",
              "cursor-pointer transition-colors hover:text-primary",
              "group relative",
              align === "right" ? "text-right" : "text-left"
            )}
          >
            <div
              className={cn(
                "flex items-center gap-1",
                align === "right" ? "justify-end" : "justify-start"
              )}
            >
              {label}
              <span className="inline-flex opacity-0 transition-opacity group-hover:opacity-50">
                {sort.column === key ? (
                  sort.direction === "asc" ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </span>
            </div>
          </th>
        ))}
      </tr>
    </thead>
  );
}
