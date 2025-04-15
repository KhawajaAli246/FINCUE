import React, { useState } from "react";
import {
  Bell,
  Info,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion, AnimatePresence } from "framer-motion";

interface Alert {
  id: string;
  type: "info" | "warning" | "success" | "error";
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
}

interface AlertsPanelProps {
  alerts: Alert[];
  onMarkAsRead: (id: string) => void;
  onDismiss: (id: string) => void;
  onDismissAll: () => void;
}

export function AlertsPanel({
  alerts,
  onMarkAsRead,
  onDismiss,
  onDismissAll,
}: AlertsPanelProps) {
  const [hoveredAlert, setHoveredAlert] = useState<string | null>(null);
  const unreadCount = alerts.filter((alert) => !alert.isRead).length;

  const alertTypeConfig = {
    info: {
      icon: Info,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/20",
      glowColor: "shadow-blue-500/20",
    },
    warning: {
      icon: AlertTriangle,
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10",
      borderColor: "border-yellow-500/20",
      glowColor: "shadow-yellow-500/20",
    },
    success: {
      icon: CheckCircle2,
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10",
      borderColor: "border-emerald-500/20",
      glowColor: "shadow-emerald-500/20",
    },
    error: {
      icon: XCircle,
      color: "text-red-500",
      bgColor: "bg-red-500/10",
      borderColor: "border-red-500/20",
      glowColor: "shadow-red-500/20",
    },
  };

  return (
    <Card className="relative overflow-hidden border-none bg-gradient-to-br from-background via-background/80 to-background/50 shadow-2xl">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5" />
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CardTitle className="flex items-center gap-2 text-2xl">
              <div className="relative">
                <Bell className="h-6 w-6" />
                {unreadCount > 0 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -right-1 -top-1 h-3 w-3"
                  >
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-500 opacity-75"></span>
                    <span className="relative inline-flex h-3 w-3 rounded-full bg-blue-500"></span>
                  </motion.div>
                )}
              </div>
              Alerts
            </CardTitle>
            {unreadCount > 0 && (
              <Badge
                variant="secondary"
                className="ml-2 bg-blue-500/10 text-blue-500"
              >
                {unreadCount} new
              </Badge>
            )}
          </div>
          {alerts.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onDismissAll}
              className="text-muted-foreground hover:text-foreground"
            >
              Clear all
            </Button>
          )}
        </div>
        <CardDescription className="text-base">
          Stay updated with important notifications
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          {alerts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center py-8 text-center"
            >
              <Bell className="h-12 w-12 text-muted-foreground/50" />
              <p className="mt-2 text-sm text-muted-foreground">
                No alerts at the moment
              </p>
            </motion.div>
          ) : (
            <div className="space-y-4">
              <AnimatePresence>
                {alerts.map((alert, index) => {
                  const config = alertTypeConfig[alert.type];
                  const AlertIcon = config.icon;
                  const isHovered = hoveredAlert === alert.id;

                  return (
                    <motion.div
                      key={alert.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{
                        duration: 0.2,
                        delay: index * 0.05,
                      }}
                      onHoverStart={() => setHoveredAlert(alert.id)}
                      onHoverEnd={() => setHoveredAlert(null)}
                      className={cn(
                        "group relative overflow-hidden rounded-lg border backdrop-blur-sm transition-all",
                        config.bgColor,
                        config.borderColor,
                        isHovered && "scale-[1.02]",
                        !alert.isRead && config.glowColor,
                        !alert.isRead && "shadow-lg"
                      )}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:animate-shimmer" />
                      <div className="relative p-4">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-start gap-4">
                            <div
                              className={cn(
                                "rounded-full p-1",
                                config.bgColor,
                                config.color
                              )}
                            >
                              <AlertIcon className="h-4 w-4" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="font-medium leading-none tracking-tight">
                                  {alert.title}
                                </h4>
                                {!alert.isRead && (
                                  <motion.span
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="flex h-2 w-2 rounded-full bg-blue-500"
                                  />
                                )}
                              </div>
                              <p className="mt-1 text-sm text-muted-foreground">
                                {alert.message}
                              </p>
                              <p className="mt-2 text-xs text-muted-foreground">
                                {alert.timestamp}
                              </p>
                            </div>
                          </div>
                          <div
                            className={cn(
                              "flex items-center gap-2 transition-opacity",
                              isHovered ? "opacity-100" : "opacity-0"
                            )}
                          >
                            {!alert.isRead && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => onMarkAsRead(alert.id)}
                                className={cn(
                                  "h-8 hover:bg-white/10",
                                  config.color
                                )}
                              >
                                Mark as read
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => onDismiss(alert.id)}
                              className="h-8 w-8 hover:bg-white/10"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
