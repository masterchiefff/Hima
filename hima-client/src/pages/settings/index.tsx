"use client"

import type React from "react"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CreditCard } from "lucide-react"
import DashboardLayout from "@/components/@layouts/dashboardLayout"

export default function SettingsPage() {
  return (
    <DashboardLayout>
        <div>
            <div className="mb-6">
                <h1 className="text-xl font-medium">Settings</h1>
                <p className="text-xs text-gray-400">Manage your account and preferences</p>
            </div>

            <Tabs defaultValue="profile">
                <TabsList className="bg-gray-900/60 mb-6">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="payment">Payment</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
                </TabsList>

                <TabsContent value="profile">
                <Card className="bg-black/60 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
                    <div className="flex flex-col md:flex-row gap-6 items-start md:items-center mb-6">
                    <Avatar className="w-20 h-20 border-2 border-gray-700">
                        <AvatarImage src="/placeholder.svg?height=80&width=80" alt="Profile" />
                        <AvatarFallback>D</AvatarFallback>
                    </Avatar>

                    <div className="flex-1">
                        <h3 className="text-lg font-medium">Daniel Kamau</h3>
                        <p className="text-sm text-gray-400">Boda Boda Rider</p>
                        <p className="text-xs text-gray-500 mt-1">Member since Dec 2023</p>
                    </div>

                    <Button variant="outline" size="sm">
                        Change Photo
                    </Button>
                    </div>

                    <div className="grid gap-4">
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" defaultValue="Daniel" className="bg-gray-900/70 border-gray-700 mt-1" />
                        </div>
                        <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" defaultValue="Kamau" className="bg-gray-900/70 border-gray-700 mt-1" />
                        </div>
                    </div>

                    <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                        id="email"
                        defaultValue="daniel.kamau@example.com"
                        className="bg-gray-900/70 border-gray-700 mt-1"
                        />
                    </div>

                    <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" defaultValue="+254 712 345 678" className="bg-gray-900/70 border-gray-700 mt-1" />
                    </div>

                    <div>
                        <Label htmlFor="occupation">Occupation</Label>
                        <Input id="occupation" defaultValue="Boda Boda Rider" className="bg-gray-900/70 border-gray-700 mt-1" />
                    </div>

                    <div className="flex justify-end mt-2">
                        <Button className="bg-yellow-500 hover:bg-yellow-600">Save Changes</Button>
                    </div>
                    </div>
                </Card>
                </TabsContent>

                <TabsContent value="payment">
                <Card className="bg-black/60 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
                    <h3 className="text-lg font-medium mb-4">Payment Methods</h3>

                    <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 border border-gray-700 rounded-lg">
                        <div className="flex items-center">
                        <CreditCard className="w-5 h-5 mr-3 text-yellow-500" />
                        <div>
                            <p className="text-sm font-medium">MiniPay</p>
                            <p className="text-xs text-gray-400">Connected</p>
                        </div>
                        </div>
                        <Button variant="outline" size="sm">
                        Disconnect
                        </Button>
                    </div>

                    <div className="flex items-center justify-between p-3 border border-gray-700 rounded-lg">
                        <div className="flex items-center">
                        <CreditCard className="w-5 h-5 mr-3 text-purple-500" />
                        <div>
                            <p className="text-sm font-medium">M-Pesa</p>
                            <p className="text-xs text-gray-400">+254 712 345 678</p>
                        </div>
                        </div>
                        <Button variant="outline" size="sm">
                        Remove
                        </Button>
                    </div>

                    <Button className="w-full mt-4">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Payment Method
                    </Button>
                    </div>
                </Card>
                </TabsContent>

                <TabsContent value="notifications">
                <Card className="bg-black/60 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
                    <h3 className="text-lg font-medium mb-4">Notification Settings</h3>

                    <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                        <p className="text-sm font-medium">Policy Reminders</p>
                        <p className="text-xs text-gray-400">Get notified about upcoming premium payments</p>
                        </div>
                        <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                        <div>
                        <p className="text-sm font-medium">Claim Updates</p>
                        <p className="text-xs text-gray-400">Receive updates about your claim status</p>
                        </div>
                        <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                        <div>
                        <p className="text-sm font-medium">New Products</p>
                        <p className="text-xs text-gray-400">Learn about new insurance products</p>
                        </div>
                        <Switch />
                    </div>

                    <div className="flex items-center justify-between">
                        <div>
                        <p className="text-sm font-medium">Marketing</p>
                        <p className="text-xs text-gray-400">Receive promotional offers and discounts</p>
                        </div>
                        <Switch />
                    </div>
                    </div>
                </Card>
                </TabsContent>

                <TabsContent value="security">
                <Card className="bg-black/60 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
                    <h3 className="text-lg font-medium mb-4">Security Settings</h3>

                    <div className="space-y-6">
                    <div>
                        <h4 className="text-sm font-medium mb-2">Change Password</h4>
                        <div className="space-y-3">
                        <div>
                            <Label htmlFor="currentPassword">Current Password</Label>
                            <Input id="currentPassword" type="password" className="bg-gray-900/70 border-gray-700 mt-1" />
                        </div>
                        <div>
                            <Label htmlFor="newPassword">New Password</Label>
                            <Input id="newPassword" type="password" className="bg-gray-900/70 border-gray-700 mt-1" />
                        </div>
                        <div>
                            <Label htmlFor="confirmPassword">Confirm New Password</Label>
                            <Input id="confirmPassword" type="password" className="bg-gray-900/70 border-gray-700 mt-1" />
                        </div>
                        <Button className="bg-yellow-500 hover:bg-yellow-600 mt-2">Update Password</Button>
                        </div>
                    </div>

                    <div className="pt-4 border-t border-gray-800">
                        <h4 className="text-sm font-medium mb-2">Two-Factor Authentication</h4>
                        <p className="text-xs text-gray-400 mb-3">Add an extra layer of security to your account</p>
                        <Button variant="outline">Enable 2FA</Button>
                    </div>
                    </div>
                </Card>
                </TabsContent>
            </Tabs>
            </div>
    </DashboardLayout>
  )
}

function Plus(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  )
}
