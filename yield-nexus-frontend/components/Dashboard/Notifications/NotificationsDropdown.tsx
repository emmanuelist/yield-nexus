"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Bell, Check, ChevronRight, XCircle, Clock, AlertCircle, CheckCircle, Bitcoin, TrendingUp } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";

// Notification types
type NotificationType = "success" | "warning" | "info" | "error" | "pending";

interface Notification {
    id: string;
    title: string;
    message: string;
    time: Date;
    type: NotificationType;
    read: boolean;
    action?: {
        text: string;
        href: string;
    };
}

// Mock notifications data
const mockNotifications: Notification[] = [
    {
        id: "1",
        title: "Deposit Successful",
        message: "Your deposit of 0.25 sBTC has been confirmed and is now generating yield.",
        time: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
        type: "success",
        read: false,
        action: {
            text: "View Transaction",
            href: "/dashboard/transactions/0x123",
        },
    },
    {
        id: "2",
        title: "APY Rate Increase",
        message: "The yield rate on your deposits has increased from 7.5% to 8.2% APY.",
        time: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
        type: "info",
        read: false,
    },
    {
        id: "3",
        title: "Reward Pending",
        message: "Your weekly reward of 0.0045 sBTC is ready to claim or compound.",
        time: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
        type: "pending",
        read: false,
        action: {
            text: "Claim Now",
            href: "/dashboard/rewards/claim",
        },
    },
    {
        id: "4",
        title: "Yield Strategy Update",
        message: "New automated yield strategy detected with potential 9.1% APY.",
        time: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
        type: "info",
        read: true,
        action: {
            text: "Explore Strategy",
            href: "/dashboard/strategies/new",
        },
    },
    {
        id: "5",
        title: "Network Fee Alert",
        message: "Current network fees are higher than usual. Consider delaying transactions.",
        time: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
        type: "warning",
        read: true,
    },
    {
        id: "6",
        title: "Yield Earned",
        message: "You've earned 0.0078 sBTC from your deposits this month so far.",
        time: new Date(Date.now() - 1000 * 60 * 60 * 36), // 1.5 days ago
        type: "success",
        read: true,
        action: {
            text: "View Analytics",
            href: "/dashboard/analytics",
        },
    },
];

const NotificationsDropdown: React.FC = () => {
    const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
    const [isOpen, setIsOpen] = useState(false);

    const unreadCount = notifications.filter(n => !n.read).length;

    // Mark notification as read
    const markAsRead = (id: string) => {
        setNotifications(
            notifications.map(notification =>
                notification.id === id
                    ? { ...notification, read: true }
                    : notification
            )
        );
    };

    // Mark all notifications as read
    const markAllAsRead = () => {
        setNotifications(
            notifications.map(notification => ({
                ...notification,
                read: true,
            }))
        );
    };

    // Delete a notification
    const deleteNotification = (id: string) => {
        setNotifications(notifications.filter(notification => notification.id !== id));
    };

    // Get icon for notification type
    const getNotificationIcon = (type: NotificationType) => {
        switch (type) {
            case "success":
                return <CheckCircle className="h-5 w-5 text-green-500" />;
            case "warning":
                return <AlertCircle className="h-5 w-5 text-amber-500" />;
            case "error":
                return <XCircle className="h-5 w-5 text-red-500" />;
            case "info":
                return <TrendingUp className="h-5 w-5 text-blue-500" />;
            case "pending":
                return <Clock className="h-5 w-5 text-[#F7931A]" />;
            default:
                return <Bell className="h-5 w-5 text-slate-500" />;
        }
    };

    return (
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative hover:bg-slate-100 dark:hover:bg-slate-800/50">
                    <Bell className="h-5 w-5" />
                    {unreadCount > 0 && (
                        <span className="absolute top-0 right-0 flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F7931A] opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F7931A]"></span>
                        </span>
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                align="end"
                className="w-80 md:w-96 max-h-[85vh] overflow-hidden p-0 shadow-lg"
                forceMount
            >
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="dark:bg-slate-900/90 bg-white border-[#F7931A]/5 dark:border-[#F7931A]/10 shadow-lg"
                >
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800">
                        <h3 className="font-semibold text-slate-900 dark:text-slate-100 flex items-center">
                            Notifications
                            {unreadCount > 0 && (
                                <Badge className="ml-2 bg-[#F7931A] hover:bg-[#F7931A]/90" variant="default">
                                    {unreadCount} new
                                </Badge>
                            )}
                        </h3>
                        {unreadCount > 0 && (
                            <Button variant="ghost" size="sm" onClick={markAllAsRead} className="text-xs text-[#F7931A] hover:text-[#F7931A]/90 hover:bg-[#F7931A]/10">
                                Mark all as read
                            </Button>
                        )}
                    </div>

                    {/* Notification list */}
                    <div className="overflow-y-auto max-h-[60vh]">
                        {notifications.length === 0 ? (
                            <div className="py-8 text-center">
                                <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-slate-100 dark:bg-slate-800 mb-4">
                                    <Bell className="h-6 w-6 text-slate-500 dark:text-slate-400" />
                                </div>
                                <p className="text-slate-600 dark:text-slate-400">No notifications yet</p>
                            </div>
                        ) : (
                            <div>
                                {notifications.map((notification) => (
                                    <div
                                        key={notification.id}
                                        className={cn(
                                            "relative p-4 border-b border-slate-200 dark:border-slate-800 last:border-0 transition-colors",
                                            !notification.read ? "bg-[#F7931A]/5 dark:bg-[#F7931A]/10" : "",
                                            "hover:bg-slate-50 dark:hover:bg-slate-800/50"
                                        )}
                                    >
                                        <div className="flex gap-3">
                                            <div className="flex-shrink-0 mt-0.5">
                                                {getNotificationIcon(notification.type)}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-start justify-between">
                                                    <p className={cn(
                                                        "text-sm font-medium",
                                                        !notification.read
                                                            ? "text-slate-900 dark:text-slate-100"
                                                            : "text-slate-700 dark:text-slate-300"
                                                    )}>
                                                        {notification.title}
                                                    </p>
                                                    <span className="text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap ml-2">
                                                        {formatDistanceToNow(notification.time, { addSuffix: true })}
                                                    </span>
                                                </div>

                                                <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                                                    {notification.message}
                                                </p>

                                                {notification.action && (
                                                    <div className="mt-2">
                                                        <Button
                                                            variant="link"
                                                            size="sm"
                                                            className="h-auto p-0 text-xs font-medium text-[#F7931A] hover:text-[#F7931A]/90 flex items-center"
                                                            onClick={() => markAsRead(notification.id)}
                                                        >
                                                            {notification.action.text}
                                                            <ChevronRight className="ml-1 h-3 w-3" />
                                                        </Button>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="ml-2 flex-shrink-0 flex flex-col gap-2">
                                                {!notification.read && (
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-6 w-6 text-[#F7931A] hover:text-[#F7931A]/90 hover:bg-[#F7931A]/10"
                                                        onClick={() => markAsRead(notification.id)}
                                                    >
                                                        <Check className="h-4 w-4" />
                                                    </Button>
                                                )}
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-6 w-6 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                                                    onClick={() => deleteNotification(notification.id)}
                                                >
                                                    <XCircle className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="p-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-center">
                        <Button variant="ghost" size="sm" className="text-sm text-slate-700 dark:text-slate-300 w-full justify-center hover:bg-slate-200/50 dark:hover:bg-slate-700/50">
                            View all notifications
                        </Button>
                    </div>
                </motion.div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default NotificationsDropdown;
