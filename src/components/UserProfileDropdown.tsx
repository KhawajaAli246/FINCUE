import {
  ChevronDown,
  User,
  Settings,
  HelpCircle,
  LogOut,
  CreditCard,
  Bell,
} from "lucide-react";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface UserProfileDropdownProps {
  userName?: string;
  userEmail?: string;
  userImage?: string;
}

const menuItems = [
  {
    icon: User,
    label: "My Profile",
    href: "/profile?tab=profile",
    color: "text-blue-500",
  },
  {
    icon: Settings,
    label: "Account Settings",
    href: "/profile?tab=settings",
    color: "text-emerald-500",
  },
  {
    icon: CreditCard,
    label: "Billing",
    href: "/profile?tab=billing",
    color: "text-purple-500",
  },
  {
    icon: Bell,
    label: "Notification Settings",
    href: "/profile?tab=notifications",
    color: "text-yellow-500",
  },
  {
    icon: HelpCircle,
    label: "Help & Support",
    href: "/profile?tab=help",
    color: "text-blue-400",
  },
];

export function UserProfileDropdown({
  userName = "John Doe",
  userEmail = "john.doe@example.com",
  userImage = "",
}: UserProfileDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative flex items-center gap-2 hover:bg-transparent p-1 group"
        >
          <div className="relative">
            <Avatar className="w-8 h-8 ring-2 ring-offset-2 ring-offset-background ring-primary/10 group-hover:ring-primary/20 transition-all duration-300">
              <AvatarImage src={userImage} alt={userName} />
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                {userName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <motion.div
              initial={false}
              animate={isOpen ? { rotate: 180 } : { rotate: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-background"
            />
          </div>
          <motion.div
            initial={false}
            animate={isOpen ? { rotate: 180 } : { rotate: 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="h-4 w-4 hidden sm:block text-muted-foreground" />
          </motion.div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-56 p-2 backdrop-blur-sm bg-background/95 border-none shadow-2xl"
      >
        <DropdownMenuLabel className="font-normal p-2">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col space-y-1"
          >
            <p className="font-medium text-sm">{userName}</p>
            <p className="text-xs text-muted-foreground">{userEmail}</p>
          </motion.div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-foreground/10" />
        <DropdownMenuGroup>
          <AnimatePresence>
            {menuItems.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                onHoverStart={() => setHoveredItem(item.label)}
                onHoverEnd={() => setHoveredItem(null)}
              >
                <DropdownMenuItem asChild>
                  <Link
                    to={item.href}
                    className="flex items-center p-2 cursor-pointer rounded-md relative group"
                  >
                    <motion.div
                      initial={false}
                      animate={{
                        scale: hoveredItem === item.label ? 1.1 : 1,
                      }}
                      className={cn("mr-2", item.color)}
                    >
                      <item.icon className="h-4 w-4" />
                    </motion.div>
                    <span>{item.label}</span>
                    {hoveredItem === item.label && (
                      <motion.div
                        layoutId="highlight"
                        className="absolute inset-0 rounded-md bg-foreground/5 -z-10"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      />
                    )}
                  </Link>
                </DropdownMenuItem>
              </motion.div>
            ))}
          </AnimatePresence>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="bg-foreground/10" />
        <DropdownMenuItem className="p-2 text-destructive focus:bg-destructive/10 focus:text-destructive group">
          <motion.div
            whileHover={{ x: 4 }}
            className="flex items-center w-full"
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </motion.div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
