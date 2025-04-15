import { useState, useEffect } from "react";
import { Bell, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface Notification {
  id: string;
  title: string;
  description: string;
  time: string;
  read: boolean;
  type: "alert" | "update" | "system";
}

export function NotificationsDropdown() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "Price Alert",
      description: "AAPL has reached your target price of $180",
      time: "10 mins ago",
      read: false,
      type: "alert",
    },
    {
      id: "2",
      title: "Dividend Payment",
      description: "You received a dividend payment of $125.50",
      time: "2 hours ago",
      read: false,
      type: "update",
    },
    {
      id: "3",
      title: "Market Update",
      description: "Market closed with S&P 500 up 1.2%",
      time: "Yesterday",
      read: true,
      type: "system",
    },
  ]);

  const [isOpen, setIsOpen] = useState(false);
  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, read: true }))
    );
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "alert":
        return "text-yellow-500";
      case "update":
        return "text-emerald-500";
      case "system":
        return "text-blue-500";
      default:
        return "text-foreground";
    }
  };

  const getNotificationBg = (type: string) => {
    switch (type) {
      case "alert":
        return "bg-yellow-500/10";
      case "update":
        return "bg-emerald-500/10";
      case "system":
        return "bg-blue-500/10";
      default:
        return "bg-foreground/10";
    }
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative hover:bg-transparent"
          aria-label="Notifications"
        >
          <motion.div
            initial={false}
            animate={isOpen ? { rotate: [0, -15, 15, -15, 15, 0] } : {}}
            transition={{ duration: 0.5 }}
          >
            <Bell className="h-5 w-5" />
          </motion.div>
          <AnimatePresence>
            {unreadCount > 0 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="absolute -top-1 -right-1"
              >
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-80 backdrop-blur-sm bg-background/95 border-none shadow-2xl"
      >
        <DropdownMenuLabel className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold">Notifications</span>
            {unreadCount > 0 && (
              <motion.span
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-500/10 text-blue-500"
              >
                {unreadCount} new
              </motion.span>
            )}
          </div>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="h-auto p-0 text-xs text-blue-500 font-medium hover:text-blue-600 hover:bg-transparent"
              onClick={markAllAsRead}
            >
              Mark all as read
            </Button>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-foreground/10" />

        <div className="max-h-[300px] overflow-y-auto">
          <DropdownMenuGroup>
            <AnimatePresence>
              {notifications.length > 0 ? (
                notifications.map((notification, index) => (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <DropdownMenuItem
                      className={cn(
                        "flex flex-col items-start p-3 cursor-pointer gap-1 relative group",
                        !notification.read &&
                          getNotificationBg(notification.type),
                        "hover:bg-foreground/5"
                      )}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="flex justify-between w-full items-start">
                        <span
                          className={cn(
                            "font-medium",
                            getNotificationColor(notification.type)
                          )}
                        >
                          {notification.title}
                        </span>
                        <span className="text-xs text-muted-foreground ml-2">
                          {notification.time}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {notification.description}
                      </p>
                      {!notification.read && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className={cn(
                            "absolute top-3 right-3 w-2 h-2 rounded-full",
                            getNotificationColor(notification.type)
                          )}
                        />
                      )}
                      <motion.div
                        initial={false}
                        animate={{ opacity: 1 }}
                        className="absolute right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 hover:bg-foreground/10"
                          onClick={(e) => {
                            e.stopPropagation();
                            setNotifications((prev) =>
                              prev.filter((n) => n.id !== notification.id)
                            );
                          }}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </motion.div>
                    </DropdownMenuItem>
                  </motion.div>
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="py-6 text-center text-muted-foreground"
                >
                  <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  No notifications yet
                </motion.div>
              )}
            </AnimatePresence>
          </DropdownMenuGroup>
        </div>

        <DropdownMenuSeparator className="bg-foreground/10" />
        <DropdownMenuItem className="justify-center text-sm text-blue-500 cursor-pointer hover:text-blue-600 hover:bg-blue-500/5">
          View all notifications
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
