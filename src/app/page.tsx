"use client";

import Flow from "@/components/Screens/Flow";
import LandingPage from "@/components/Screens/LandingPage";
import WalletConnectScreen from "@/components/Screens/WalletConnectScreen";
import useAuthState from "@/hooks/useAuthState";
import { auth } from "@/libs/firebase";
import { motion } from 'framer-motion';
import { useAccount } from "wagmi";

export default function Home() {
    const { isConnected } = useAccount();
    const { user: authUser, loading } = useAuthState(auth);

    if (loading) {
        return (
            <div className="w-full h-full flex items-center justify-center">
                <motion.span className="absolute animate-rotateL w-max h-max">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width={100} height={100} style={{ shapeRendering: 'auto', display: 'block', background: 'transparent' }}>
                        <g data-idx={1}>
                            <circle strokeDasharray="164.93361431346415 56.97787143782138" r={35} strokeWidth={6} stroke="black" fill="none" cy={50} cx={50} data-idx={2}>
                            </circle><g data-idx={4} />
                        </g>
                    </svg>
                </motion.span>
            </div>
        );
    }

    return (
        <div className="w-full h-full flex">
            {
                authUser ?
                    (isConnected ? <Flow /> : <WalletConnectScreen />)
                    :
                    <LandingPage />
            }
        </div>
    );
}
