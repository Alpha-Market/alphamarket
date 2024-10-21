import { http, createConfig } from "wagmi";
import { polygonZkEvmCardona, sepolia } from "wagmi/chains";
import { metaMask } from "wagmi/connectors";

export const wagmiConfig = createConfig({
    chains: [sepolia, polygonZkEvmCardona],
    transports: {
        [sepolia.id]: http(
            "https://eth-sepolia.g.alchemy.com/v2/_E6_LJh23lw5z9fLVdAHy-U8xkx1-cul"
        ),
        [polygonZkEvmCardona.id]: http(
            "https://polygonzkevm-cardona.g.alchemy.com/v2/_E6_LJh23lw5z9fLVdAHy-U8xkx1-cul"
        ),
    },
    connectors: [metaMask()],
});
