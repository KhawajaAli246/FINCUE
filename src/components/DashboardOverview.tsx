import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowUp,
  ArrowDown,
  DollarSign,
  Percent,
  PieChart,
  Sparkles,
} from "lucide-react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  TooltipProps,
  PieChart as ReChartsPieChart,
  Pie,
  Cell,
} from "recharts";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// Sample data for the net worth chart
const generateNetWorthData = (
  days: number,
  startValue: number,
  volatility: number
) => {
  const data = [];
  let currentValue = startValue;

  for (let i = 0; i < days; i++) {
    const change = (Math.random() - 0.5) * volatility * currentValue;
    currentValue += change;
    currentValue = Math.max(currentValue, startValue * 0.5);

    const date = new Date();
    date.setDate(date.getDate() - (days - i));

    data.push({
      date: date.toISOString().split("T")[0],
      value: currentValue,
    });
  }

  return data;
};

const timeRanges = [
  { key: "1D", label: "1D", days: 1 },
  { key: "1W", label: "1W", days: 7 },
  { key: "1M", label: "1M", days: 30 },
  { key: "6M", label: "6M", days: 180 },
  { key: "1Y", label: "1Y", days: 365 },
  { key: "ALL", label: "All", days: 1095 },
];

// Portfolio summary data
const portfolioSummary = {
  totalValue: 1482500,
  dailyChange: 12500,
  dailyPercentChange: 0.85,
  totalGain: 382500,
  totalGainPercent: 34.8,
};

export function DashboardOverview() {
  const [selectedTimeRange, setSelectedTimeRange] = useState("1M");
  const [assetAllocationVisible, setAssetAllocationVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Get the appropriate data for the selected time range
  const selectedRange =
    timeRanges.find((range) => range.key === selectedTimeRange) ||
    timeRanges[2];
  const netWorthData = generateNetWorthData(selectedRange.days, 1100000, 0.015);

  // Format currency helper
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="space-y-6">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/50 bg-clip-text text-transparent"
      >
        Portfolio Overview
      </motion.h2>

      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center justify-center h-[300px]"
          >
            <div className="flex flex-col items-center gap-4">
              <Sparkles className="h-8 w-8 animate-pulse text-blue-500" />
              <p className="text-muted-foreground">Loading your portfolio...</p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            {/* Net Worth Chart */}
            <Card className="relative overflow-hidden border-none bg-gradient-to-br from-background via-background/80 to-background/50 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5" />
              <div className="relative p-6">
                <div className="flex flex-wrap justify-between items-center mb-6">
                  <div>
                    <h3 className="text-lg font-semibold">Net Worth</h3>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-3 mt-1"
                    >
                      <span className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                        {formatCurrency(portfolioSummary.totalValue)}
                      </span>
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className={`flex items-center ${
                          portfolioSummary.dailyChange >= 0
                            ? "text-emerald-500"
                            : "text-red-500"
                        }`}
                      >
                        {portfolioSummary.dailyChange >= 0 ? (
                          <ArrowUp className="h-5 w-5 mr-1" />
                        ) : (
                          <ArrowDown className="h-5 w-5 mr-1" />
                        )}
                        <span className="font-medium">
                          {formatCurrency(
                            Math.abs(portfolioSummary.dailyChange)
                          )}{" "}
                          (
                          {Math.abs(
                            portfolioSummary.dailyPercentChange
                          ).toFixed(2)}
                          %)
                        </span>
                      </motion.div>
                    </motion.div>
                  </div>

                  <Tabs
                    defaultValue={selectedTimeRange}
                    onValueChange={setSelectedTimeRange}
                    className="bg-black/20 backdrop-blur-sm rounded-lg p-1"
                  >
                    <TabsList className="bg-transparent border">
                      {timeRanges.map((range) => (
                        <TabsTrigger
                          key={range.key}
                          value={range.key}
                          className="data-[state=active]:bg-white/10"
                        >
                          {range.label}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                  </Tabs>
                </div>

                <div className="h-[300px]">
                  <ChartContainer
                    config={{
                      value: {
                        label: "Net Worth",
                        theme: {
                          light: "#60A5FA",
                          dark: "#60A5FA",
                        },
                      },
                    }}
                  >
                    <AreaChart
                      data={netWorthData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <defs>
                        <linearGradient
                          id="netWorthGradient"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#60A5FA"
                            stopOpacity={0.3}
                          />
                          <stop
                            offset="95%"
                            stopColor="#60A5FA"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <XAxis
                        dataKey="date"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "currentColor", fontSize: 12 }}
                        tickFormatter={(value) => {
                          const date = new Date(value);
                          if (
                            selectedTimeRange === "1D" ||
                            selectedTimeRange === "1W"
                          ) {
                            return date.toLocaleDateString(undefined, {
                              month: "short",
                              day: "numeric",
                            });
                          }
                          return date.toLocaleDateString(undefined, {
                            month: "short",
                            year: "2-digit",
                          });
                        }}
                      />
                      <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "currentColor", fontSize: 12 }}
                        tickFormatter={(value) => {
                          if (value >= 1000000) {
                            return `$${(value / 1000000).toFixed(1)}M`;
                          } else if (value >= 1000) {
                            return `$${(value / 1000).toFixed(0)}K`;
                          }
                          return `$${value}`;
                        }}
                      />
                      <Tooltip
                        content={({ active, payload, label }) => {
                          if (active && payload && payload.length) {
                            return (
                              <div className="rounded-lg border bg-black/80 backdrop-blur-sm p-3 shadow-xl">
                                <div className="text-sm font-medium text-white">
                                  {new Date(label).toLocaleDateString(
                                    undefined,
                                    {
                                      year: "numeric",
                                      month: "short",
                                      day: "numeric",
                                    }
                                  )}
                                </div>
                                <div className="mt-2 flex flex-col gap-1">
                                  <div className="flex items-center justify-between gap-8">
                                    <span className="text-sm text-gray-400">
                                      Value:
                                    </span>
                                    <span className="font-medium text-white">
                                      {formatCurrency(
                                        payload[0].value as number
                                      )}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="value"
                        stroke="#60A5FA"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#netWorthGradient)"
                      />
                    </AreaChart>
                  </ChartContainer>
                </div>
              </div>
            </Card>

            {/* Portfolio Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card className="relative overflow-hidden border-none bg-gradient-to-br from-background via-background/80 to-background/50 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5" />
                  <div className="relative p-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-muted-foreground">
                        Total Value
                      </h3>
                      <DollarSign className="h-4 w-4 text-blue-500" />
                    </div>
                    <p className="text-2xl font-bold mt-2 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                      {formatCurrency(portfolioSummary.totalValue)}
                    </p>
                  </div>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="relative overflow-hidden border-none bg-gradient-to-br from-background via-background/80 to-background/50 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-blue-500/5" />
                  <div className="relative p-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-muted-foreground">
                        Daily Change
                      </h3>
                      {portfolioSummary.dailyChange >= 0 ? (
                        <ArrowUp className="h-4 w-4 text-emerald-500" />
                      ) : (
                        <ArrowDown className="h-4 w-4 text-red-500" />
                      )}
                    </div>
                    <div className="mt-2 flex items-baseline">
                      <p
                        className={`text-2xl font-bold ${
                          portfolioSummary.dailyChange >= 0
                            ? "text-emerald-500"
                            : "text-red-500"
                        }`}
                      >
                        {formatCurrency(Math.abs(portfolioSummary.dailyChange))}
                      </p>
                      <p
                        className={`ml-2 text-sm font-medium ${
                          portfolioSummary.dailyChange >= 0
                            ? "text-emerald-500/70"
                            : "text-red-500/70"
                        }`}
                      >
                        (
                        {Math.abs(portfolioSummary.dailyPercentChange).toFixed(
                          2
                        )}
                        %)
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card className="relative overflow-hidden border-none bg-gradient-to-br from-background via-background/80 to-background/50 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-emerald-500/5" />
                  <div className="relative p-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-muted-foreground">
                        Total Gain/Loss
                      </h3>
                      {portfolioSummary.totalGain >= 0 ? (
                        <ArrowUp className="h-4 w-4 text-emerald-500" />
                      ) : (
                        <ArrowDown className="h-4 w-4 text-red-500" />
                      )}
                    </div>
                    <div className="mt-2 flex items-baseline">
                      <p
                        className={`text-2xl font-bold ${
                          portfolioSummary.totalGain >= 0
                            ? "text-emerald-500"
                            : "text-red-500"
                        }`}
                      >
                        {formatCurrency(Math.abs(portfolioSummary.totalGain))}
                      </p>
                      <p
                        className={`ml-2 text-sm font-medium ${
                          portfolioSummary.totalGain >= 0
                            ? "text-emerald-500/70"
                            : "text-red-500/70"
                        }`}
                      >
                        (
                        {Math.abs(portfolioSummary.totalGainPercent).toFixed(2)}
                        %)
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </div>

            {/* Asset Allocation Chart */}
            <AssetAllocationChart />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Asset Allocation Chart Component
function AssetAllocationChart() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const assetAllocationData = [
    {
      name: "Stocks",
      value: 65,
      color: "#60A5FA",
      gradient: "from-blue-500 to-blue-600",
    },
    {
      name: "Crypto",
      value: 20,
      color: "#4ADE80",
      gradient: "from-emerald-500 to-emerald-600",
    },
    {
      name: "Cash",
      value: 15,
      color: "#F59E0B",
      gradient: "from-amber-500 to-amber-600",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <Card className="relative overflow-hidden border-none bg-gradient-to-br from-background via-background/80 to-background/50 shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-blue-500/5" />
        <div className="relative p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="space-y-1">
              <h3 className="text-lg font-semibold">Asset Allocation</h3>
              <p className="text-sm text-muted-foreground">
                Your portfolio distribution
              </p>
            </div>
            <PieChart className="h-5 w-5 text-blue-500" />
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="w-full md:w-2/3 h-[400px] flex items-center justify-center relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="text-center"
                >
                  <p className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                    100%
                  </p>
                  <p className="text-sm text-muted-foreground">Total Assets</p>
                </motion.div>
              </div>
              <ResponsiveContainer width="100%" height="100%">
                <ReChartsPieChart>
                  <defs>
                    {assetAllocationData.map((entry, index) => (
                      <linearGradient
                        key={`gradient-${index}`}
                        id={`gradient-${entry.name}`}
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="0%"
                          stopColor={entry.color}
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="100%"
                          stopColor={entry.color}
                          stopOpacity={1}
                        />
                      </linearGradient>
                    ))}
                  </defs>
                  <Pie
                    data={assetAllocationData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    innerRadius={80}
                    outerRadius={160}
                    paddingAngle={2}
                    dataKey="value"
                    onMouseEnter={(_, index) => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    strokeWidth={2}
                    stroke="rgba(255, 255, 255, 0.1)"
                  >
                    {assetAllocationData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={`url(#gradient-${entry.name})`}
                        opacity={
                          hoveredIndex === null || hoveredIndex === index
                            ? 1
                            : 0.6
                        }
                        className="transition-all duration-200 drop-shadow-lg"
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="rounded-lg border bg-black/80 backdrop-blur-sm p-3 shadow-xl">
                            <div className="text-sm font-medium text-white">
                              {data.name}
                            </div>
                            <div className="text-2xl font-bold text-white mt-1">
                              {data.value}%
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                </ReChartsPieChart>
              </ResponsiveContainer>
            </div>

            <div className="w-full md:w-1/3">
              <div className="space-y-4">
                {assetAllocationData.map((asset, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex flex-col p-4 rounded-lg bg-gradient-to-r hover:bg-gradient-to-br hover:shadow-lg transition-all duration-300"
                    style={{
                      backgroundImage:
                        hoveredIndex === index
                          ? `linear-gradient(to right, ${asset.color}15, ${asset.color}30)`
                          : "none",
                    }}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-3 h-3 rounded-full bg-gradient-to-r ${asset.gradient}`}
                        />
                        <span className="font-medium">{asset.name}</span>
                      </div>
                      <span className="font-bold text-lg">{asset.value}%</span>
                    </div>
                    <div className="w-full bg-muted/30 rounded-full h-2 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${asset.value}%` }}
                        transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                        className={`h-full bg-gradient-to-r ${asset.gradient}`}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
