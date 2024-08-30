"use client";

import { FC, PropsWithChildren } from 'react';
import AuthProvider from './AuthProvider';
import ErrorBoundary from '../components/Util/ErrorBoundary';
import { Toaster } from 'react-hot-toast';
import { WagmiProvider } from 'wagmi';
import { wagmiConfig } from '@/libs/wagmiConfig';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const Provider: FC<PropsWithChildren> = ({ children }) => {
    return (
        <ErrorBoundary>
            {/* <AuthProvider> */}
            <WagmiProvider config={wagmiConfig}>
                <QueryClientProvider client={queryClient}>
                    {children}
                </QueryClientProvider>
            </WagmiProvider>
            {/* </AuthProvider> */}

            <Toaster
                position='top-right'
                toastOptions={{
                    className: '!bg-white !rounded-none !font-primary text-black font-medium text-sm break-all',
                    duration: 5000
                }}
            />
        </ErrorBoundary>
    );
};

export default Provider;