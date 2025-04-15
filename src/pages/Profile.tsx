
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AccountSettings from "@/components/profile/AccountSettings";
import BillingSettings from "@/components/profile/BillingSettings";
import NotificationSettings from "@/components/profile/NotificationSettings";
import HelpSupport from "@/components/profile/HelpSupport";
import UserProfile from "@/components/profile/UserProfile";
import { Card } from "@/components/ui/card";
import { useNavigate, useLocation } from "react-router-dom";

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const defaultTab = searchParams.get("tab") || "profile";

  const handleTabChange = (value: string) => {
    searchParams.set("tab", value);
    navigate({ search: searchParams.toString() });
  };

  return (
    <div className="container mx-auto py-8 max-w-5xl">
      <h1 className="text-3xl font-semibold mb-6">Account</h1>
      
      <Card className="p-6 shadow-md">
        <Tabs 
          defaultValue={defaultTab} 
          className="w-full" 
          onValueChange={handleTabChange}
        >
          <TabsList className="grid grid-cols-5 mb-8">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="help">Help & Support</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile">
            <UserProfile />
          </TabsContent>
          
          <TabsContent value="settings">
            <AccountSettings />
          </TabsContent>
          
          <TabsContent value="billing">
            <BillingSettings />
          </TabsContent>
          
          <TabsContent value="notifications">
            <NotificationSettings />
          </TabsContent>
          
          <TabsContent value="help">
            <HelpSupport />
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default Profile;
