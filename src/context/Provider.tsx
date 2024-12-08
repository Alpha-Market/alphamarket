"use client";

import type { FC, PropsWithChildren } from "react";
import ErrorBoundary from "@/components/Util/ErrorBoundary";
import { wagmiConfig } from "@/lib/wagmiConfig";

import { jotaiStore } from "@/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider as JotaiProvider } from "jotai";
import dynamic from "next/dynamic";

import { Toaster } from "react-hot-toast";
import { WagmiProvider } from "wagmi";
import WalletConnectWrapper from "./WalletConnectWrapper";
import "jotai-devtools/styles.css";

const DevTools = dynamic(
	() => import("jotai-devtools").then(mod => mod.DevTools),
	{ ssr: false }, // Disable SSR for this component
);

const queryClient = new QueryClient();

const Provider: FC<PropsWithChildren> = ({
	children,
}) => {
	return (
		<ErrorBoundary>
			<WagmiProvider config={wagmiConfig}>
				<QueryClientProvider client={queryClient}>
					<JotaiProvider store={jotaiStore}>
						<DevTools position="bottom-right" store={jotaiStore} />
						<WalletConnectWrapper>
							{children}
						</WalletConnectWrapper>
					</JotaiProvider>
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
