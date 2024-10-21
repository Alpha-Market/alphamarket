import LandingPage from "@/components/Screens/LandingPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: 'AlphaMarket'
}

export default function RootPage() {
    return (
        <LandingPage />
            // {/* {
            //     authUser ?
            //         (isConnected ? <Flow /> : <WalletConnectScreen />)
            //         : */}
                    
            // {/* } */}
    );
}
