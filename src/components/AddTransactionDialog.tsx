import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import DatePicker from "@/components/ui/datepicker";

// Define form schema
const transactionSchema = z.object({
  asset: z.string().min(1, "Asset is required"),
  ticker: z.string().min(1, "Ticker is required"),
  type: z.enum(["Buy", "Sell"]),
  quantity: z
    .string()
    .min(1, "Quantity is required")
    .refine(
      (val) => !isNaN(Number(val)) && Number(val) > 0,
      "Quantity must be a positive number"
    ),
  price: z
    .string()
    .min(1, "Price is required")
    .refine(
      (val) => !isNaN(Number(val)) && Number(val) > 0,
      "Price must be a positive number"
    ),
  date: z.string().min(1, "Date is required"),
  assetType: z.enum(["Crypto", "Stock", "ETF", "Other"], {
    required_error: "Asset type is required",
  }),
});

type TransactionFormValues = z.infer<typeof transactionSchema>;

export function AddTransactionDialog() {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  // Initialize form
  const form = useForm<TransactionFormValues>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      asset: "",
      ticker: "",
      type: "Buy",
      quantity: "",
      price: "",
      date: new Date().toISOString().split("T")[0],
      assetType: "Stock", // Default value for asset type
    },
  });

  function onSubmit(data: TransactionFormValues) {
    // Calculate transaction value
    const quantity = Number(data.quantity);
    const price = Number(data.price);
    const value = quantity * price;

    // Show success toast
    toast({
      title: "Transaction Added",
      description: `${data.type} ${quantity} ${
        data.ticker
      } at ${new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      }).format(price)} each (${new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      }).format(value)} total)`,
    });

    // Reset form and close dialog
    form.reset();
    setOpen(false);
  }

  // Sample asset suggestions
  const assetSuggestions = [
    { name: "Apple Inc.", ticker: "AAPL" },
    { name: "Microsoft Corporation", ticker: "MSFT" },
    { name: "Amazon.com Inc.", ticker: "AMZN" },
    { name: "Tesla Inc.", ticker: "TSLA" },
    { name: "NVIDIA Corporation", ticker: "NVDA" },
    { name: "Bitcoin", ticker: "BTC" },
    { name: "Ethereum", ticker: "ETH" },
  ];

  // Auto-fill ticker when asset is selected
  const handleAssetChange = (selectedAsset: string) => {
    const asset = assetSuggestions.find((a) => a.name === selectedAsset);
    if (asset) {
      form.setValue("ticker", asset.ticker);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="button-glow bg-primary text-primary-foreground">
          <Plus className="mr-1 h-4 w-4" />
          <span className="hidden sm:inline">Add Transaction</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="glass-effect sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/50">
            Add New Transaction
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Enter the details of your transaction below.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground/80">
                      Transaction Type
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="glass-effect">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Buy">Buy</SelectItem>
                        <SelectItem value="Sell">Sell</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground/80">Date</FormLabel>
                    <FormControl>
                      <DatePicker />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="assetType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground/80">
                      Asset Type
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="glass-effect">
                          <SelectValue placeholder="Select asset type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Crypto">Crypto</SelectItem>
                        <SelectItem value="Stock">Stock</SelectItem>
                        <SelectItem value="ETF">ETF</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="ticker"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground/80">Ticker</FormLabel>
                    <FormControl>
                      <Input {...field} className="glass-effect" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="asset"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground/80">
                      Asset Name
                    </FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        handleAssetChange(value);
                      }}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="glass-effect">
                          <SelectValue placeholder="Select asset" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {assetSuggestions.map((asset) => (
                          <SelectItem key={asset.ticker} value={asset.name}>
                            {asset.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground/80">
                      Quantity
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="0"
                        step="any"
                        {...field}
                        className="glass-effect"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground/80">
                      Price per unit ($)
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="0"
                        step="any"
                        {...field}
                        className="glass-effect"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="pt-2">
              <FormDescription className="text-lg font-medium">
                Total Value:{" "}
                <span className="text-primary">
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                    maximumFractionDigits: 0,
                  }).format(
                    (form.watch("quantity")
                      ? Number(form.watch("quantity"))
                      : 0) *
                      (form.watch("price") ? Number(form.watch("price")) : 0)
                  )}
                </span>
              </FormDescription>
            </div>

            <DialogFooter className="gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                className="button-glow"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="button-glow bg-primary text-primary-foreground"
              >
                Add Transaction
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
