import type { ReactNode } from "react";
import { useTheme } from "next-themes";
import { PageHeader } from "@/components/layout/PageHeader";
import { Panel } from "@/components/layout/Panel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

/** One setting: label and help text on the left, the control on the right. */
function SettingRow({
  id,
  label,
  description,
  children,
  inline = false,
}: {
  id: string;
  label: string;
  description?: string;
  children: ReactNode;
  /** Keep the control beside the label on small screens too (switches). */
  inline?: boolean;
}) {
  return (
    <div
      className={
        inline
          ? "flex items-center justify-between gap-4 px-4 py-3"
          : "grid gap-1.5 px-4 py-3 sm:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] sm:items-center sm:gap-6"
      }
    >
      <div className="min-w-0">
        <Label htmlFor={id} className="text-sm font-medium">
          {label}
        </Label>
        {description ? <p className="text-xs text-muted-foreground">{description}</p> : null}
      </div>
      <div className={inline ? "shrink-0" : "min-w-0 sm:max-w-md"}>{children}</div>
    </div>
  );
}

function SettingsPanel({ title, description, children }: { title: string; description: string; children: ReactNode }) {
  return (
    <Panel title={title} aside={<span className="hidden sm:inline">{description}</span>} padded={false}>
      <p className="border-b px-4 py-2 text-xs text-muted-foreground sm:hidden">{description}</p>
      <div className="divide-y">{children}</div>
    </Panel>
  );
}

const Settings = () => {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <div className="mx-auto max-w-4xl space-y-4">
      <PageHeader title="Settings" description="Manage your application preferences and configurations." />

      <Tabs defaultValue="company">
        <TabsList>
          <TabsTrigger value="company">Company</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
        </TabsList>

        <TabsContent value="company">
          <SettingsPanel
            title="Company Information"
            description="Update your company details and business information."
          >
            <SettingRow id="companyName" label="Company Name">
              <Input id="companyName" placeholder="Your Company Name" autoComplete="organization" />
            </SettingRow>
            <SettingRow id="email" label="Business Email">
              <Input id="email" type="email" placeholder="contact@company.com" autoComplete="email" />
            </SettingRow>
            <SettingRow id="phone" label="Phone Number">
              <Input id="phone" type="tel" placeholder="+91 XXXXX XXXXX" autoComplete="tel" />
            </SettingRow>
            <SettingRow id="address" label="Business Address">
              <Input id="address" placeholder="Full Address" autoComplete="street-address" />
            </SettingRow>
            <SettingRow id="gstin" label="GSTIN" description="Printed on invoices and estimates">
              <Input id="gstin" placeholder="GST Identification Number" className="num" />
            </SettingRow>
          </SettingsPanel>
        </TabsContent>

        <TabsContent value="notifications">
          <SettingsPanel title="Notification Preferences" description="Configure how you receive notifications.">
            <SettingRow inline id="notifyEmail" label="Email Notifications" description="Receive notifications via email">
              <Switch id="notifyEmail" />
            </SettingRow>
            <SettingRow
              inline
              id="notifyProjects"
              label="Project Updates"
              description="Get notified about project status changes"
            >
              <Switch id="notifyProjects" />
            </SettingRow>
            <SettingRow
              inline
              id="notifyPayments"
              label="Payment Alerts"
              description="Receive payment and invoice notifications"
            >
              <Switch id="notifyPayments" />
            </SettingRow>
          </SettingsPanel>
        </TabsContent>

        <TabsContent value="preferences">
          <SettingsPanel title="System Preferences" description="Customize your application experience.">
            <SettingRow id="language" label="Language">
              <Select defaultValue="en-IN">
                <SelectTrigger id="language">
                  <SelectValue placeholder="Select Language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en-IN">English (India)</SelectItem>
                  <SelectItem value="hi-IN">Hindi</SelectItem>
                  <SelectItem value="mr-IN">Marathi</SelectItem>
                  <SelectItem value="gu-IN">Gujarati</SelectItem>
                </SelectContent>
              </Select>
            </SettingRow>
            <SettingRow id="dateFormat" label="Date Format">
              <Select defaultValue="dd-mm-yyyy">
                <SelectTrigger id="dateFormat">
                  <SelectValue placeholder="Select Date Format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dd-mm-yyyy">DD-MM-YYYY</SelectItem>
                  <SelectItem value="mm-dd-yyyy">MM-DD-YYYY</SelectItem>
                  <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                </SelectContent>
              </Select>
            </SettingRow>
            <SettingRow inline id="darkMode" label="Dark Mode" description="Enable dark mode theme">
              <Switch
                id="darkMode"
                checked={resolvedTheme === "dark"}
                onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
              />
            </SettingRow>
          </SettingsPanel>
        </TabsContent>

        <TabsContent value="security">
          <SettingsPanel title="Security Settings" description="Manage your account security preferences.">
            <SettingRow
              inline
              id="twoFactor"
              label="Two-Factor Authentication"
              description="Add an extra layer of security"
            >
              <Switch id="twoFactor" />
            </SettingRow>
            <SettingRow
              inline
              id="loginAlerts"
              label="Login Notifications"
              description="Get notified of new login attempts"
            >
              <Switch id="loginAlerts" />
            </SettingRow>
            <SettingRow inline id="changePassword" label="Password" description="Use a long, unique passphrase">
              <Button id="changePassword" variant="outline">
                Change Password
              </Button>
            </SettingRow>
          </SettingsPanel>
        </TabsContent>

        <TabsContent value="billing">
          <SettingsPanel
            title="Billing Settings"
            description="Manage your billing preferences and payment settings."
          >
            <SettingRow id="paymentTerms" label="Default Payment Terms">
              <Select defaultValue="net30">
                <SelectTrigger id="paymentTerms">
                  <SelectValue placeholder="Select Payment Terms" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="net15">Net 15</SelectItem>
                  <SelectItem value="net30">Net 30</SelectItem>
                  <SelectItem value="net45">Net 45</SelectItem>
                  <SelectItem value="net60">Net 60</SelectItem>
                </SelectContent>
              </Select>
            </SettingRow>
            <SettingRow id="invoicePrefix" label="Invoice Prefix">
              <Input id="invoicePrefix" placeholder="INV-" className="num" />
            </SettingRow>
            <SettingRow
              inline
              id="autoInvoice"
              label="Automatic Invoice Generation"
              description="Generate invoices automatically on project completion"
            >
              <Switch id="autoInvoice" />
            </SettingRow>
          </SettingsPanel>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end gap-2">
        <Button variant="outline">Cancel</Button>
        <Button>Save Changes</Button>
      </div>
    </div>
  );
};

export default Settings;
