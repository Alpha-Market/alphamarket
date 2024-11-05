"use client";

import ErrorBoundary from "@/components/Util/ErrorBoundary";
import { wagmiConfig } from "@/lib/wagmiConfig";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FC, PropsWithChildren } from "react";
import { Toaster } from "react-hot-toast";
import { WagmiProvider } from "wagmi";
import WalletConnectWrapper from "./WalletConnectWrapper";
import { AuthProvider } from "./AuthContext";
import AppGuardWrapper from "./AppGuardWrapper";

const queryClient = new QueryClient();

const Provider: FC<PropsWithChildren> = ({ children }) => {
    return (
        <ErrorBoundary>
            <WagmiProvider config={wagmiConfig}>
                <QueryClientProvider client={queryClient}>
                    <AuthProvider>
                        <WalletConnectWrapper>
                            <AppGuardWrapper>{children}</AppGuardWrapper>
                        </WalletConnectWrapper>
                    </AuthProvider>
                </QueryClientProvider>
            </WagmiProvider>

            <Toaster
                position="top-right"
                toastOptions={{
                    className:
                        "!bg-white !rounded-none !font-primary text-black font-medium text-sm break-all",
                    duration: 5000,
                }}
            />
        </ErrorBoundary>
    );
};

export default Provider;
