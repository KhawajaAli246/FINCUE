import React from "react";
import { Search, Calendar, Filter } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";

interface TransactionFiltersProps {
  onSearchChange: (value: string) => void;
  onDateChange: (date: Date | undefined) => void;
  onTypeChange: (type: string) => void;
  selectedDate?: Date;
  selectedType: string;
  searchValue: string;
}

export function TransactionFilters({
  onSearchChange,
  onDateChange,
  onTypeChange,
  selectedDate,
  selectedType,
  searchValue,
}: TransactionFiltersProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between p-4 bg-background/50 backdrop-blur-sm border-b">
      <div className="relative flex-1 max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search transactions..."
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9 bg-background/50"
        />
      </div>

      <div className="flex items-center gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "justify-start text-left font-normal",
                !selectedDate && "text-muted-foreground"
              )}
            >
              <Calendar className="mr-2 h-4 w-4" />
              {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="end">
            <CalendarComponent
              mode="single"
              selected={selectedDate}
              onSelect={onDateChange}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        <Select value={selectedType} onValueChange={onTypeChange}>
          <SelectTrigger className="w-[130px]">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Filter type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="buy">Buy</SelectItem>
            <SelectItem value="sell">Sell</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
