import type { Metadata } from "next";

import OnBoardingFlow from "@/features/onboarding/components/OnBoardingFlow";

export const metadata: Metadata = {
	title: "AlphaMarket | OnBoarding",
};

export default function OnBoardingPage() {
	return <OnBoardingFlow />;
}
