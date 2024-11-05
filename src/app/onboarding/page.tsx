import OnBoardingFlow from "@/features/onboarding/components/OnBoardingFlow";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "AlphaMarket | OnBoarding",
};

export default function OnBoardingPage() {
    return <OnBoardingFlow />;
}
