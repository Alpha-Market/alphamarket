import { getUserDataById } from "@/actions/User.action";

import PublicProfileView from "@/features/host/components/Views/PublicProfileView";

export default async function HostPage(props: {
	params: Promise<{ id: string }>;
}) {
	const params = await props.params;
	const viewedUserId = params.id;

	const viewedUserData = await getUserDataById(viewedUserId);

	if (!viewedUserId) {
		return (
			<div className="flex flex-col items-center justify-center h-full w-full">
				<h1 className="text-white font-bold text-3xl">404</h1>
				<p className="text-white text-lg font-medium mb-32">
					Please specify a hostId parameter in the url
				</p>
			</div>
		);
	}

	if (!viewedUserData) {
		return (
			<div className="flex flex-col items-center justify-center h-full w-full">
				<h1 className="text-white font-bold text-3xl">404</h1>
				<p className="text-white text-lg font-medium mb-32">
					No host found
				</p>
			</div>
		);
	}

	return <PublicProfileView viewedUserData={viewedUserData} />;
}
