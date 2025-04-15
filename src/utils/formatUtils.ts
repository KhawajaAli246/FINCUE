/**
 * Format a number as Indian Rupee currency
 */
export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
};

/**
 * Format a date string into a readable format
 */
export const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

/**
 * Format a number as a percentage
 */
export const formatPercent = (value: number) => {
  return `${value.toFixed(2)}%`;
};

/**
 * Get color class based on numeric value (positive/negative)
 */
export const getValueColorClass = (value: number) => {
  return value >= 0 ? "text-emerald-500" : "text-red-500";
};

/**
 * Format large numbers with K/M/B suffixes
 */
export const formatCompactNumber = (value: number) => {
  if (value >= 1000000000) {
    return `$${(value / 1000000000).toFixed(1)}B`;
  } else if (value >= 1000000) {
    return `$${(value / 1000000).toFixed(1)}M`;
  } else if (value >= 1000) {
    return `$${(value / 1000).toFixed(0)}K`;
  }
  return `$${value}`;
};
