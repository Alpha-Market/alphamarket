import { isNewUserAction } from "@/features/onboarding/actions/isNewUserAction";
import OnBoardingFlow from "@/features/onboarding/components/OnBoardingFlow";
import { useUserStore } from "@/store/user.store";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
    title: "AlphaMarket | OnBoarding",
};

export default async function OnBoardingPage() {
    const isNewUser = await isNewUserAction();

    if (!isNewUser) {
        redirect("/home?tab=home");
    }

    return <OnBoardingFlow />;
}
