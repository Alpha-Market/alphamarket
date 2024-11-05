import Image from "next/image";
import { CategoryChip } from "./HostDetailsBlock";
import { useUserStore } from "@/store/user.store";
import { type Review } from "@/types";
import useGetUserById from "@/hooks/useGetUserById";
import { RatingStarsView } from "../RatingStars";
import { usePathname } from "next/navigation";

export default function ReviewList() {
    const pathname = usePathname();
    const hostInfo = useUserStore((state) => state.hostInfo);
    let user = useUserStore((state) => state.user);

    if (hostInfo && pathname === "/host") {
        user = hostInfo;
    }

    if (
        user?.reviews &&
        typeof user.reviews === "object" &&
        user.reviews.length == 0
    ) {
        return (
            <div className="h-full flex items-center justify-center">
                No reviews
            </div>
        )
    }

    return (
        <div className="grid grid-cols-2 sm:flex sm:flex-col">
            {user?.reviews.map((review) => (
                <Review key={review.id} reviewData={review} />
            ))}
        </div>
    );
}

const Review = ({ reviewData }: { reviewData: Review }) => {
    const { data, loading } = useGetUserById(reviewData.reviewerUserId);

    if (loading) {
        return <p className="text-white text-sm">Loading...</p>;
    }

    return (
        <div className="py-6 px-3 flex items-center gap-4 border first-of-type:border-t-0 border-stroke-1 cursor-pointer">
            {data?.pfp_url ? (
                <Image
                    src={data?.pfp_url}
                    alt="Host Profile Picture"
                    width={102}
                    height={102}
                    className="w-[102px] h-[102px] object-cover rounded-[6px]"
                />
            ) : (
                <div className="w-[102px] h-[102px] bg-gray-600 rounded-[6px]"></div>
            )}

            <div className="flex-1 flex flex-col gap-[10px]">
                <div className="flex items-center gap-[10px]">
                    {data?.twitterHandle && (
                        <div className="flex items-center gap-[6px] max-w-[110px] border border-stroke-1 rounded-[4px] p-2">
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
                                @{data?.twitterHandle}
                            </span>
                        </div>
                    )}

                    <CategoryChip
                        category={reviewData.reviewerRole as string}
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
};
