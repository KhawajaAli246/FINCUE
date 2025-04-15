export interface Asset {
  id: number;
  name: string;
  ticker: string;
  type: AssetType;
  quantity: number;
  avgBuyPrice: number;
  currentPrice: number;
  sector?: string;
  logoUrl?: string;
}

export type AssetType =
  | "stock"
  | "crypto"
  | "cash"
  | "bond"
  | "commodity"
  | "real_estate"
  | "other";

// Sample assets data
export const assetsData: Asset[] = [
  {
    id: 1,
    name: "Apple Inc.",
    ticker: "AAPL",
    type: "stock",
    quantity: 10,
    avgBuyPrice: 150,
    currentPrice: 174.5,
    sector: "Technology",
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/1667px-Apple_logo_black.svg.png",
  },
  {
    id: 2,
    name: "Microsoft Corporation",
    ticker: "MSFT",
    type: "stock",
    quantity: 5,
    avgBuyPrice: 265,
    currentPrice: 305.75,
    sector: "Technology",
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/2048px-Microsoft_logo.svg.png",
  },
  {
    id: 3,
    name: "Bitcoin",
    ticker: "BTC",
    type: "crypto",
    quantity: 0.5,
    avgBuyPrice: 40000,
    currentPrice: 44500,
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1200px-Bitcoin.svg.png",
  },
  {
    id: 4,
    name: "Ethereum",
    ticker: "ETH",
    type: "crypto",
    quantity: 2,
    avgBuyPrice: 2500,
    currentPrice: 2300,
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Ethereum-icon-purple.svg/1200px-Ethereum-icon-purple.svg.png",
  },
  {
    id: 5,
    name: "Tata Consultancy Services",
    ticker: "TCS.NS",
    type: "stock",
    quantity: 15,
    avgBuyPrice: 3200,
    currentPrice: 3450,
    sector: "Technology",
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Tata_Consultancy_Services_Logo.svg/1280px-Tata_Consultancy_Services_Logo.svg.png",
  },
  {
    id: 6,
    name: "Reliance Industries",
    ticker: "RELIANCE.NS",
    type: "stock",
    quantity: 8,
    avgBuyPrice: 2100,
    currentPrice: 2350,
    sector: "Energy",
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/en/thumb/7/74/Reliance_Industries_Logo.svg/1200px-Reliance_Industries_Logo.svg.png",
  },
  {
    id: 7,
    name: "HDFC Bank",
    ticker: "HDFCBANK.NS",
    type: "stock",
    quantity: 12,
    avgBuyPrice: 1450,
    currentPrice: 1380,
    sector: "Financial Services",
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/HDFC_Bank_Logo.svg/1200px-HDFC_Bank_Logo.svg.png",
  },
  {
    id: 8,
    name: "Cash",
    ticker: "USD",
    type: "cash",
    quantity: 100000,
    avgBuyPrice: 1,
    currentPrice: 1,
  },
];
