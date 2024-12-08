"use client";

import type { User } from "@/types";
import HostDetailsBlock from "@/features/host/components/Views/PrivateProfileView/HostDetailsBlock";
import HostProfileTabs from "@/features/host/components/Views/PrivateProfileView/HostProfileTabs";
import PublicProfileViewActions from "@/features/host/components/Views/PrivateProfileView/PublicProfileViewActions";
import { viewedUserAtom } from "@/store";
import { useSetAtom } from "jotai";
import { useEffect } from "react";

export default function PublicProfileView({ viewedUserData }: { viewedUserData: User }) {
	const setViewedUserData = useSetAtom(viewedUserAtom);

	useEffect(() => {
		if (viewedUserData) {
			setViewedUserData(viewedUserData);
			document.title = `AlphaMarket | ${
				viewedUserData?.name
			}`;
		}
	}, [viewedUserData]);

	return (
		<div className="flex flex-col w-full h-full py-4 max-h-[calc(100vh-80px)] overflow-y-auto">
			<HostDetailsBlock userData={viewedUserData} />
			<PublicProfileViewActions />
			<HostProfileTabs userData={viewedUserData} publicView />
		</div>
	);
}
