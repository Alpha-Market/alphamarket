import { http, createConfig } from 'wagmi';
import { merlin, sepolia } from 'wagmi/chains';
import { metaMask } from 'wagmi/connectors';
import { type Chain } from 'viem';

export const merlinTestnet = {
    id: 686868,
    name: "Merlin Testnet",
    nativeCurrency: {
        name: 'BTC',
        symbol: 'BTC',
        decimals: 18,
    },
    rpcUrls: {
        default: { http: ['https://testnet-rpc.merlinchain.io'] }
    },
    blockExplorers: {
        default: {
            name: 'blockscout',
            url: 'https://testnet-scan.merlinchain.io'
        }
    }
} as const satisfies Chain;

export const wagmiConfig = createConfig({
    chains: [merlin, merlinTestnet, sepolia],
    connectors: [
        metaMask()
    ],
    transports: {
        [merlin.id]: http(),
        [merlinTestnet.id]: http(),
        [sepolia.id]: http()
    },
});
