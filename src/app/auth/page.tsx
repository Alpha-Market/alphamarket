import type { Metadata } from "next";

import OnBoardLayout from "@/components/Layout/OnBoardLayout";
import LoginFormDialog from "@/features/auth/components/LoginFormDialog";

export const metadata: Metadata = {
	title: "AlphaMarket | Login",
};

export default function AuthPage() {
	return (
		<OnBoardLayout>
			<LoginFormDialog />
		</OnBoardLayout>
	);
}
