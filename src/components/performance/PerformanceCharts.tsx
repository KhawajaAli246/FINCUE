import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  TooltipProps,
} from "recharts";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, Activity } from "lucide-react";

interface PerformanceData {
  date: string;
  value: number;
  change: number;
  benchmark: number;
}

interface PerformanceChartsProps {
  data: PerformanceData[];
}

interface CustomTooltipProps extends TooltipProps<number, string> {
  active?: boolean;
  payload?: Array<{
    value: number;
    payload: PerformanceData;
  }>;
  label?: string;
}

export function PerformanceCharts({ data }: PerformanceChartsProps) {
  const [timeframe, setTimeframe] = useState<"1M" | "3M" | "6M" | "1Y" | "ALL">(
    "1M"
  );
  const [chartType, setChartType] = useState<"line" | "area">("area");
  const [isAnimating, setIsAnimating] = useState(true);

  const timeframes = {
    "1M": 30,
    "3M": 90,
    "6M": 180,
    "1Y": 365,
    ALL: data.length,
  };

  const filteredData = data.slice(-timeframes[timeframe]);

  // Calculate performance metrics
  const latestValue = filteredData[filteredData.length - 1]?.value || 0;
  const oldestValue = filteredData[0]?.value || 0;
  const totalChange = ((latestValue - oldestValue) / oldestValue) * 100;
  const isPositive = totalChange > 0;

  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 800);
    return () => clearTimeout(timer);
  }, [timeframe, chartType]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatPercentage = (value: number) => {
    return new Intl.NumberFormat("en", {
      style: "percent",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value / 100);
  };

  const getGradient = (color: string) => {
    return (
      <defs>
        <linearGradient id={`gradient-${color}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity={0.2} />
          <stop offset="100%" stopColor={color} stopOpacity={0} />
        </linearGradient>
      </defs>
    );
  };

  const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-lg border bg-black/80 backdrop-blur-sm p-3 shadow-xl">
          <div className="text-sm font-medium text-white">{label}</div>
          <div className="mt-2 flex flex-col gap-1">
            <div className="flex items-center justify-between gap-8">
              <span className="text-sm text-gray-400">Portfolio:</span>
              <span className="font-medium text-white">
                {formatCurrency(payload[0].value)}
              </span>
            </div>
            <div className="flex items-center justify-between gap-8">
              <span className="text-sm text-gray-400">Benchmark:</span>
              <span className="font-medium text-white">
                {formatCurrency(payload[1].value)}
              </span>
            </div>
            <div className="flex items-center justify-between gap-8">
              <span className="text-sm text-gray-400">Change:</span>
              <span
                className={cn(
                  "font-medium",
                  payload[0].payload.change > 0
                    ? "text-emerald-400"
                    : "text-red-400"
                )}
              >
                {formatPercentage(payload[0].payload.change)}
              </span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-4">
      <Card className="relative overflow-hidden border-none bg-gradient-to-br from-background via-background/80 to-background/50 shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-blue-500/5" />
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Activity className="h-6 w-6 text-emerald-500" />
                Portfolio Performance
              </CardTitle>
              <CardDescription className="text-base">
                Compare your returns with the benchmark
              </CardDescription>
              <div
                className={cn(
                  "flex items-center gap-2 text-sm transition-opacity duration-500",
                  isAnimating ? "opacity-0" : "opacity-100"
                )}
              >
                <span
                  className={cn(
                    "inline-flex items-center gap-1 rounded-full px-3 py-1",
                    isPositive
                      ? "bg-emerald-500/10 text-emerald-500"
                      : "bg-red-500/10 text-red-500"
                  )}
                >
                  {isPositive ? (
                    <TrendingUp className="h-4 w-4" />
                  ) : (
                    <TrendingDown className="h-4 w-4" />
                  )}
                  {formatPercentage(totalChange / 100)}
                </span>
                <span className="text-muted-foreground">
                  in the selected period
                </span>
              </div>
            </div>
            <div className="flex flex-col items-end gap-4">
              <Tabs
                value={chartType}
                onValueChange={(v) => setChartType(v as "line" | "area")}
                className="bg-black/20 backdrop-blur-sm rounded-lg p-1"
              >
                <TabsList className="bg-transparent border">
                  <TabsTrigger
                    value="area"
                    className="data-[state=active]:bg-white/10"
                  >
                    Area
                  </TabsTrigger>
                  <TabsTrigger
                    value="line"
                    className="data-[state=active]:bg-white/10"
                  >
                    Line
                  </TabsTrigger>
                </TabsList>
              </Tabs>
              <div className="flex items-center rounded-lg border bg-black/20 backdrop-blur-sm p-1">
                {Object.keys(timeframes).map((tf) => (
                  <Button
                    key={tf}
                    variant={timeframe === tf ? "secondary" : "ghost"}
                    className={cn(
                      "h-8 w-12",
                      timeframe === tf && "bg-white/10 text-primary"
                    )}
                    onClick={() => setTimeframe(tf as keyof typeof timeframes)}
                  >
                    {tf}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div
            className={cn(
              "h-[400px] transition-opacity duration-500",
              isAnimating ? "opacity-0" : "opacity-100"
            )}
          >
            <ResponsiveContainer width="100%" height="100%">
              {chartType === "area" ? (
                <AreaChart
                  data={filteredData}
                  margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                >
                  {getGradient("#10B981")}
                  {getGradient("#6B7280")}
                  <CartesianGrid
                    strokeDasharray="3 3"
                    className="stroke-muted/30"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="date"
                    tickLine={false}
                    axisLine={false}
                    className="text-xs text-muted-foreground/50"
                    tick={{ fill: "currentColor" }}
                  />
                  <YAxis
                    tickFormatter={formatCurrency}
                    tickLine={false}
                    axisLine={false}
                    className="text-xs text-muted-foreground/50"
                    tick={{ fill: "currentColor" }}
                  />
                  <Tooltip
                    content={<CustomTooltip />}
                    cursor={{
                      stroke: "#fff",
                      strokeWidth: 1,
                      strokeDasharray: "4 4",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#10B981"
                    strokeWidth={2}
                    fill="url(#gradient-#10B981)"
                    dot={false}
                    activeDot={{ r: 6, strokeWidth: 2, stroke: "#fff" }}
                  />
                  <Area
                    type="monotone"
                    dataKey="benchmark"
                    stroke="#6B7280"
                    strokeWidth={2}
                    fill="url(#gradient-#6B7280)"
                    dot={false}
                    activeDot={{ r: 6, strokeWidth: 2, stroke: "#fff" }}
                  />
                </AreaChart>
              ) : (
                <LineChart
                  data={filteredData}
                  margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    className="stroke-muted/30"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="date"
                    tickLine={false}
                    axisLine={false}
                    className="text-xs text-muted-foreground/50"
                    tick={{ fill: "currentColor" }}
                  />
                  <YAxis
                    tickFormatter={formatCurrency}
                    tickLine={false}
                    axisLine={false}
                    className="text-xs text-muted-foreground/50"
                    tick={{ fill: "currentColor" }}
                  />
                  <Tooltip
                    content={<CustomTooltip />}
                    cursor={{
                      stroke: "#fff",
                      strokeWidth: 1,
                      strokeDasharray: "4 4",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#10B981"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 6, strokeWidth: 2, stroke: "#fff" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="benchmark"
                    stroke="#6B7280"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 6, strokeWidth: 2, stroke: "#fff" }}
                  />
                </LineChart>
              )}
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
