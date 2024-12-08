import type { Metadata } from "next";

import { TABS } from "@/util/constants";

import dynamic from "next/dynamic";

const HostFirstMessage = dynamic(
	() => import("@/components/Screens/GroupChatScreen"),
);
const PrivateProfileView = dynamic(
	() => import("../../../../features/host/components/Views/PrivateProfileView"),
);
const HostDiscoverScreen = dynamic(
	() => import("@/features/host/components/HostDiscoverScreen"),
);

interface Props {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata(props: Props): Promise<Metadata> {
	const searchParams = await props.searchParams;
	const tab = searchParams.tab;

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

export default async function HomePage(props: Props) {
	const searchParams = await props.searchParams;
	const tab = searchParams.tab;

	if (tab === TABS[0]) {
		return <PrivateProfileView />;
	}
	else if (tab === TABS[1]) {
		return <HostDiscoverScreen />;
	}
	else if (tab === TABS[2]) {
		return <HostFirstMessage />;
	}
}
