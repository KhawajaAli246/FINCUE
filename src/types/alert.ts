export interface Alert {
  id: number;
  title: string;
  description: string;
  date: string;
  type: AlertType;
  status: AlertStatus;
  asset?: string;
  ticker?: string;
}

export type AlertType = "price_target" | "earning" | "dividend" | "news";
export type AlertStatus = "active" | "triggered" | "expired";

// Sample alerts data
export const alertsData: Alert[] = [
  {
    id: 1,
    title: "Price Target Reached",
    description: "Apple Inc. has reached your target price of $175.",
    date: "2023-04-10",
    type: "price_target",
    status: "triggered",
    asset: "Apple Inc.",
    ticker: "AAPL",
  },
  {
    id: 2,
    title: "Upcoming Earnings",
    description: "Microsoft reports quarterly earnings on April 25.",
    date: "2023-04-20",
    type: "earning",
    status: "active",
    asset: "Microsoft Corporation",
    ticker: "MSFT",
  },
  {
    id: 3,
    title: "Dividend Payment",
    description: "HDFC Bank dividend of $15 per share to be paid on May 5.",
    date: "2023-05-01",
    type: "dividend",
    status: "active",
    asset: "HDFC Bank",
    ticker: "HDFCBANK.NS",
  },
  {
    id: 4,
    title: "Price Target",
    description: "Bitcoin approaching your target price of $45,000.",
    date: "2023-04-15",
    type: "price_target",
    status: "active",
    asset: "Bitcoin",
    ticker: "BTC",
  },
  {
    id: 5,
    title: "Market News",
    description: "Stock market closed on upcoming national holiday.",
    date: "2023-04-18",
    type: "news",
    status: "active",
  },
];
