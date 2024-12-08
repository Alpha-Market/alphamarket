import toast from "react-hot-toast";
import { useConnect } from "wagmi";

import OnBoardLayout from "../Layout/OnBoardLayout";

function WalletConnectScreen() {
	const { connect, connectors } = useConnect();
	return (
		<OnBoardLayout>
			<div className="sm:fixed sm:bottom-0 sm:inset-x-0 absolute sm:top-auto my-auto z-[100] sm:bg-card-1 w-full sm:max-w-full max-w-[422px] sm:border sm:border-stroke-1 sm:rounded-t-xl p-4 flex flex-col gap-4">
				<button
					onClick={() => {
						connect(
							{
								connector: connectors[0],
							},
							{
								onError: (err) => {
									console.log(`[WalletConnectScreen/onError] ${err}`);
									toast.error(`Error while connecting wallet`);
								},
							},
						);
					}}
					className="text-black bg-white font-semibold text-sm -tracking-[.98px] uppercase p-3 rounded-lg"
				>
					Connect Wallet
				</button>
			</div>
		</OnBoardLayout>
	);
}

export default WalletConnectScreen;
