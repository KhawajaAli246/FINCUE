
import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Asset } from "@/types/asset";
import { CurrencyValue } from "@/components/ui/currency-value";
import { PercentValue } from "@/components/ui/percent-value";

interface AssetRowProps {
  asset: Asset;
}

export function AssetRow({ asset }: AssetRowProps) {
  const currentValue = asset.quantity * asset.currentPrice;
  const costBasis = asset.quantity * asset.avgBuyPrice;
  const profitLoss = currentValue - costBasis;
  const profitLossPercent = (profitLoss / costBasis) * 100;

  return (
    <TableRow className="hover:bg-muted/80">
      <TableCell>
        <div className="flex items-center space-x-3">
          {asset.logoUrl ? (
            <img 
              src={asset.logoUrl} 
              alt={asset.name}
              className="h-8 w-8 rounded-full object-contain bg-white p-1"
            />
          ) : (
            <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
              <span className="text-xs font-medium">{asset.ticker.substring(0, 2)}</span>
            </div>
          )}
          <div>
            <div className="font-medium">{asset.name}</div>
            <div className="text-sm text-muted-foreground">{asset.ticker}</div>
          </div>
        </div>
      </TableCell>
      <TableCell>{asset.quantity}</TableCell>
      <TableCell>
        <CurrencyValue value={asset.avgBuyPrice} />
      </TableCell>
      <TableCell>
        <CurrencyValue value={asset.currentPrice} />
      </TableCell>
      <TableCell>
        <CurrencyValue value={currentValue} className="font-medium" />
      </TableCell>
      <TableCell>
        <div className="flex flex-col items-end">
          <CurrencyValue value={profitLoss} showIcon={true} showSign={true} />
          <PercentValue value={profitLossPercent} className="text-xs" iconSize={12} />
        </div>
      </TableCell>
      {asset.sector && (
        <TableCell className="text-right">
          <span className="px-2 py-1 rounded-full text-xs bg-muted">
            {asset.sector}
          </span>
        </TableCell>
      )}
    </TableRow>
  );
}
