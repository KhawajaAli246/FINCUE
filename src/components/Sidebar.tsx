import {
  LayoutDashboard,
  PieChart,
  LineChart,
  BellRing,
  Settings,
  CircleDollarSign,
  BarChart3,
  History,
  ChevronLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SidebarProps {
  isOpen: boolean;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  activeTab,
  setActiveTab,
}) => {
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "holdings", label: "Holdings", icon: PieChart },
    { id: "transactions", label: "Transactions", icon: History },
    { id: "charts", label: "Charts", icon: LineChart },
    { id: "alerts", label: "Alerts", icon: BellRing },
  ];

  return (
    <aside
      className={cn(
        "bg-sidebar border-r transition-all duration-300 ease-in-out z-30 h-screen",
        isOpen ? "w-64" : "w-0 -ml-8 sm:ml-0 sm:w-16"
      )}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between h-16 px-6 border-b">
          {isOpen && (
            <div className="flex items-center gap-2">
              <CircleDollarSign className="h-6 w-6 text-white" />
              <span className="text-lg font-semibold">Fincue</span>
            </div>
          )}
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "nav-link w-full text-left",
                activeTab === item.id && "active",
                !isOpen && "justify-center px-0"
              )}
            >
              <item.icon className="h-5 w-5 shrink-0" />
              {isOpen && <span>{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t">
          {isOpen && (
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Fincue</span>
              <span>Beta</span>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};
