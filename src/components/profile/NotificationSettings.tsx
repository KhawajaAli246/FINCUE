
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { BellRing, Mail, MessageSquare, AlertTriangle, LineChart, CreditCard } from "lucide-react";
import { toast } from "sonner";

const NotificationSettings = () => {
  const [emailNotifications, setEmailNotifications] = useState({
    dailySummary: true,
    priceAlerts: true,
    portfolioUpdates: true,
    dividendPayments: true,
    securityAlerts: true,
    marketNews: false,
    productUpdates: true
  });

  const [pushNotifications, setPushNotifications] = useState({
    priceAlerts: true,
    portfolioChanges: true,
    securityAlerts: true,
    dividendPayments: false,
    marketNews: false
  });

  const toggleEmailNotification = (key: string) => {
    setEmailNotifications(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof emailNotifications]
    }));
  };

  const togglePushNotification = (key: string) => {
    setPushNotifications(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof pushNotifications]
    }));
  };

  const saveNotificationSettings = () => {
    toast.success("Notification preferences saved successfully");
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            <span>Email Notifications</span>
          </CardTitle>
          <CardDescription>Configure which emails you want to receive</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between py-2">
              <div>
                <h3 className="font-medium">Daily Summary</h3>
                <p className="text-sm text-muted-foreground">Receive a daily summary of your portfolio performance</p>
              </div>
              <Switch 
                checked={emailNotifications.dailySummary} 
                onCheckedChange={() => toggleEmailNotification("dailySummary")} 
              />
            </div>
            
            <div className="flex items-center justify-between py-2">
              <div>
                <h3 className="font-medium">Price Alerts</h3>
                <p className="text-sm text-muted-foreground">Get notified when assets reach your target prices</p>
              </div>
              <Switch 
                checked={emailNotifications.priceAlerts} 
                onCheckedChange={() => toggleEmailNotification("priceAlerts")} 
              />
            </div>
            
            <div className="flex items-center justify-between py-2">
              <div>
                <h3 className="font-medium">Portfolio Updates</h3>
                <p className="text-sm text-muted-foreground">Notifications about significant changes in your portfolio</p>
              </div>
              <Switch 
                checked={emailNotifications.portfolioUpdates} 
                onCheckedChange={() => toggleEmailNotification("portfolioUpdates")} 
              />
            </div>
            
            <div className="flex items-center justify-between py-2">
              <div>
                <h3 className="font-medium">Dividend Payments</h3>
                <p className="text-sm text-muted-foreground">Get notified about upcoming and processed dividend payments</p>
              </div>
              <Switch 
                checked={emailNotifications.dividendPayments} 
                onCheckedChange={() => toggleEmailNotification("dividendPayments")} 
              />
            </div>
            
            <div className="flex items-center justify-between py-2">
              <div>
                <h3 className="font-medium">Security Alerts</h3>
                <p className="text-sm text-muted-foreground">Important security notifications about your account</p>
              </div>
              <Switch 
                checked={emailNotifications.securityAlerts} 
                onCheckedChange={() => toggleEmailNotification("securityAlerts")} 
              />
            </div>
            
            <div className="flex items-center justify-between py-2">
              <div>
                <h3 className="font-medium">Market News</h3>
                <p className="text-sm text-muted-foreground">Weekly digest of relevant market news and analysis</p>
              </div>
              <Switch 
                checked={emailNotifications.marketNews} 
                onCheckedChange={() => toggleEmailNotification("marketNews")} 
              />
            </div>
            
            <div className="flex items-center justify-between py-2">
              <div>
                <h3 className="font-medium">Product Updates</h3>
                <p className="text-sm text-muted-foreground">Learn about new features and improvements</p>
              </div>
              <Switch 
                checked={emailNotifications.productUpdates} 
                onCheckedChange={() => toggleEmailNotification("productUpdates")} 
              />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BellRing className="h-5 w-5" />
            <span>Push Notifications</span>
          </CardTitle>
          <CardDescription>Manage alerts that appear on your devices</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between py-2">
              <div>
                <h3 className="font-medium">Price Alerts</h3>
                <p className="text-sm text-muted-foreground">Instant notifications for price targets</p>
              </div>
              <Switch 
                checked={pushNotifications.priceAlerts} 
                onCheckedChange={() => togglePushNotification("priceAlerts")} 
              />
            </div>
            
            <div className="flex items-center justify-between py-2">
              <div>
                <h3 className="font-medium">Portfolio Changes</h3>
                <p className="text-sm text-muted-foreground">Get alerts about significant portfolio movements</p>
              </div>
              <Switch 
                checked={pushNotifications.portfolioChanges} 
                onCheckedChange={() => togglePushNotification("portfolioChanges")} 
              />
            </div>
            
            <div className="flex items-center justify-between py-2">
              <div>
                <h3 className="font-medium">Security Alerts</h3>
                <p className="text-sm text-muted-foreground">Immediate notification of suspicious activities</p>
              </div>
              <Switch 
                checked={pushNotifications.securityAlerts} 
                onCheckedChange={() => togglePushNotification("securityAlerts")} 
              />
            </div>
            
            <div className="flex items-center justify-between py-2">
              <div>
                <h3 className="font-medium">Dividend Payments</h3>
                <p className="text-sm text-muted-foreground">Notifications when dividends are paid</p>
              </div>
              <Switch 
                checked={pushNotifications.dividendPayments} 
                onCheckedChange={() => togglePushNotification("dividendPayments")} 
              />
            </div>
            
            <div className="flex items-center justify-between py-2">
              <div>
                <h3 className="font-medium">Market News</h3>
                <p className="text-sm text-muted-foreground">Breaking news that may affect your investments</p>
              </div>
              <Switch 
                checked={pushNotifications.marketNews} 
                onCheckedChange={() => togglePushNotification("marketNews")} 
              />
            </div>
          </div>
          
          <div className="pt-4">
            <Button onClick={saveNotificationSettings}>Save Preferences</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotificationSettings;
