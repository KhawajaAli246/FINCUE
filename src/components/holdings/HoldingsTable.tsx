import React, { useState, useMemo } from "react";
import { Holding, SortState } from "@/types/holding";
import { HoldingsTableHeader } from "./HoldingsTableHeader";
import { HoldingsTableRows } from "./HoldingsTableRows";
import { HoldingsFilters } from "./HoldingsFilters";
import { HoldingsStats } from "./HoldingsStats";
import { HoldingsPagination } from "./HoldingsPagination";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface HoldingsTableProps {
  holdings: Holding[];
}

export function HoldingsTable({ holdings }: HoldingsTableProps) {
  const [sort, setSort] = useState<SortState>({
    column: "value",
    direction: "desc",
  });
  const [searchValue, setSearchValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  const handleSort = (column: string) => {
    setSort((prev) => ({
      column,
      direction:
        prev.column === column
          ? prev.direction === "asc"
            ? "desc"
            : "asc"
          : "asc",
    }));
  };

  const filteredAndSortedHoldings = useMemo(() => {
    let filtered = [...holdings];

    // Apply search filter
    if (searchValue) {
      const searchLower = searchValue.toLowerCase();
      filtered = filtered.filter(
        (h) =>
          h.asset.toLowerCase().includes(searchLower) ||
          h.ticker.toLowerCase().includes(searchLower)
      );
    }

    // Apply category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (h) => h.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Apply sorting
    return filtered.sort((a, b) => {
      const aValue = a[sort.column as keyof Holding];
      const bValue = b[sort.column as keyof Holding];

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sort.direction === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      if (typeof aValue === "number" && typeof bValue === "number") {
        return sort.direction === "asc" ? aValue - bValue : bValue - aValue;
      }

      return 0;
    });
  }, [holdings, sort, searchValue, selectedCategory]);

  // Reset to first page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchValue, selectedCategory]);

  const totalPages = Math.ceil(filteredAndSortedHoldings.length / pageSize);
  const paginatedHoldings = filteredAndSortedHoldings.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  const totalValue = useMemo(() => {
    return filteredAndSortedHoldings.reduce(
      (sum, holding) => sum + holding.value,
      0
    );
  }, [filteredAndSortedHoldings]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-4"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary animate-pulse" />
          <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Portfolio Holdings
          </h2>
        </div>
        <div className="text-sm text-muted-foreground">
          Total Value: ${totalValue.toLocaleString()}
        </div>
      </div>

      <motion.div layout className="space-y-4">
        <HoldingsStats holdings={filteredAndSortedHoldings} />

        <motion.div
          className={cn(
            "rounded-lg border bg-card text-card-foreground shadow-sm",
            "backdrop-blur-sm bg-opacity-90",
            "transition-all duration-300 hover:shadow-lg"
          )}
        >
          <HoldingsFilters
            searchValue={searchValue}
            onSearchChange={setSearchValue}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />

          <div className="relative overflow-x-auto">
            <table className="w-full">
              <HoldingsTableHeader sort={sort} onSort={handleSort} />
              <AnimatePresence mode="wait">
                {paginatedHoldings.length > 0 ? (
                  <motion.tbody
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {paginatedHoldings.map((holding, index) => (
                      <motion.tr
                        key={holding.ticker}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        onHoverStart={() => setHoveredRow(index)}
                        onHoverEnd={() => setHoveredRow(null)}
                        className={cn(
                          "transition-colors duration-200",
                          hoveredRow === index && "bg-muted/50",
                          "relative"
                        )}
                      >
                        <HoldingsTableRows holdings={[holding]} />
                        {hoveredRow === index && (
                          <motion.div
                            layoutId="highlight"
                            className="absolute inset-0 bg-primary/5 rounded-md"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                          />
                        )}
                      </motion.tr>
                    ))}
                  </motion.tbody>
                ) : (
                  <motion.tbody
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <tr>
                      <td colSpan={6} className="px-4 py-8 text-center">
                        <motion.div
                          initial={{ scale: 0.9 }}
                          animate={{ scale: 1 }}
                          transition={{
                            type: "spring",
                            stiffness: 260,
                            damping: 20,
                          }}
                          className="flex flex-col items-center gap-2 text-muted-foreground"
                        >
                          <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                            <Sparkles className="w-6 h-6" />
                          </div>
                          <p>No holdings found</p>
                          <p className="text-sm">Try adjusting your filters</p>
                        </motion.div>
                      </td>
                    </tr>
                  </motion.tbody>
                )}
              </AnimatePresence>
            </table>
          </div>

          <HoldingsPagination
            currentPage={currentPage}
            totalPages={totalPages}
            pageSize={pageSize}
            totalItems={filteredAndSortedHoldings.length}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
