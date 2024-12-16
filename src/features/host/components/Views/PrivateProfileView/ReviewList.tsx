import type { Review, User } from "@/types";

import { DefaultUserProfilePicture } from "@/util/Icons";

import Image from "next/image";
import { RatingStarsView } from "../../RatingStars";
import { CategoryChip } from "./HostDetailsBlock";

export default function ReviewList({ userData }: { userData: User }) {
	if (
		userData?.reviews
		&& typeof userData.reviews === "object"
		&& userData.reviews.length === 0
	) {
		return (
			<div className="h-full flex items-center justify-center">
				No reviews
			</div>
		);
	}

	return (
		<div className="grid grid-cols-2 sm:flex sm:flex-col">
			{userData?.reviews.map(review => (
				<ReviewItem key={review.id} reviewData={review} />
			))}
		</div>
	);
}

function ReviewItem({ reviewData }: { reviewData: Review }) {
	const reviewer = reviewData.reviewer;

	return (
		<div className="py-6 px-3 flex items-center gap-4 border first-of-type:border-t-0 border-stroke-1 cursor-pointer">
			{reviewer && (reviewer.profile_picture_url || reviewer.twitter_avatar_url) && false
				? (
						<Image
							src={(reviewer?.profile_picture_url || reviewer?.twitter_avatar_url) as string}
							alt="Host Profile Picture"
							width={102}
							height={102}
							className="w-[102px] h-[102px] object-cover rounded-[6px]"
						/>
					)
				: (
						<DefaultUserProfilePicture />
					)}

			<div className="flex-1 flex flex-col gap-[10px]">
				<div className="flex items-center gap-[10px]">
					{reviewer?.twitter_handle && (
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
								{reviewer?.twitter_handle}
							</span>
						</div>
					)}

					<CategoryChip
						category={reviewData.reviewer_role as string}
					/>
				</div>

				<p className="text-white text-base font-medium">
					{reviewData.review}
				</p>

				<div className="flex items-center gap-1">
					<RatingStarsView rating={reviewData.rating} />
				</div>
			</div>
		</div>
	);
}
