
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell } from "lucide-react";
import { alertsData, Alert, AlertStatus } from "@/types/alert";
import { AlertItem } from "@/components/alerts/AlertItem";
import { useToast } from "@/hooks/use-toast";

export function AlertsPanel() {
  const [alerts, setAlerts] = useState<Alert[]>(alertsData);
  const [activeTab, setActiveTab] = useState<AlertStatus | 'all'>('all');
  const { toast } = useToast();

  const filteredAlerts = alerts.filter(alert => 
    activeTab === 'all' || alert.status === activeTab
  );

  const dismissAlert = (id: number) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
    toast({
      title: "Alert dismissed",
      description: "The alert has been removed from your notifications.",
    });
  };

  return (
    <Card className="overflow-hidden">
      <div className="p-6 border-b">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold tracking-tight">Alerts & Notifications</h2>
          <Bell className="h-5 w-5 text-muted-foreground" />
        </div>
      </div>

      <Tabs defaultValue="all" onValueChange={(value) => setActiveTab(value as AlertStatus | 'all')}>
        <div className="px-6 border-b">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="triggered">Triggered</TabsTrigger>
            <TabsTrigger value="expired">Expired</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="all" className="mt-0">
          <div className="max-h-[400px] overflow-y-auto">
            {filteredAlerts.length > 0 ? (
              filteredAlerts.map(alert => (
                <AlertItem 
                  key={alert.id} 
                  alert={alert} 
                  onDismiss={dismissAlert} 
                />
              ))
            ) : (
              <div className="p-6 text-center text-muted-foreground">
                No alerts to display
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="active" className="mt-0">
          <div className="max-h-[400px] overflow-y-auto">
            {filteredAlerts.length > 0 ? (
              filteredAlerts.map(alert => (
                <AlertItem 
                  key={alert.id} 
                  alert={alert} 
                  onDismiss={dismissAlert} 
                />
              ))
            ) : (
              <div className="p-6 text-center text-muted-foreground">
                No active alerts
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="triggered" className="mt-0">
          <div className="max-h-[400px] overflow-y-auto">
            {filteredAlerts.length > 0 ? (
              filteredAlerts.map(alert => (
                <AlertItem 
                  key={alert.id} 
                  alert={alert} 
                  onDismiss={dismissAlert} 
                />
              ))
            ) : (
              <div className="p-6 text-center text-muted-foreground">
                No triggered alerts
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="expired" className="mt-0">
          <div className="max-h-[400px] overflow-y-auto">
            {filteredAlerts.length > 0 ? (
              filteredAlerts.map(alert => (
                <AlertItem 
                  key={alert.id} 
                  alert={alert} 
                  onDismiss={dismissAlert} 
                />
              ))
            ) : (
              <div className="p-6 text-center text-muted-foreground">
                No expired alerts
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
}
