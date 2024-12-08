"use client";

import useUser from "@/hooks/useUser";
import HostDetailsBlock from "./HostDetailsBlock";
import HostProfileTabs from "./HostProfileTabs";
import PrivateProfileViewActions from "./PrivateProfileViewActions";

function PrivateProfileView() {
	const [user] = useUser();

	return (
		<div className="flex flex-col w-full h-full py-4 max-h-[calc(100vh-80px)] overflow-y-auto">
			<HostDetailsBlock userData={user!} />
			<PrivateProfileViewActions />
			<HostProfileTabs publicView={false} userData={user!} />
		</div>
	);
}

export default PrivateProfileView;
