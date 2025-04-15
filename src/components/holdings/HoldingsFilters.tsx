import React from "react";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface HoldingsFiltersProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export function HoldingsFilters({
  searchValue,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
}: HoldingsFiltersProps) {
  const categories = [
    { value: "all", label: "All Categories" },
    { value: "stocks", label: "Stocks" },
    { value: "crypto", label: "Cryptocurrency" },
    { value: "mutual_funds", label: "Mutual Funds" },
    { value: "bonds", label: "Bonds" },
    { value: "commodities", label: "Commodities" },
  ];

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between p-4 bg-background/50 backdrop-blur-sm border-b">
      <div className="relative flex-1 max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search holdings..."
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9 bg-background/50"
        />
      </div>

      <div className="flex items-center gap-2">
        <Select value={selectedCategory} onValueChange={onCategoryChange}>
          <SelectTrigger className="w-[180px]">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category.value} value={category.value}>
                {category.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
