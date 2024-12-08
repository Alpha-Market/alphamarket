"use client";

import type { User } from "@/types";

import { DefaultUserProfilePicture } from "@/util/Icons";
import Image from "next/image";

export default function HostDetailsBlock({ userData }: { userData: User }) {
	return (
		<div className="px-4 flex flex-col">
			<div className="p-3 bg-card-1 rounded-t-lg flex gap-4">
				{
					(userData?.profile_picture_url || userData?.twitter_avatar_url)
						? (
								<Image
									src={(userData?.profile_picture_url || userData?.twitter_avatar_url) as string}
									alt="User Profile Picture"
									width={102}
									height={100}
									className="h-full object-cover rounded-[6px]"
								/>
							)
						: <DefaultUserProfilePicture />
				}

				<div className="flex-1 flex flex-col gap-[14px]">
					{userData?.twitter_handle && (
						<a
							href={`https://x.com/${userData.twitter_handle}`}
							target="__blank"
						>
							<div
								className="flex items-center gap-[6px] max-w-fit border border-stroke-1 rounded-[4px] p-2"
							>
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

								<span className="text-secondary-1 text-xs font-medium">
									@
									{userData.twitter_handle}
								</span>
							</div>
						</a>
					)}

					<p className="text-white text-base font-medium">
						{userData?.name || userData?.email || ""}
					</p>

					<div className="flex items-center gap-1">
						{userData?.categories.map(c => (
							<CategoryChip category={c} key={c} />
						))}
					</div>
				</div>

				{/* <p className="text-secondary-1 text-xs font-medium">#35</p> */}
			</div>

			<div className="p-3 bg-card-2 rounded-b-lg flex flex-col gap-4">
				<p className="text-white font-medium text-xs">{userData?.bio}</p>

				<div className="flex items-center gap-3">
					<p className="text-white text-xs font-medium uppercase">
						24.7K &nbsp;
						<span className="text-secondary-1 text-xs font-medium uppercase">
							followers
						</span>
					</p>

					<div className="w-[1px] h-[8px] bg-stroke-1" />

					<p className="text-white text-xs font-medium uppercase">
						150 &nbsp;
						<span className="text-secondary-1 text-xs font-medium uppercase">
							posts
						</span>
					</p>

					<div className="w-[1px] h-[8px] bg-stroke-1" />

					<p className="text-white text-xs font-medium uppercase">
						24 &nbsp;
						<span className="text-secondary-1 text-xs font-medium uppercase">
							holders
						</span>
					</p>
				</div>
			</div>
		</div>
	);
}

export function CategoryChip({ category }: { category: string }) {
	return (
		<div className="bg-card-1 py-2 px-3 rounded-[80px]">
			<p className="text-secondary-1 text-xs font-medium capitalize">
				{category}
			</p>
		</div>
	);
}
