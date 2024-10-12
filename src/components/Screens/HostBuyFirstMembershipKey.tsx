import { useAccount, useBalance } from "wagmi";
import OnBoardLayout from "../UI/common/OnBoardLayout";
import { BTCIcon } from "@/util/Icons";
import { merlinTestnet, wagmiConfig } from "@/libs/wagmiConfig";

const HostBuyFirstMembershipKey = ({ onBack, onComplete }: { onBack: () => void, onComplete: () => void; }) => {
    const { address: userWalletAddress } = useAccount();

    const { data: walletBalance } = useBalance({
        chainId: merlinTestnet.id,
        address: userWalletAddress
    });

    const handleSumbit = () => {
        onComplete();
    };

    return (
        <OnBoardLayout>
            <div className="sm:fixed sm:bottom-0 sm:inset-x-0 absolute sm:top-auto top-[10%] z-[100] bg-card-1 w-full sm:max-w-full max-w-[422px] border border-stroke-1 sm:rounded-b-none rounded-xl p-4 flex flex-col gap-4">
                <div className="flex items-center justify-between border-b border-b-stroke-1 pb-4">
                    {/* Back Icon */}
                    <div className="cursor-pointer" onClick={onBack}>
                        <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" fill="none">
                            <path d="M5.21866 7.33312H13.3333V8.66645H5.21866L8.79466 12.2425L7.85199 13.1851L2.66666 7.99979L7.85199 2.81445L8.79466 3.75712L5.21866 7.33312Z" fill="white" />
                        </svg>
                    </div>

                    <p className="text-white text-sm font-medium uppercase">Buy first Membership key</p>

                    {/* Close Icon */}
                    <div className="">
                        <svg xmlns="http://www.w3.org/2000/svg" width={16} height={17} viewBox="0 0 16 17" fill="none">
                            <path d="M7.99999 7.36445L11.3 4.06445L12.2427 5.00712L8.94266 8.30712L12.2427 11.6071L11.3 12.5498L7.99999 9.24979L4.69999 12.5498L3.75732 11.6071L7.05732 8.30712L3.75732 5.00712L4.69999 4.06445L7.99999 7.36445Z" fill="white" />
                        </svg>
                    </div>
                </div>

                <div className="flex items-center justify-between border-b border-b-stroke-1 pb-4">
                    <div className="flex flex-col gap-2">
                        <p className="text-secondary text-xs font-normal uppercase">Buy Membership Key</p>

                        <div className="flex py-3 bg-card-1 rounded-lg">
                            <button className="flex-1 flex items-center justify-center">
                                <span className="text-white text-base">-</span>
                            </button>
                            <div className="flex-1 flex items-center justify-center">
                                <span className="text-white text-base">1</span>
                            </div>
                            <button className="flex-1 flex items-center justify-center">
                                <span className="text-white text-base">+</span>
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col flex-[.6]">
                        <div className="flex items-center justify-between">
                            <span className="text-secondary text-xs font-normal uppercase text-right flex-[.5]">Balance</span>
                            <div className="flex items-center gap-[5px]">
                                <BTCIcon />
                                <span className="text-secondary text-xs font-normal uppercase">{walletBalance?.formatted}</span>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <span className="text-secondary text-xs font-normal uppercase text-right flex-[.5]">Pay</span>

                            <div className="flex items-center gap-[5px]">
                                <BTCIcon />
                                <span className="text-secondary text-xs font-normal uppercase">{walletBalance?.formatted}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <button className="text-black font-semibold text-sm uppercase bg-white p-3 rounded-lg" onClick={handleSumbit}>Next</button>
            </div>
        </OnBoardLayout>
    );
};

export default HostBuyFirstMembershipKey;