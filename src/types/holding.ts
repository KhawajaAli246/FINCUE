export interface Holding {
  id: string;
  asset: string;
  ticker: string;
  quantity: number;
  price: number;
  value: number;
  category: string;
  allocation: number;
  profitLoss: number;
  profitLossPercentage: number;
}

export interface SortState {
  column: string;
  direction: "asc" | "desc" | null;
}
