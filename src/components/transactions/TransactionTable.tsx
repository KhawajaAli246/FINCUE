import React, { useState, useMemo } from "react";
import { Transaction, SortState } from "@/types/transaction";
import { TransactionTableHeader } from "./TransactionTableHeader";
import { TransactionTableRows } from "./TransactionTableRows";
import { TransactionFilters } from "./TransactionFilters";
import { TransactionStats } from "./TransactionStats";
import { TransactionPagination } from "./TransactionPagination";

interface TransactionTableProps {
  transactions: Transaction[];
  sort: SortState;
  onSort: (column: string) => void;
}

export function TransactionTable({
  transactions,
  sort,
  onSort,
}: TransactionTableProps) {
  const [searchValue, setSearchValue] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedType, setSelectedType] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const handleSort = (column: string) => {
    onSort(column);
  };

  const filteredAndSortedTransactions = useMemo(() => {
    let filtered = [...transactions];

    // Apply search filter
    if (searchValue) {
      const searchLower = searchValue.toLowerCase();
      filtered = filtered.filter(
        (t) =>
          t.asset.toLowerCase().includes(searchLower) ||
          t.ticker.toLowerCase().includes(searchLower)
      );
    }

    // Apply date filter
    if (selectedDate) {
      filtered = filtered.filter((t) => {
        const transactionDate = new Date(t.date);
        return (
          transactionDate.getFullYear() === selectedDate.getFullYear() &&
          transactionDate.getMonth() === selectedDate.getMonth() &&
          transactionDate.getDate() === selectedDate.getDate()
        );
      });
    }

    // Apply type filter
    if (selectedType !== "all") {
      filtered = filtered.filter(
        (t) => t.type.toLowerCase() === selectedType.toLowerCase()
      );
    }

    // Apply sorting
    return filtered.sort((a, b) => {
      const aValue = a[sort.column as keyof Transaction];
      const bValue = b[sort.column as keyof Transaction];

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sort.direction === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      if (typeof aValue === "number" && typeof bValue === "number") {
        return sort.direction === "asc" ? aValue - bValue : bValue - aValue;
      }

      // Handle date sorting
      if (sort.column === "date") {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return sort.direction === "asc" ? dateA - dateB : dateB - dateA;
      }

      return 0;
    });
  }, [transactions, sort, searchValue, selectedDate, selectedType]);

  // Reset to first page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchValue, selectedDate, selectedType]);

  const totalPages = Math.ceil(filteredAndSortedTransactions.length / pageSize);
  const paginatedTransactions = filteredAndSortedTransactions.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1); // Reset to first page when changing page size
  };

  return (
    <div className="space-y-4">
      <TransactionStats transactions={filteredAndSortedTransactions} />

      <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
        <TransactionFilters
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          selectedDate={selectedDate}
          onDateChange={setSelectedDate}
          selectedType={selectedType}
          onTypeChange={setSelectedType}
        />

        <div className="relative overflow-x-auto">
          <table className="w-full">
            <TransactionTableHeader sort={sort} onSort={handleSort} />
            {paginatedTransactions.length > 0 ? (
              <TransactionTableRows transactions={paginatedTransactions} />
            ) : (
              <tbody>
                <tr>
                  <td
                    colSpan={4}
                    className="px-4 py-8 text-center text-muted-foreground animate-fade-in"
                  >
                    No transactions found
                  </td>
                </tr>
              </tbody>
            )}
          </table>
        </div>

        <TransactionPagination
          currentPage={currentPage}
          totalPages={totalPages}
          pageSize={pageSize}
          totalItems={filteredAndSortedTransactions.length}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
        />
      </div>
    </div>
  );
}
