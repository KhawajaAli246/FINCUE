import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

// Mock data for performance charts
const performanceData = [
  { date: "Jan", portfolio: 125000, benchmark: 120000 },
  { date: "Feb", portfolio: 128000, benchmark: 123000 },
  { date: "Mar", portfolio: 126000, benchmark: 125000 },
  { date: "Apr", portfolio: 132000, benchmark: 127000 },
  { date: "May", portfolio: 138000, benchmark: 130000 },
  { date: "Jun", portfolio: 135000, benchmark: 132000 },
  { date: "Jul", portfolio: 145000, benchmark: 135000 },
  { date: "Aug", portfolio: 148000, benchmark: 138000 },
  { date: "Sep", portfolio: 151000, benchmark: 140000 },
  { date: "Oct", portfolio: 156000, benchmark: 143000 },
  { date: "Nov", portfolio: 163000, benchmark: 146000 },
  { date: "Dec", portfolio: 170000, benchmark: 150000 },
];

// Mock data for candlestick chart
const candlestickData = [
  { date: "Jan", open: 122000, close: 125000, high: 126000, low: 121000 },
  { date: "Feb", open: 125000, close: 128000, high: 129000, low: 124000 },
  { date: "Mar", open: 128000, close: 126000, high: 130000, low: 125000 },
  { date: "Apr", open: 126000, close: 132000, high: 133000, low: 126000 },
  { date: "May", open: 132000, close: 138000, high: 139000, low: 131000 },
  { date: "Jun", open: 138000, close: 135000, high: 140000, low: 134000 },
  { date: "Jul", open: 135000, close: 145000, high: 146000, low: 135000 },
  { date: "Aug", open: 145000, close: 148000, high: 149000, low: 144000 },
  { date: "Sep", open: 148000, close: 151000, high: 152000, low: 147000 },
  { date: "Oct", open: 151000, close: 156000, high: 157000, low: 150000 },
  { date: "Nov", open: 156000, close: 163000, high: 164000, low: 155000 },
  { date: "Dec", open: 163000, close: 170000, high: 172000, low: 162000 },
];

// Time range options
const timeRanges = [
  { id: "1D", label: "1D" },
  { id: "1W", label: "1W" },
  { id: "1M", label: "1M" },
  { id: "6M", label: "6M" },
  { id: "1Y", label: "1Y" },
  { id: "ALL", label: "All" },
];

export const PerformanceCharts: React.FC = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState("1Y");
  const [selectedAsset, setSelectedAsset] = useState("Portfolio");
  const [showIndicators, setShowIndicators] = useState(false);

  // Format the tooltip value
  const formatTooltipValue = (value: number) => {
    return `$${value.toLocaleString()}`;
  };

  // Function to determine bar fill color based on entry
  const getBarFillColor = (entry: any) => {
    return entry.close >= entry.open ? "#4ADE80" : "#EF4444";
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-wrap justify-between items-center gap-4">
        <h2 className="text-2xl font-bold tracking-tight">
          Performance Charts
        </h2>
        <div className="flex flex-wrap items-center gap-3">
          <Select value={selectedAsset} onValueChange={setSelectedAsset}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Asset" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Portfolio">Portfolio</SelectItem>
              <SelectItem value="AAPL">Apple (AAPL)</SelectItem>
              <SelectItem value="MSFT">Microsoft (MSFT)</SelectItem>
              <SelectItem value="AMZN">Amazon (AMZN)</SelectItem>
              <SelectItem value="BTC">Bitcoin (BTC)</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex bg-muted rounded-lg p-1">
            {timeRanges.map((range) => (
              <Button
                key={range.id}
                variant="ghost"
                size="sm"
                onClick={() => setSelectedTimeRange(range.id)}
                className={cn(
                  "rounded-md min-w-[40px]",
                  selectedTimeRange === range.id && "bg-background shadow-sm"
                )}
              >
                {range.label}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <Card className="portfolio-card">
        <Tabs defaultValue="line">
          <div className="flex justify-between items-center mb-6">
            <TabsList>
              <TabsTrigger value="line">Line</TabsTrigger>
              <TabsTrigger value="area">Area</TabsTrigger>
              <TabsTrigger value="candle">Candlestick</TabsTrigger>
              <TabsTrigger value="bar">Bar</TabsTrigger>
            </TabsList>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowIndicators(!showIndicators)}
              className={cn(showIndicators && "bg-muted")}
            >
              {showIndicators ? "Hide Indicators" : "Show Indicators"}
            </Button>
          </div>

          <TabsContent value="line" className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={performanceData}
                margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
                <XAxis dataKey="date" />
                <YAxis />
                {showIndicators && (
                  <YAxis
                    yAxisId="ma"
                    orientation="right"
                    stroke="#4ADE80"
                    hide
                  />
                )}
                <Tooltip formatter={formatTooltipValue} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="portfolio"
                  stroke="#60A5FA"
                  strokeWidth={2}
                  activeDot={{ r: 6 }}
                  name="Portfolio"
                />
                <Line
                  type="monotone"
                  dataKey="benchmark"
                  stroke="#94A3B8"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  activeDot={{ r: 6 }}
                  name="Benchmark"
                />
                {showIndicators && (
                  <Line
                    type="monotone"
                    dataKey="portfolio"
                    stroke="#4ADE80"
                    strokeWidth={2}
                    dot={false}
                    activeDot={false}
                    name="50-Day MA"
                    connectNulls
                    yAxisId="ma"
                    data={performanceData.map((entry) => ({
                      ...entry,
                      portfolio: entry.portfolio * 0.98,
                    }))}
                  />
                )}
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>

          <TabsContent value="area" className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={performanceData}
                margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip formatter={formatTooltipValue} />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="portfolio"
                  stroke="#60A5FA"
                  fill="#60A5FA33"
                  fillOpacity={0.3}
                  strokeWidth={2}
                  name="Portfolio"
                />
                <Area
                  type="monotone"
                  dataKey="benchmark"
                  stroke="#94A3B8"
                  fill="#94A3B833"
                  fillOpacity={0.1}
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  name="Benchmark"
                />
              </AreaChart>
            </ResponsiveContainer>
          </TabsContent>

          <TabsContent value="candle" className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={candlestickData}
                margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
                <XAxis dataKey="date" />
                <YAxis domain={["dataMin - 10000", "dataMax + 10000"]} />
                {showIndicators && (
                  <>
                    <YAxis yAxisId="resistance" orientation="right" hide />
                    <YAxis yAxisId="support" orientation="right" hide />
                  </>
                )}
                <Tooltip
                  formatter={formatTooltipValue}
                  labelFormatter={(label) => `Date: ${label}`}
                />
                <Legend />
                <Bar
                  dataKey="low"
                  fill="transparent"
                  stroke="#64748B"
                  name="Low-High Range"
                  stackId="a"
                  barSize={20}
                >
                  {candlestickData.map((entry, index) => (
                    <rect
                      key={`rect-${index}`}
                      x={0}
                      y={0}
                      width={20}
                      height={entry.high - entry.low}
                    />
                  ))}
                </Bar>
                <Bar
                  dataKey={(entry) =>
                    entry.close > entry.open
                      ? entry.close - entry.open
                      : entry.open - entry.close
                  }
                  fill="#CCCCCC"
                  fillOpacity={0.8}
                  stroke="#888888"
                  name="Open-Close Range"
                  stackId="b"
                  barSize={10}
                  isAnimationActive={false}
                  shape={(props: any) => {
                    const { x, y, width, height, fill, index } = props;
                    const entry = candlestickData[index];
                    const color = getBarFillColor(entry);
                    return (
                      <rect
                        x={x}
                        y={y}
                        width={width}
                        height={height}
                        fill={color}
                        stroke={color}
                      />
                    );
                  }}
                />

                {showIndicators && (
                  <Line
                    type="monotone"
                    dataKey="high"
                    stroke="#EF4444"
                    strokeWidth={1}
                    strokeDasharray="3 3"
                    dot={false}
                    name="Resistance"
                    yAxisId="resistance"
                    data={candlestickData.map((entry) => ({
                      ...entry,
                      date: entry.date,
                      high: 145000,
                    }))}
                  />
                )}

                {showIndicators && (
                  <Line
                    type="monotone"
                    dataKey="low"
                    stroke="#4ADE80"
                    strokeWidth={1}
                    strokeDasharray="3 3"
                    dot={false}
                    name="Support"
                    yAxisId="support"
                    data={candlestickData.map((entry) => ({
                      ...entry,
                      date: entry.date,
                      low: 130000,
                    }))}
                  />
                )}
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>

          <TabsContent value="bar" className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={performanceData}
                margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
                <XAxis dataKey="date" />
                <YAxis />
                {showIndicators && (
                  <YAxis yAxisId="trend" orientation="right" hide />
                )}
                <Tooltip formatter={formatTooltipValue} />
                <Legend />
                <Bar
                  dataKey="portfolio"
                  fill="#60A5FA"
                  name="Portfolio"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="benchmark"
                  fill="#94A3B8"
                  name="Benchmark"
                  radius={[4, 4, 0, 0]}
                />

                {showIndicators && (
                  <Line
                    type="monotone"
                    dataKey="portfolio"
                    stroke="#4ADE80"
                    strokeWidth={2}
                    dot={false}
                    name="Trend"
                    yAxisId="trend"
                  />
                )}
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </Card>

      {showIndicators && (
        <Card className="portfolio-card p-6">
          <h3 className="text-lg font-medium mb-4">Technical Indicators</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <div className="flex flex-col gap-1">
              <span className="text-sm text-muted-foreground">RSI (14)</span>
              <span className="text-lg font-medium">58.34</span>
              <span className="text-xs text-muted-foreground">Neutral</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-sm text-muted-foreground">
                MACD (12,26,9)
              </span>
              <span className="text-lg font-medium text-success">+2.45</span>
              <span className="text-xs text-muted-foreground">Bullish</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-sm text-muted-foreground">50-Day MA</span>
              <span className="text-lg font-medium">$145,620</span>
              <span className="text-xs text-success">Above Price</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-sm text-muted-foreground">200-Day MA</span>
              <span className="text-lg font-medium">$132,150</span>
              <span className="text-xs text-success">Above Price</span>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};
