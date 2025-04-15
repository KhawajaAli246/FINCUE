import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { transactionsData, SortState, Transaction } from "@/types/transaction";
import { TransactionSearch } from "./transactions/TransactionSearch";
import { TransactionTable } from "./transactions/TransactionTable";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";

export function TransactionsHistory() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sort, setSort] = useState<SortState>({
    column: "date",
    direction: "desc",
  });
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Filter and sort transactions
  const filteredTransactions = transactionsData
    .filter((transaction) => {
      const matchesSearch =
        transaction.asset.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.ticker.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = typeFilter ? transaction.type === typeFilter : true;
      return matchesSearch && matchesType;
    })
    .sort((a, b) => {
      if (!sort.direction) return 0;

      const multiplier = sort.direction === "asc" ? 1 : -1;
      const columnA = a[sort.column as keyof Transaction];
      const columnB = b[sort.column as keyof Transaction];

      if (typeof columnA === "number" && typeof columnB === "number") {
        return (columnA - columnB) * multiplier;
      }

      if (typeof columnA === "string" && typeof columnB === "string") {
        return columnA.localeCompare(columnB) * multiplier;
      }

      return 0;
    });

  // Handle sorting
  const handleSort = (column: string) => {
    if (sort.column === column) {
      // Cycle through: asc -> desc -> null
      const directions: ("asc" | "desc" | null)[] = ["asc", "desc", null];
      const currentIndex = directions.indexOf(sort.direction);
      const nextDirection = directions[(currentIndex + 1) % 3];
      setSort({ column, direction: nextDirection });
    } else {
      setSort({ column, direction: "asc" });
    }
  };

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <motion.div
          key="loading"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex items-center justify-center h-[300px]"
        >
          <div className="flex flex-col items-center gap-4">
            <Sparkles className="h-8 w-8 animate-pulse text-blue-500" />
            <p className="text-muted-foreground">Loading transactions...</p>
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <Card className="relative overflow-hidden backdrop-blur-xs bg-background/95 border-muted/20 shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5" />
            <div className="relative p-6 border-b border-muted/20">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <motion.h2
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xl font-semibold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/50"
                >
                  Transaction History
                </motion.h2>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <TransactionSearch
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    typeFilter={typeFilter}
                    setTypeFilter={setTypeFilter}
                  />
                </motion.div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <TransactionTable
                transactions={filteredTransactions}
                sort={sort}
                onSort={handleSort}
              />
            </motion.div>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
