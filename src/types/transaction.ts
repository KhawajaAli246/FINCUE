
export interface Transaction {
  id: number;
  date: string;
  type: "Buy" | "Sell";
  asset: string;
  ticker: string;
  quantity: number;
  price: number;
  value: number;
  status: string;
}

export type SortDirection = 'asc' | 'desc' | null;

export interface SortState {
  column: string;
  direction: SortDirection;
}

// Sample transactions data
export const transactionsData: Transaction[] = [
  {
    id: 1,
    date: "2023-04-10",
    type: "Buy",
    asset: "Apple Inc.",
    ticker: "AAPL",
    quantity: 5,
    price: 150,
    value: 750,
    status: "Completed",
  },
  {
    id: 2,
    date: "2023-04-05",
    type: "Buy",
    asset: "Microsoft Corporation",
    ticker: "MSFT",
    quantity: 3,
    price: 265,
    value: 795,
    status: "Completed",
  },
  {
    id: 3,
    date: "2023-03-28",
    type: "Sell",
    asset: "Tesla Inc.",
    ticker: "TSLA",
    quantity: 2,
    price: 244.88,
    value: 489.76,
    status: "Completed",
  },
  {
    id: 4,
    date: "2023-03-15",
    type: "Buy",
    asset: "Bitcoin",
    ticker: "BTC",
    quantity: 0.25,
    price: 40000,
    value: 10000,
    status: "Completed",
  },
  {
    id: 5,
    date: "2023-03-10",
    type: "Buy",
    asset: "NVIDIA Corporation",
    ticker: "NVDA",
    quantity: 8,
    price: 180,
    value: 1440,
    status: "Completed",
  },
  {
    id: 6,
    date: "2023-03-05",
    type: "Sell",
    asset: "Amazon.com Inc.",
    ticker: "AMZN",
    quantity: 4,
    price: 135,
    value: 540,
    status: "Completed",
  },
  {
    id: 7,
    date: "2023-02-28",
    type: "Buy",
    asset: "Ethereum",
    ticker: "ETH",
    quantity: 2,
    price: 2500,
    value: 5000,
    status: "Completed",
  },
  {
    id: 8,
    date: "2023-02-20",
    type: "Buy",
    asset: "Apple Inc.",
    ticker: "AAPL",
    quantity: 5,
    price: 145,
    value: 725,
    status: "Completed",
  },
  {
    id: 9,
    date: "2023-02-15",
    type: "Sell",
    asset: "Ethereum",
    ticker: "ETH",
    quantity: 1,
    price: 2400,
    value: 2400,
    status: "Completed",
  },
  {
    id: 10,
    date: "2023-02-10",
    type: "Buy",
    asset: "Tesla Inc.",
    ticker: "TSLA",
    quantity: 14,
    price: 220,
    value: 3080,
    status: "Completed",
  },
];
