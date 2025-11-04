import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { 
  Building2, 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  Bell, 
  Shield, 
  Palette,
  Languages,
  IndianRupee,
  Printer,
  Cloud,
  AlertTriangle
} from "lucide-react";

const Settings = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 p-4 md:p-8 overflow-auto">
          <div className="max-w-4xl mx-auto space-y-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-semibold">Settings</h1>
              <p className="text-muted-foreground mt-2">Manage your application preferences and configurations.</p>
            </div>

            <Tabs defaultValue="company" className="space-y-4">
              <TabsList>
                <TabsTrigger value="company">Company</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                <TabsTrigger value="preferences">Preferences</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
                <TabsTrigger value="billing">Billing</TabsTrigger>
              </TabsList>

              <TabsContent value="company" className="space-y-4">
                <Card className="p-6">
                  <h2 className="text-lg font-semibold flex items-center gap-2">
                    <Building2 className="h-5 w-5" />
                    Company Information
                  </h2>
                  <p className="text-sm text-muted-foreground mb-4">Update your company details and business information.</p>
                  <div className="space-y-4">
                    <div className="grid gap-2">
                      <Label htmlFor="companyName">Company Name</Label>
                      <Input id="companyName" placeholder="Your Company Name" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="email">Business Email</Label>
                      <Input id="email" type="email" placeholder="contact@company.com" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" type="tel" placeholder="+91 XXXXX XXXXX" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="address">Business Address</Label>
                      <Input id="address" placeholder="Full Address" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="gstin">GSTIN</Label>
                      <Input id="gstin" placeholder="GST Identification Number" />
                    </div>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="notifications" className="space-y-4">
                <Card className="p-6">
                  <h2 className="text-lg font-semibold flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    Notification Preferences
                  </h2>
                  <p className="text-sm text-muted-foreground mb-4">Configure how you receive notifications.</p>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Email Notifications</Label>
                        <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                      </div>
                      <Switch />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Project Updates</Label>
                        <p className="text-sm text-muted-foreground">Get notified about project status changes</p>
                      </div>
                      <Switch />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Payment Alerts</Label>
                        <p className="text-sm text-muted-foreground">Receive payment and invoice notifications</p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="preferences" className="space-y-4">
                <Card className="p-6">
                  <h2 className="text-lg font-semibold flex items-center gap-2">
                    <Palette className="h-5 w-5" />
                    System Preferences
                  </h2>
                  <p className="text-sm text-muted-foreground mb-4">Customize your application experience.</p>
                  <div className="space-y-4">
                    <div className="grid gap-2">
                      <Label>Language</Label>
                      <Select defaultValue="en-IN">
                        <SelectTrigger>
                          <SelectValue placeholder="Select Language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en-IN">English (India)</SelectItem>
                          <SelectItem value="hi-IN">Hindi</SelectItem>
                          <SelectItem value="mr-IN">Marathi</SelectItem>
                          <SelectItem value="gu-IN">Gujarati</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label>Date Format</Label>
                      <Select defaultValue="dd-mm-yyyy">
                        <SelectTrigger>
                          <SelectValue placeholder="Select Date Format" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="dd-mm-yyyy">DD-MM-YYYY</SelectItem>
                          <SelectItem value="mm-dd-yyyy">MM-DD-YYYY</SelectItem>
                          <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Dark Mode</Label>
                        <p className="text-sm text-muted-foreground">Enable dark mode theme</p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="security" className="space-y-4">
                <Card className="p-6">
                  <h2 className="text-lg font-semibold flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Security Settings
                  </h2>
                  <p className="text-sm text-muted-foreground mb-4">Manage your account security preferences.</p>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Two-Factor Authentication</Label>
                        <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                      </div>
                      <Switch />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Login Notifications</Label>
                        <p className="text-sm text-muted-foreground">Get notified of new login attempts</p>
                      </div>
                      <Switch />
                    </div>
                    <Button variant="outline" className="w-full">
                      Change Password
                    </Button>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="billing" className="space-y-4">
                <Card className="p-6">
                  <h2 className="text-lg font-semibold flex items-center gap-2">
                    <IndianRupee className="h-5 w-5" />
                    Billing Settings
                  </h2>
                  <p className="text-sm text-muted-foreground mb-4">Manage your billing preferences and payment settings.</p>
                  <div className="space-y-4">
                    <div className="grid gap-2">
                      <Label>Default Payment Terms</Label>
                      <Select defaultValue="net30">
                        <SelectTrigger>
                          <SelectValue placeholder="Select Payment Terms" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="net15">Net 15</SelectItem>
                          <SelectItem value="net30">Net 30</SelectItem>
                          <SelectItem value="net45">Net 45</SelectItem>
                          <SelectItem value="net60">Net 60</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label>Invoice Prefix</Label>
                      <Input placeholder="INV-" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Automatic Invoice Generation</Label>
                        <p className="text-sm text-muted-foreground">Generate invoices automatically on project completion</p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>

            <div className="flex justify-end gap-4">
              <Button variant="outline">Cancel</Button>
              <Button>Save Changes</Button>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Settings;
