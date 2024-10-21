import LoginFormDialog from "@/features/auth/components/LoginFormDialog";
import OnBoardLayout from "@/components/Layout/OnBoardLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: 'AlphaMarket | Login'
}

export default function AuthPage() {
    return (
        <OnBoardLayout>
            <LoginFormDialog />
        </OnBoardLayout>
    );
}