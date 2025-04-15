
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeSwitcher from "./ThemeSwitcher";
import { AddTransactionDialog } from "./AddTransactionDialog";
import { NotificationsDropdown } from "./NotificationsDropdown";
import { UserProfileDropdown } from "./UserProfileDropdown";

interface NavbarProps {
  toggleSidebar: () => void;
  sidebarOpen: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ toggleSidebar, sidebarOpen }) => {
  return (
    <header className="border-b bg-background z-10">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="shrink-0"
            aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold tracking-tight hidden sm:block">
            Financial Portfolio
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <AddTransactionDialog />
          <NotificationsDropdown />
          <ThemeSwitcher />
          <UserProfileDropdown 
            userName="John Doe"
            userEmail="investor@example.com"
          />
        </div>
      </div>
    </header>
  );
};
