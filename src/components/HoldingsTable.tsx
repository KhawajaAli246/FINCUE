import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Asset, assetsData, AssetType } from "@/types/asset";
import { AssetListHeader } from "@/components/holdings/AssetListHeader";
import { AssetRow } from "@/components/holdings/AssetRow";

export function HoldingsTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [assetType, setAssetType] = useState<string | null>(null);

  // Filter assets based on search term and asset type
  const filteredAssets = assetsData.filter((asset) => {
    const matchesSearch =
      asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.ticker.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = assetType ? asset.type === assetType : true;
    return matchesSearch && matchesType;
  });

  // Calculate portfolio totals
  const totalValue = filteredAssets.reduce(
    (sum, asset) => sum + asset.quantity * asset.currentPrice,
    0
  );
  const totalCost = filteredAssets.reduce(
    (sum, asset) => sum + asset.quantity * asset.avgBuyPrice,
    0
  );
  const totalProfitLoss = totalValue - totalCost;
  const totalProfitLossPercent =
    totalCost > 0 ? (totalProfitLoss / totalCost) * 100 : 0;

  const formatCurrency = (value: number) => {
    return `$${value.toLocaleString()}`;
  };

  return (
    <Card className="overflow-hidden">
      <AssetListHeader
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        assetType={assetType}
        setAssetType={setAssetType}
      />

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Asset</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Avg. Price</TableHead>
              <TableHead>Current Price</TableHead>
              <TableHead>Value</TableHead>
              <TableHead>P&L ($/%)</TableHead>
              <TableHead className="text-right">Sector</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAssets.map((asset) => (
              <AssetRow key={asset.id} asset={asset} />
            ))}

            {/* Summary row */}
            <TableRow className="bg-muted font-medium">
              <TableCell>Portfolio Total</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell className="font-semibold">
                {formatCurrency(totalValue)}
              </TableCell>
              <TableCell>
                <div className="flex flex-col items-end">
                  <span
                    className={
                      totalProfitLoss >= 0 ? "text-emerald-500" : "text-red-500"
                    }
                  >
                    {totalProfitLoss >= 0 ? "+" : ""}
                    {formatCurrency(totalProfitLoss)}
                  </span>
                  <span
                    className={`text-xs ${
                      totalProfitLossPercent >= 0
                        ? "text-emerald-500"
                        : "text-red-500"
                    }`}
                  >
                    {totalProfitLossPercent >= 0 ? "+" : ""}
                    {totalProfitLossPercent.toFixed(2)}%
                  </span>
                </div>
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}
