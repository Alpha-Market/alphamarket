"use client";

import type { PropsWithChildren } from "react";

import WalletConnectScreen from "@/components/Screens/WalletConnectScreen";

import { useAccount } from "wagmi";

export default function WalletConnectWrapper({ children }: PropsWithChildren) {
	const { isConnected } = useAccount();

	return <>{isConnected ? children : <WalletConnectScreen />}</>;
}
