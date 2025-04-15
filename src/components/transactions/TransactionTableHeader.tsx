import React from "react";
import { SortState } from "@/types/transaction";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface TransactionTableHeaderProps {
  sort: SortState;
  onSort: (column: string) => void;
}

export function TransactionTableHeader({
  sort,
  onSort,
}: TransactionTableHeaderProps) {
  const headers = [
    { key: "date", label: "Date" },
    { key: "description", label: "Description" },
    { key: "amount", label: "Amount" },
    { key: "category", label: "Category" },
  ];

  return (
    <thead className="border-b border-muted/20 bg-background/50 backdrop-blur-sm">
      <tr>
        {headers.map(({ key, label }) => (
          <th
            key={key}
            onClick={() => onSort(key)}
            className={cn(
              "px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground",
              "cursor-pointer transition-colors hover:text-primary",
              "group relative"
            )}
          >
            <div className="flex items-center gap-1">
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
