
import React, { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Navbar } from "@/components/Navbar";
import { DashboardOverview } from "@/components/DashboardOverview";
import { HoldingsTable } from "@/components/HoldingsTable";
import { PerformanceCharts } from "@/components/PerformanceCharts";
import { AlertsPanel } from "@/components/AlertsPanel";
import { TransactionsHistory } from "@/components/TransactionsHistory";

const FinancialDashboard: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar isOpen={sidebarOpen} activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar 
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)} 
          sidebarOpen={sidebarOpen} 
        />
        
        <main className="flex-1 overflow-y-auto px-6 py-6">
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              <DashboardOverview />
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                <div className="xl:col-span-2">
                  <HoldingsTable />
                </div>
                <div>
                  <AlertsPanel />
                </div>
              </div>
            </div>
          )}
          
          {activeTab === "holdings" && <HoldingsTable />}
          {activeTab === "transactions" && <TransactionsHistory />}
          {activeTab === "charts" && <PerformanceCharts />}
          {activeTab === "alerts" && <AlertsPanel />}
          {activeTab === "settings" && (
            <div className="p-6 bg-card rounded-2xl border shadow text-center">
              <h2 className="text-2xl font-semibold mb-4">Settings</h2>
              <p className="text-muted-foreground">User settings and preferences will be available here.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default FinancialDashboard;
