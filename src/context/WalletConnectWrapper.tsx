import WalletConnectScreen from "@/components/Screens/WalletConnectScreen";
import { PropsWithChildren } from "react";
import { useAccount } from "wagmi";

export default function WalletConnectWrapper({ children }: PropsWithChildren) {
    const { isConnected, isConnecting, isReconnecting } = useAccount();

    if (isConnecting || isReconnecting) {
        return <></>;
    }

    return <>{isConnected ? children : <WalletConnectScreen />}</>;
}
