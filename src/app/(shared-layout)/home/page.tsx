import HostDiscoverScreen from "@/features/host/components/HostDiscoverScreen";
import { TABS } from "@/util/constants";
import { type Metadata } from "next";
import dynamic from "next/dynamic";

const HostFirstMessage = dynamic(
    () => import("@/components/Screens/GroupChatScreen")
);
const HostProfileScreen = dynamic(
    () => import("@/features/host/components/HostProfileScreen")
);

type Props = {
    searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({
    searchParams,
}: Props): Promise<Metadata> {
    const tab = searchParams["tab"];

    let addOn = "";

    switch (tab) {
        case "home":
            addOn = " | Home";
            break;
        case "hosts":
            addOn = " | Hosts";
            break;
        case "chats":
            addOn = " | Chats";
            break;
        default:
            addOn = "";
            break;
    }

    return {
        title: `AlphaMarket${addOn}`,
    };
}

export default function HomePage({ searchParams }: Props) {
    const tab = searchParams.tab;

    if (tab == TABS[0]) {
        return <HostProfileScreen />;
    } else if (tab == TABS[1]) {
        return <HostDiscoverScreen />;
    } else if (tab == TABS[2]) {
        return <HostFirstMessage />;
    }
}
