import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { User, Lock, Bell, Zap } from "lucide-react";

export default function Settings() {
  return (
    <DashboardLayout>
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Settings</h1>
            <p className="text-foreground/60">Manage your account preferences and settings</p>
          </div>

          <div className="space-y-6">
            {/* Profile Settings */}
            <Card className="glass p-8 border-white/10">
              <div className="flex items-center gap-3 mb-6">
                <User className="w-5 h-5 text-blue-400" />
                <h2 className="text-2xl font-bold">Profile Settings</h2>
              </div>

              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label className="text-sm font-medium">Full Name</Label>
                    <Input
                      placeholder="Your name"
                      defaultValue="John Doe"
                      className="glass-sm border-white/10 mt-2"
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Email Address</Label>
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      defaultValue="john@example.com"
                      className="glass-sm border-white/10 mt-2"
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium">Company Name</Label>
                  <Input
                    placeholder="Your company"
                    defaultValue="OutreachIQ"
                    className="glass-sm border-white/10 mt-2"
                  />
                </div>

                <Button className="bg-blue-600 hover:bg-blue-700">Save Changes</Button>
              </div>
            </Card>

            {/* API Keys */}
            <Card className="glass p-8 border-white/10">
              <div className="flex items-center gap-3 mb-6">
                <Zap className="w-5 h-5 text-blue-400" />
                <h2 className="text-2xl font-bold">API Keys</h2>
              </div>

              <div className="space-y-4">
                <p className="text-foreground/60 text-sm">
                  Use these keys to integrate OutreachIQ with your applications.
                </p>

                <div>
                  <Label className="text-sm font-medium">API Key</Label>
                  <div className="flex gap-2 mt-2">
                    <Input
                      type="password"
                      value="sk_live_51234567890abcdef"
                      readOnly
                      className="glass-sm border-white/10"
                    />
                    <Button variant="outline" className="border-white/20 hover:bg-white/10">
                      Copy
                    </Button>
                  </div>
                </div>

                <Button variant="outline" className="border-white/20 hover:bg-white/10">
                  Generate New Key
                </Button>
              </div>
            </Card>

            {/* Notifications */}
            <Card className="glass p-8 border-white/10">
              <div className="flex items-center gap-3 mb-6">
                <Bell className="w-5 h-5 text-blue-400" />
                <h2 className="text-2xl font-bold">Notifications</h2>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Email Notifications</p>
                    <p className="text-foreground/60 text-sm">Receive updates about your account</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Marketing Emails</p>
                    <p className="text-foreground/60 text-sm">Get tips and best practices</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Weekly Reports</p>
                    <p className="text-foreground/60 text-sm">Receive your performance summary</p>
                  </div>
                  <Switch />
                </div>
              </div>
            </Card>

            {/* Security */}
            <Card className="glass p-8 border-white/10">
              <div className="flex items-center gap-3 mb-6">
                <Lock className="w-5 h-5 text-blue-400" />
                <h2 className="text-2xl font-bold">Security</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium">Current Password</Label>
                  <Input
                    type="password"
                    placeholder="Enter your current password"
                    className="glass-sm border-white/10 mt-2"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label className="text-sm font-medium">New Password</Label>
                    <Input
                      type="password"
                      placeholder="Enter new password"
                      className="glass-sm border-white/10 mt-2"
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Confirm Password</Label>
                    <Input
                      type="password"
                      placeholder="Confirm new password"
                      className="glass-sm border-white/10 mt-2"
                    />
                  </div>
                </div>

                <Button className="bg-blue-600 hover:bg-blue-700">Update Password</Button>
              </div>
            </Card>

            {/* Danger Zone */}
            <Card className="glass p-8 border-red-500/20 bg-red-500/5">
              <h2 className="text-2xl font-bold mb-6 text-red-400">Danger Zone</h2>

              <div className="space-y-4">
                <div>
                  <p className="font-medium mb-2">Delete Account</p>
                  <p className="text-foreground/60 text-sm mb-4">
                    Permanently delete your account and all associated data. This action cannot be undone.
                  </p>
                  <Button variant="outline" className="border-red-500/50 hover:bg-red-500/10 text-red-400">
                    Delete Account
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
