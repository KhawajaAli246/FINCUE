
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

interface AssetListHeaderProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  assetType: string | null;
  setAssetType: (type: string | null) => void;
}

export function AssetListHeader({
  searchTerm,
  setSearchTerm,
  assetType,
  setAssetType
}: AssetListHeaderProps) {
  return (
    <div className="p-6 border-b">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-xl font-semibold tracking-tight">Portfolio Holdings</h2>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search assets..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Select 
            value={assetType || "all"} 
            onValueChange={(value) => setAssetType(value === "all" ? null : value)}
          >
            <SelectTrigger className="w-32">
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="stock">Stocks</SelectItem>
              <SelectItem value="crypto">Crypto</SelectItem>
              <SelectItem value="cash">Cash</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
