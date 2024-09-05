import { wagmiConfig } from "@/libs/wagmiConfig";
import { useQuery } from "@tanstack/react-query";
import { formatEther } from "viem";
import { getPublicClient } from "wagmi/actions";

export const useEstimatedGasFee = (gas: number) => {
    const Q = useQuery({
        queryKey: ['gasFee', gas],
        queryFn: async () => {
            let client = getPublicClient(wagmiConfig);
            let gasPrice = await client.getGasPrice();
            let fee = formatEther(gasPrice * BigInt(gas));

            return {
                feeFormatted: fee,
                fee: parseFloat(fee)
            };
        },
        placeholderData: {
            feeFormatted: '0',
            fee: 0
        },
        initialData: {
            feeFormatted: '0',
            fee: 0
        }
    });

    return Q;
};