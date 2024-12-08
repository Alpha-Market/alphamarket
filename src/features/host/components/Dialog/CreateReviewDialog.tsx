"use client";

import type { Rating } from "@/types";

import LoadingOverlay from "@/components/UI/common/LoadingOverlay";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogTitle,
	DialogTrigger,
} from "@/components/UI/dialog";
import createAttestation from "@/features/attestation/lib/Attest";
import { useEthersSigner } from "@/hooks/useEthersSigner";

import useUser from "@/hooks/useUser";

import useUserAction from "@/hooks/useUserAction";
import { viewedUserAtom } from "@/store";
import { REVIEW_SCHEMA_ID_EAS } from "@/util/constants";

import { useAtomValue } from "jotai";
import { useState } from "react";
import { sepolia } from "viem/chains";
import { useAccount } from "wagmi";
import { RatingStarsEditable } from "../RatingStars";

export default function CreateReviewDialog() {
	const viewedUserData = useAtomValue(viewedUserAtom);
	const [user] = useUser();

	const { createReview, refetchUser } = useUserAction();

	const [openDialog, setOpenDialog] = useState(false);
	const [loading, setLoading] = useState(false);
	const [review, setReview] = useState("");
	const [rating, setRating] = useState<Rating>(0);

	const signer = useEthersSigner({ chainId: sepolia.id });
	const { address: walletAddress } = useAccount();

	const reset = () => {
		setReview("");
		setRating(0);
	};

	const handleSubmit = async () => {
		setLoading(true);

		const newAttestationUID = await createAttestation(
			signer,
			REVIEW_SCHEMA_ID_EAS,
			walletAddress as string,
			[
				{
					name: "reviewerName",
					type: "string",
					value: (user?.name || user?.email) as string,
				},
				{
					name: "reviewerRole",
					type: "string",
					value: user?.role as string,
				},
				{
					name: "review",
					type: "string",
					value: review,
				},
			],
		);

		await createReview({
			rating,
			reviewer_name: user?.name || user?.twitter_handle || user?.email || "",
			reviewer_role: user?.role || "",
			review,
			attestation_uid: newAttestationUID,
			reviewer_user_id: user?.id || "",
			user_id: viewedUserData?.id as string,
		});

		await refetchUser();

		setLoading(false);
		setOpenDialog(false);
	};

	return (
		<Dialog
			open={openDialog}
			onOpenChange={(_open) => {
				setOpenDialog(_open);
				reset();
			}}
		>
			<DialogTrigger>
				<div className="p-3 border border-black/10 rounded-lg bg-[#D9D9D9]">
					<p className="text-black text-sm font-semibold -tracking-[.98px] uppercase">
						Leave review
					</p>
				</div>
			</DialogTrigger>

			<DialogContent className="dialog-base p-4 max-h-[600px] flex flex-col">
				{/* Loading Screen */}
				{loading && (
					<LoadingOverlay size={50} className="rounded-[12px]" />
				)}

				<DialogTitle>
					<div className="flex flex-col gap-4">
						<div className="flex items-center justify-between">
							<h4 className="text-white text-sm font-medium uppercase">
								Leave review
							</h4>
							<DialogClose>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="16"
									height="16"
									viewBox="0 0 16 16"
									fill="none"
								>
									<path
										d="M7.99999 7.05732L11.3 3.75732L12.2427 4.69999L8.94266 7.99999L12.2427 11.3L11.3 12.2427L7.99999 8.94266L4.69999 12.2427L3.75732 11.3L7.05732 7.99999L3.75732 4.69999L4.69999 3.75732L7.99999 7.05732Z"
										fill="white"
									/>
								</svg>
							</DialogClose>
						</div>
						<div className="w-full h-[1.4px] bg-[#3A3A3A]" />
					</div>
				</DialogTitle>

				<div className="flex flex-col gap-[12px]">
					<div className="flex items-center gap-[10px]">
						<p className="text-base text-white font-medium">
							{viewedUserData?.name || viewedUserData?.twitter_handle || viewedUserData?.email}
						</p>

						<div className="px-2 bg-[#0FD850] rounded-full">
							<p className="text-white text-base font-medium">
								Host
							</p>
						</div>
					</div>

					<div className="flex items-center gap-1">
						<RatingStarsEditable
							rating={rating}
							setRating={setRating}
						/>
					</div>

					<p className="text-base text-white font-medium">
						Some things to think about in your review
					</p>

					<div className="flex items-center gap-[10px]">
						<div className="rounded-full bg-[#282828] px-3 py-1">
							<p className="text-base text-white font-medium">
								Moderation
							</p>
						</div>

						<div className="rounded-full bg-[#282828] px-3 py-1">
							<p className="text-base text-white font-medium">
								Speaker quality
							</p>
						</div>

						<div className="rounded-full bg-[#282828] px-3 py-1">
							<p className="text-base text-white font-medium">
								Value gain
							</p>
						</div>
					</div>

					<textarea
						cols={10}
						rows={10}
						placeholder="Write your review here"
						className="bg-transparent text-white text-sm font-medium resize-none"
						value={review}
						onChange={(e) => {
							setReview(e.target.value);
						}}
					/>
				</div>

				<div className="w-full h-[1.4px] bg-[#3A3A3A]" />

				<DialogFooter>
					<button
						type="button"
						className="button-primary-base button-primary-disabled"
						onClick={handleSubmit}
					>
						Submit
					</button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
