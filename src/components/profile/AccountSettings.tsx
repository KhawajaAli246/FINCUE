
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

const AccountSettings = () => {
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  
  const [preferences, setPreferences] = useState({
    marketNotifications: true,
    priceAlerts: true,
    portfolioUpdates: true,
    twoFactorAuth: false,
    darkModeDefault: true
  });

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordForm(prev => ({ ...prev, [name]: value }));
  };

  const handleToggleChange = (name: string) => {
    setPreferences(prev => ({ ...prev, [name]: !prev[name] }));
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }
    
    toast.success("Password updated successfully");
    setPasswordForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
          <CardDescription>Update your password to keep your account secure</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input 
                id="currentPassword" 
                name="currentPassword" 
                type="password" 
                value={passwordForm.currentPassword} 
                onChange={handlePasswordChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input 
                id="newPassword" 
                name="newPassword" 
                type="password" 
                value={passwordForm.newPassword} 
                onChange={handlePasswordChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input 
                id="confirmPassword" 
                name="confirmPassword" 
                type="password" 
                value={passwordForm.confirmPassword} 
                onChange={handlePasswordChange}
                required
              />
            </div>
            
            <div className="flex justify-end">
              <Button type="submit">Update Password</Button>
            </div>
          </form>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Security Settings</CardTitle>
          <CardDescription>Manage your account security preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between py-2">
            <div>
              <h3 className="font-medium">Two-Factor Authentication</h3>
              <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
            </div>
            <Switch 
              checked={preferences.twoFactorAuth} 
              onCheckedChange={() => handleToggleChange("twoFactorAuth")} 
            />
          </div>
          
          <div className="flex items-center justify-between py-2">
            <div>
              <h3 className="font-medium">Dark Mode as Default</h3>
              <p className="text-sm text-muted-foreground">Always use dark mode when you log in</p>
            </div>
            <Switch 
              checked={preferences.darkModeDefault} 
              onCheckedChange={() => handleToggleChange("darkModeDefault")} 
            />
          </div>
          
          <div className="mt-6">
            <Button variant="outline" className="w-full text-destructive hover:text-destructive hover:bg-destructive/10">
              Delete Account
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Time Zone & Language</CardTitle>
          <CardDescription>Customize regional settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="language">Display Language</Label>
            <select 
              id="language" 
              className="w-full h-10 rounded-md border border-input bg-background px-3 py-2"
              defaultValue="en-US"
            >
              <option value="en-US">English (United States)</option>
              <option value="en-GB">English (United Kingdom)</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
            </select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="timezone">Time Zone</Label>
            <select 
              id="timezone" 
              className="w-full h-10 rounded-md border border-input bg-background px-3 py-2"
              defaultValue="UTC-5"
            >
              <option value="UTC-8">Pacific Time (UTC-8)</option>
              <option value="UTC-7">Mountain Time (UTC-7)</option>
              <option value="UTC-6">Central Time (UTC-6)</option>
              <option value="UTC-5">Eastern Time (UTC-5)</option>
              <option value="UTC+0">GMT (UTC+0)</option>
              <option value="UTC+1">Central European Time (UTC+1)</option>
            </select>
          </div>
          
          <div className="flex justify-end mt-4">
            <Button type="button">Save Preferences</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountSettings;
