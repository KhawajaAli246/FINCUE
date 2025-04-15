
import React from "react";
import { Calendar, CreditCard, DollarSign, TrendingUp, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert } from "@/types/alert";
import { formatDate } from "@/utils/formatUtils";

interface AlertItemProps {
  alert: Alert;
  onDismiss: (id: number) => void;
}

export function AlertItem({ alert, onDismiss }: AlertItemProps) {
  const getAlertIcon = () => {
    switch (alert.type) {
      case "price_target":
        return <TrendingUp className="h-4 w-4" />;
      case "earning":
        return <DollarSign className="h-4 w-4" />;
      case "dividend":
        return <CreditCard className="h-4 w-4" />;
      default:
        return <Calendar className="h-4 w-4" />;
    }
  };

  const getStatusVariant = () => {
    switch (alert.status) {
      case "active":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      case "triggered":
        return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
      case "expired":
        return "bg-gray-500/10 text-gray-500 border-gray-500/20";
      default:
        return "bg-blue-500/10 text-blue-500 border-blue-500/20";
    }
  };

  return (
    <div className="flex justify-between items-start p-4 border-b last:border-b-0">
      <div className="flex gap-3 items-start">
        <div className="p-2 rounded-full bg-muted">
          {getAlertIcon()}
        </div>
        <div>
          <h4 className="font-medium">{alert.title}</h4>
          <p className="text-sm text-muted-foreground mt-1">{alert.description}</p>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-xs text-muted-foreground">{formatDate(alert.date)}</span>
            <Badge variant="outline" className={getStatusVariant()}>
              {alert.status}
            </Badge>
          </div>
        </div>
      </div>
      <Button 
        variant="ghost" 
        size="icon" 
        className="h-8 w-8 mt-1"
        onClick={() => onDismiss(alert.id)}
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
}
