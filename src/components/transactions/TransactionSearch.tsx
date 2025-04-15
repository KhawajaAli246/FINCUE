
import React from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TransactionSearchProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  typeFilter: string | null;
  setTypeFilter: (value: string | null) => void;
}

export function TransactionSearch({ 
  searchTerm, 
  setSearchTerm, 
  typeFilter, 
  setTypeFilter 
}: TransactionSearchProps) {
  return (
    <div className="flex items-center gap-3 w-full md:w-auto">
      <div className="relative w-full md:w-64">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search transactions..."
          className="pl-8"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <Select 
        value={typeFilter || "all"} 
        onValueChange={(value) => setTypeFilter(value === "all" ? null : value)}
      >
        <SelectTrigger className="w-32">
          <SelectValue placeholder="All Types" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Types</SelectItem>
          <SelectItem value="Buy">Buy</SelectItem>
          <SelectItem value="Sell">Sell</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
