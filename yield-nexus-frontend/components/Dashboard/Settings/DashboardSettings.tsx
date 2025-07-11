"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
    Key,
    Smartphone,
    Mail,
    Lock,
    Eye,
    EyeOff,
    Save,
    RotateCcw,
    Download,
    Upload,
    Trash2,
    AlertTriangle,
    CheckCircle,
    Monitor,
    Moon,
    Sun,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { useTheme } from "next-themes";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as any }
    }
};

const DashboardSettings: React.FC = () => {
    const [showApiKey, setShowApiKey] = useState(false);
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
    const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
    const [profileData, setProfileData] = useState({
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        phone: "+1 (555) 123-4567",
        company: "YieldNexus User",
        location: "San Francisco, CA"
    });
    
    const { theme, setTheme } = useTheme();
    const { toast } = useToast();

    const handleSaveSettings = () => {
        setHasUnsavedChanges(false);
        toast({
            title: "Settings saved",
            description: "Your dashboard settings have been updated successfully.",
        });
    };

    const handleResetSettings = () => {
        setHasUnsavedChanges(false);
        toast({
            title: "Settings reset",
            description: "All settings have been reset to default values.",
        });
    };

    const markUnsaved = () => {
        setHasUnsavedChanges(true);
    };

    const handleProfileUpdate = (field: string, value: string) => {
        setProfileData(prev => ({ ...prev, [field]: value }));
        markUnsaved();
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-4"
        >
            {/* Header */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Settings</h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1">
                        Manage your account, security, and dashboard preferences
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    {hasUnsavedChanges && (
                        <Badge variant="outline" className="text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800">
                            Unsaved Changes
                        </Badge>
                    )}
                    <Button variant="outline" size="sm" onClick={handleResetSettings} className="h-9">
                        <RotateCcw className="h-4 w-4 mr-2" />
                        Reset
                    </Button>
                    <Button size="sm" onClick={handleSaveSettings} className="h-9 bg-gradient-to-r from-[#F7931A] to-amber-600 hover:from-[#F7931A]/90 hover:to-amber-700 text-white border-none">
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
                    </Button>
                </div>
            </motion.div>

            {/* Settings Tabs */}
            <motion.div variants={itemVariants}>
                <Card className="border border-slate-200/60 dark:border-slate-800/60">
                    <CardContent className="p-0">
                        <Tabs defaultValue="profile" className="w-full">
                            <TabsList className="grid w-full grid-cols-5 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                                <TabsTrigger value="profile" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900">Profile</TabsTrigger>
                                <TabsTrigger value="security" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900">Security</TabsTrigger>
                                <TabsTrigger value="notifications" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900">Notifications</TabsTrigger>
                                <TabsTrigger value="appearance" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900">Appearance</TabsTrigger>
                                <TabsTrigger value="account" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900">Account</TabsTrigger>
                            </TabsList>
                            
                            {/* Profile Settings */}
                            <TabsContent value="profile" className="p-6 space-y-6">
                                <div>
                                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Profile Information</h3>
                                    <div className="flex items-start space-x-6">
                                        <div className="flex flex-col items-center space-y-3">
                                            <Avatar className="w-20 h-20">
                                                <AvatarImage src="/api/placeholder/80/80" />
                                                <AvatarFallback className="text-lg font-semibold bg-[#F7931A]/10 text-[#F7931A]">
                                                    {profileData.firstName[0]}{profileData.lastName[0]}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="flex space-x-2">
                                                <Button variant="outline" size="sm">
                                                    <Upload className="h-4 w-4 mr-2" />
                                                    Upload
                                                </Button>
                                                <Button variant="outline" size="sm">
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                        <div className="flex-1 space-y-4">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">First Name</Label>
                                                    <Input 
                                                        value={profileData.firstName}
                                                        onChange={(e) => handleProfileUpdate('firstName', e.target.value)}
                                                        className="mt-2"
                                                    />
                                                </div>
                                                <div>
                                                    <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">Last Name</Label>
                                                    <Input 
                                                        value={profileData.lastName}
                                                        onChange={(e) => handleProfileUpdate('lastName', e.target.value)}
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">Email Address</Label>
                                                <Input 
                                                    type="email"
                                                    value={profileData.email}
                                                    onChange={(e) => handleProfileUpdate('email', e.target.value)}
                                                    className="mt-2"
                                                />
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">Phone Number</Label>
                                                    <Input 
                                                        value={profileData.phone}
                                                        onChange={(e) => handleProfileUpdate('phone', e.target.value)}
                                                        className="mt-2"
                                                    />
                                                </div>
                                                <div>
                                                    <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">Company</Label>
                                                    <Input 
                                                        value={profileData.company}
                                                        onChange={(e) => handleProfileUpdate('company', e.target.value)}
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">Location</Label>
                                                <Input 
                                                    value={profileData.location}
                                                    onChange={(e) => handleProfileUpdate('location', e.target.value)}
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="border-t pt-6">
                                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Preferences</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">Time Zone</Label>
                                            <Select defaultValue="pst">
                                                <SelectTrigger className="w-full mt-2">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="pst">Pacific Standard Time</SelectItem>
                                                    <SelectItem value="est">Eastern Standard Time</SelectItem>
                                                    <SelectItem value="utc">UTC</SelectItem>
                                                    <SelectItem value="cet">Central European Time</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div>
                                            <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">Language</Label>
                                            <Select defaultValue="en">
                                                <SelectTrigger className="w-full mt-2">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="en">English</SelectItem>
                                                    <SelectItem value="es">Spanish</SelectItem>
                                                    <SelectItem value="fr">French</SelectItem>
                                                    <SelectItem value="de">German</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                </div>
                            </TabsContent>
                            
                            {/* Security Settings */}
                            <TabsContent value="security" className="p-6 space-y-6">
                                <div>
                                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Password & Authentication</h3>
                                    <div className="space-y-4">
                                        <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <Label className="text-base font-medium text-slate-900 dark:text-white">Change Password</Label>
                                                    <p className="text-sm text-slate-500 dark:text-slate-400">Last changed 3 months ago</p>
                                                </div>
                                                <Button variant="outline" size="sm">
                                                    <Lock className="h-4 w-4 mr-2" />
                                                    Update Password
                                                </Button>
                                            </div>
                                        </div>

                                        <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <Label className="text-base font-medium text-slate-900 dark:text-white">Two-Factor Authentication</Label>
                                                    <p className="text-sm text-slate-500 dark:text-slate-400">
                                                        {twoFactorEnabled ? "Enabled via authenticator app" : "Not enabled"}
                                                    </p>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    {twoFactorEnabled && (
                                                        <Badge className="bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 border-green-200 dark:border-green-800">
                                                            <CheckCircle className="h-3 w-3 mr-1" />
                                                            Active
                                                        </Badge>
                                                    )}
                                                    <Switch 
                                                        checked={twoFactorEnabled} 
                                                        onCheckedChange={setTwoFactorEnabled}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="border-t pt-6">
                                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">API Access</h3>
                                    <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                                        <div className="flex items-center justify-between mb-3">
                                            <div>
                                                <Label className="text-base font-medium text-slate-900 dark:text-white">API Key</Label>
                                                <p className="text-sm text-slate-500 dark:text-slate-400">For programmatic access to your account</p>
                                            </div>
                                            <Button variant="outline" size="sm">
                                                <Key className="h-4 w-4 mr-2" />
                                                Generate New
                                            </Button>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Input 
                                                type={showApiKey ? "text" : "password"}
                                                value="yk_1234567890abcdef1234567890abcdef12345678"
                                                readOnly
                                                className="font-mono text-sm"
                                            />
                                            <Button 
                                                variant="outline" 
                                                size="sm"
                                                onClick={() => setShowApiKey(!showApiKey)}
                                            >
                                                {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                            </Button>
                                        </div>
                                    </div>
                                </div>

                                <div className="border-t pt-6">
                                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Active Sessions</h3>
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                                            <div className="flex items-center space-x-3">
                                                <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/30">
                                                    <Monitor className="h-5 w-5 text-green-600 dark:text-green-400" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-slate-900 dark:text-white">Chrome on macOS</p>
                                                    <p className="text-xs text-slate-500 dark:text-slate-400">192.168.1.1 • San Francisco, CA • Active now</p>
                                                </div>
                                            </div>
                                            <Badge className="bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400">Current</Badge>
                                        </div>
                                        <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                                            <div className="flex items-center space-x-3">
                                                <div className="p-2 rounded-lg bg-slate-200 dark:bg-slate-700">
                                                    <Smartphone className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-slate-900 dark:text-white">Mobile App</p>
                                                    <p className="text-xs text-slate-500 dark:text-slate-400">10.0.0.1 • 2 hours ago</p>
                                                </div>
                                            </div>
                                            <Button variant="outline" size="sm">Revoke</Button>
                                        </div>
                                    </div>
                                </div>
                            </TabsContent>
                            
                            {/* Notifications */}
                            <TabsContent value="notifications" className="p-6 space-y-6">
                                <div>
                                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Notification Preferences</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-4">
                                            <h4 className="font-medium text-slate-900 dark:text-white">Portfolio & Trading</h4>
                                            <div className="space-y-3">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm text-slate-700 dark:text-slate-300">Portfolio updates</span>
                                                    <Switch defaultChecked />
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm text-slate-700 dark:text-slate-300">Reward notifications</span>
                                                    <Switch defaultChecked />
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm text-slate-700 dark:text-slate-300">Strategy changes</span>
                                                    <Switch />
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm text-slate-700 dark:text-slate-300">Performance alerts</span>
                                                    <Switch />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <h4 className="font-medium text-slate-900 dark:text-white">Security & Account</h4>
                                            <div className="space-y-3">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm text-slate-700 dark:text-slate-300">Security alerts</span>
                                                    <Switch defaultChecked />
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm text-slate-700 dark:text-slate-300">Login notifications</span>
                                                    <Switch />
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm text-slate-700 dark:text-slate-300">API usage alerts</span>
                                                    <Switch />
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm text-slate-700 dark:text-slate-300">Weekly reports</span>
                                                    <Switch defaultChecked />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="border-t pt-6">
                                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Delivery Methods</h3>
                                    <div className="space-y-4">
                                        <div className="flex items-center space-x-3">
                                            <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                                                <Mail className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                            </div>
                                            <div className="flex-1">
                                                <Label className="text-base font-medium text-slate-900 dark:text-white">Email Notifications</Label>
                                                <p className="text-sm text-slate-500 dark:text-slate-400">{profileData.email}</p>
                                            </div>
                                            <Switch defaultChecked />
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <div className="p-2 rounded-lg bg-green-50 dark:bg-green-900/20">
                                                <Smartphone className="h-5 w-5 text-green-600 dark:text-green-400" />
                                            </div>
                                            <div className="flex-1">
                                                <Label className="text-base font-medium text-slate-900 dark:text-white">Push Notifications</Label>
                                                <p className="text-sm text-slate-500 dark:text-slate-400">Browser and mobile app notifications</p>
                                            </div>
                                            <Switch />
                                        </div>
                                    </div>
                                </div>
                            </TabsContent>
                            
                            {/* Appearance */}
                            <TabsContent value="appearance" className="p-6 space-y-6">
                                <div>
                                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Theme & Display</h3>
                                    <div>
                                        <Label className="text-base font-medium text-slate-900 dark:text-white">Theme Preference</Label>
                                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Choose your preferred color scheme</p>
                                        <div className="grid grid-cols-3 gap-3">
                                            <Button
                                                variant={theme === "light" ? "default" : "outline"}
                                                onClick={() => setTheme("light")}
                                                className="flex flex-col items-center p-4 h-auto"
                                            >
                                                <Sun className="h-6 w-6 mb-2" />
                                                <span>Light</span>
                                            </Button>
                                            <Button
                                                variant={theme === "dark" ? "default" : "outline"}
                                                onClick={() => setTheme("dark")}
                                                className="flex flex-col items-center p-4 h-auto"
                                            >
                                                <Moon className="h-6 w-6 mb-2" />
                                                <span>Dark</span>
                                            </Button>
                                            <Button
                                                variant={theme === "system" ? "default" : "outline"}
                                                onClick={() => setTheme("system")}
                                                className="flex flex-col items-center p-4 h-auto"
                                            >
                                                <Monitor className="h-6 w-6 mb-2" />
                                                <span>System</span>
                                            </Button>
                                        </div>
                                    </div>
                                </div>

                                <div className="border-t pt-6">
                                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Dashboard Layout</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">Sidebar Style</Label>
                                            <Select defaultValue="expanded">
                                                <SelectTrigger className="w-full mt-2">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="expanded">Always Expanded</SelectItem>
                                                    <SelectItem value="collapsed">Auto Collapse</SelectItem>
                                                    <SelectItem value="hidden">Hide on Mobile</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div>
                                            <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">Data Refresh Rate</Label>
                                            <Select defaultValue="30">
                                                <SelectTrigger className="w-full mt-2">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="10">10 seconds</SelectItem>
                                                    <SelectItem value="30">30 seconds</SelectItem>
                                                    <SelectItem value="60">1 minute</SelectItem>
                                                    <SelectItem value="300">5 minutes</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                </div>
                            </TabsContent>
                            
                            {/* Account Management */}
                            <TabsContent value="account" className="p-6 space-y-6">
                                <div>
                                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Data Export</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <Button variant="outline" className="justify-start">
                                            <Download className="h-4 w-4 mr-2" />
                                            Export Portfolio Data
                                        </Button>
                                        <Button variant="outline" className="justify-start">
                                            <Download className="h-4 w-4 mr-2" />
                                            Export Transaction History
                                        </Button>
                                        <Button variant="outline" className="justify-start">
                                            <Download className="h-4 w-4 mr-2" />
                                            Export Account Data
                                        </Button>
                                        <Button variant="outline" className="justify-start">
                                            <Download className="h-4 w-4 mr-2" />
                                            Download Report
                                        </Button>
                                    </div>
                                </div>

                                <div className="border-t pt-6">
                                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Account Actions</h3>
                                    <div className="space-y-3">
                                        <Button variant="outline" className="w-full justify-start">
                                            <Lock className="h-4 w-4 mr-2" />
                                            Temporarily Disable Account
                                        </Button>
                                        <Button variant="outline" className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50">
                                            <Trash2 className="h-4 w-4 mr-2" />
                                            Delete Account
                                        </Button>
                                    </div>
                                </div>
                                
                                <div className="border-t pt-6">
                                    <div className="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
                                        <div className="flex items-start space-x-2">
                                            <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5" />
                                            <div>
                                                <p className="text-sm font-medium text-amber-800 dark:text-amber-200">Data Privacy Notice</p>
                                                <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
                                                    Your data is encrypted and stored securely. We never share your personal information with third parties.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </Card>
            </motion.div>
        </motion.div>
    );
};

export default DashboardSettings;