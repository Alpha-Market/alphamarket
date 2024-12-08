import type { Metadata } from "next";

import LandingPage from "@/components/Screens/LandingPage";

export const metadata: Metadata = {
	title: "AlphaMarket",
};

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
