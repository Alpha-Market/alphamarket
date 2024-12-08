import type { PropsWithChildren } from "react";

import WalletConnectScreen from "@/components/Screens/WalletConnectScreen";

import { useAppStore } from "@/store/app.store";
import { useAccount } from "wagmi";

export default function WalletConnectWrapper({ children }: PropsWithChildren) {
	const { isConnected } = useAccount();
	const isLogin = useAppStore(state => state.isLogin);

	return <>{isConnected || !isLogin ? children : <WalletConnectScreen />}</>;
}
