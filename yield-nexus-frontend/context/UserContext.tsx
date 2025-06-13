"use client";

import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";

interface UserState {
    hasCompletedOnboarding: boolean;
    isConnected: boolean;
    walletAddress: string | null;
    hasSBTC: boolean;
}

interface UserContextType {
    userState: UserState;
    setUserState: React.Dispatch<React.SetStateAction<UserState>>;
    connectWallet: () => Promise<{ address: string; hasSBTC: boolean } | null>;
    disconnectWallet: () => void;
    completeOnboarding: (address?: string, hasSBTC?: boolean) => void;
}

const initialState: UserState = {
    hasCompletedOnboarding: false,
    isConnected: false,
    walletAddress: null,
    hasSBTC: false
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [userState, setUserState] = useState<UserState>(initialState);

    // Load from localStorage on mount (if available)
    useEffect(() => {
        if (typeof window !== "undefined") {
            const savedState = localStorage.getItem("userState");
            if (savedState) {
                setUserState(JSON.parse(savedState));
            }
        }
    }, []);

    // Save to localStorage when state changes
    useEffect(() => {
        if (typeof window !== "undefined") {
            localStorage.setItem("userState", JSON.stringify(userState));
        }
    }, [userState]);

    // Mock wallet connection for now
    const connectWallet = async () => {
        try {
            // This would be replaced with real wallet connection
            // For now, we'll simulate a successful connection
            const mockAddress = "0x71c...9e3f";
            const mockHasSBTC = Math.random() > 0.3;

            setUserState({
                ...userState,
                isConnected: true,
                walletAddress: mockAddress,
                hasSBTC: mockHasSBTC
            });

            return { address: mockAddress, hasSBTC: mockHasSBTC };
        } catch (error) {
            console.error("Wallet connection failed:", error);
            return null;
        }
    };

    const disconnectWallet = () => {
        setUserState({
            ...userState,
            isConnected: false,
            walletAddress: null
        });
    };

    const completeOnboarding = (address?: string, hasSBTC?: boolean) => {
        setUserState({
            hasCompletedOnboarding: true,
            isConnected: !!address,
            walletAddress: address || null,
            hasSBTC: hasSBTC || false
        });
    };

    return (
        <UserContext.Provider
            value={{
                userState,
                setUserState,
                connectWallet,
                disconnectWallet,
                completeOnboarding
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};