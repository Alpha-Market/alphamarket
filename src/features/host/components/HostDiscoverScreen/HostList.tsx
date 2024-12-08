import type { User } from "@/types";

import { getHostList } from "@/apiRoutes/user";

import LoadingOverlay from "@/components/UI/common/LoadingOverlay";

import { CategoryChip } from "@/features/host/components/Views/PrivateProfileView/HostDetailsBlock";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";

export default function HostList() {
	const { data, isLoading } = useQuery({
		queryKey: ["hostlist"],
		queryFn: getHostList,
		// staleTime: 5 * 60 * 1000,
		refetchOnMount: false,
	});

	if (isLoading)
		return <LoadingOverlay />;

	return (
		<div className="grid grid-cols-2 sm:flex sm:flex-col">
			{data && data.map(host => (
				<Link key={host.id} href={`/host/${host.id}`}>
					<Host host={host} />
				</Link>
			))}
		</div>
	);
}

function Host({ host }: { host: User }) {
	return (
		<div className="py-3 px-3 flex items-center gap-4 border first-of-type:border-t-0 border-stroke-1 cursor-pointer">
			<Image
				src={host.profile_picture_url}
				alt="Host Profile Picture"
				width={102}
				height={102}
				className="w-[102px] h-[102px] object-cover rounded-[6px]"
			/>

			<div className="flex-1 flex flex-col gap-[14px]">
				{host.twitter_handle && (
					<div className="flex items-center gap-[6px] max-w-fit border border-stroke-1 rounded-[4px] p-2">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width={10}
							height={10}
							viewBox="0 0 10 10"
							fill="none"
						>
							<path
								d="M5.94784 4.23465L9.66837 -0.000488281H8.78703L5.55514 3.67607L2.97575 -0.000488281H0L3.90139 5.55965L0 10.0003H0.881334L4.29209 6.11689L7.0167 10.0003H9.99245M1.19943 0.650354H2.55341L8.78637 9.38143H7.43205"
								fill="white"
								fillOpacity="0.6"
							/>
						</svg>

						<div className="w-[1px] h-[10px] bg-stroke-1" />

						<span className="text-secondary-1 text-xs font-medium font-n">
							@
							{host.twitter_handle}
						</span>
					</div>
				)}

				<p className="text-white text-base font-medium">
					{host.name || host.email}
				</p>

				{host.categories && typeof host.categories === "object" && (
					<div className="flex items-center gap-1">
						{host.categories.map(c => (
							<CategoryChip category={c} key={c} />
						))}
					</div>
				)}
			</div>
		</div>
	);
}
