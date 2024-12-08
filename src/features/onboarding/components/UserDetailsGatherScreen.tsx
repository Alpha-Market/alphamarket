"use client";

import type { FC } from "react";
import OnBoardLayout from "@/components/Layout/OnBoardLayout";

import LoadingOverlay from "@/components/UI/common/LoadingOverlay";
import useUser from "@/hooks/useUser";

import useUserAction from "@/hooks/useUserAction";
import { cn } from "@/lib/utils";
import { Categories, Network } from "@/types";
import { useRef, useState } from "react";
import toast from "react-hot-toast";

function UserDetailsGatherScreen({
	onBack,
	onComplete,
}: {
	onBack: () => void;
	onComplete: () => void;
}) {
	const [user] = useUser();

	const { updateUser, uploadFile } = useUserAction();

	const [loading, setLoading] = useState(false);

	const [name, setName] = useState(user?.name || "");
	const [selectedCategories, setSelectedCategories] = useState<Categories[]>(user?.categories || []);
	const [selectedNetwork, setSelectedNetwork] = useState<Network[]>(user?.networks || [Network.SEPOLIA]);
	const [profile_picture, setProfile_picture] = useState<File | null>(null);
	const [user_bio, setUserBio] = useState(user?.bio || "");

	const inputFileRef = useRef<HTMLInputElement>(null);

	const handleSubmit = async () => {
		setLoading(true);

		try {
			const public_url = await uploadFile(profile_picture as File, "profile");

			await updateUser({
				name,
				profile_picture_url: public_url,
				categories: selectedCategories,
				networks: selectedNetwork,
				bio: user_bio,
			});

			onComplete();
		}
		catch (err: any) {
			toast.error(err.response.statusText);
			console.log("[HostFanDetailsScreen.tsx/handleSubmit]", err);
		}

		setLoading(false);
	};

	const isSubmitDisabled = () => {
		return !profile_picture || !selectedCategories || !selectedNetwork || !user_bio;
	};

	const onSelect = (value: Categories | Network) => {
		let list: ((Categories | Network)[] | null) = null;
		let setter = null;

		if (Object.values(Categories).includes(value as Categories)) {
			list = selectedCategories;
			setter = setSelectedCategories;
		}
		else if (Object.values(Network).includes(value as Network)) {
			list = selectedNetwork;
			setter = setSelectedNetwork;
		}

		if (list && setter) {
			const isSelected = list.includes(value);

			if (isSelected) {
				const t: any = list.filter(v => v !== value);
				setter([...t]);
			}
			else {
				setter([...list, value as any]);
			}
		}
	};

	return (
		<OnBoardLayout>
			<div className="dialog-base sm:fixed sm:bottom-0 sm:inset-x-0 absolute sm:top-auto top-[5%] z-[100] w-full sm:max-w-full max-w-[422px] sm:rounded-b-none p-4 flex flex-col gap-4">
				{loading && (
					<LoadingOverlay size={50} className="rounded-[12px]" />
				)}

				<div className="flex items-center justify-between border-b border-b-stroke-1 pb-4">
					{/* Back Icon */}
					<div className="cursor-pointer" onClick={onBack}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width={16}
							height={16}
							viewBox="0 0 16 16"
							fill="none"
						>
							<path
								d="M5.21866 7.33312H13.3333V8.66645H5.21866L8.79466 12.2425L7.85199 13.1851L2.66666 7.99979L7.85199 2.81445L8.79466 3.75712L5.21866 7.33312Z"
								fill="white"
							/>
						</svg>
					</div>

					<p className="text-white text-sm font-medium uppercase">
						User Details
					</p>

					{/* Close Icon */}
					<div className="">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width={16}
							height={17}
							viewBox="0 0 16 17"
							fill="none"
						>
							<path
								d="M7.99999 7.36445L11.3 4.06445L12.2427 5.00712L8.94266 8.30712L12.2427 11.6071L11.3 12.5498L7.99999 9.24979L4.69999 12.5498L3.75732 11.6071L7.05732 8.30712L3.75732 5.00712L4.69999 4.06445L7.99999 7.36445Z"
								fill="white"
							/>
						</svg>
					</div>
				</div>

				<div
					className={cn(
						"relative flex items-center justify-between border border-stroke-1 rounded-xl overflow-hidden",
						profile_picture ? "p-0" : "py-8 px-6",
					)}
				>
					<>
						{profile_picture ? (
							<>
								<img
									src={URL.createObjectURL(profile_picture)}
									alt="pfp"
									className="w-[388px] h-[82px] object-cover"
								/>
								<div
									className="cursor-pointer absolute right-[20px] bg-black/80 p-2 rounded-full"
									onClick={() => {
										setProfile_picture(null);
									}}
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width={20}
										height={20}
										viewBox="0 0 24 24"
										fill="none"
									>
										<path
											d="M17 6H22V8H20V21C20 21.2652 19.8946 21.5196 19.7071 21.7071C19.5196 21.8946 19.2652 22 19 22H5C4.73478 22 4.48043 21.8946 4.29289 21.7071C4.10536 21.5196 4 21.2652 4 21V8H2V6H7V3C7 2.73478 7.10536 2.48043 7.29289 2.29289C7.48043 2.10536 7.73478 2 8 2H16C16.2652 2 16.5196 2.10536 16.7071 2.29289C16.8946 2.48043 17 2.73478 17 3V6ZM18 8H6V20H18V8ZM9 4V6H15V4H9Z"
											fill="white"
										/>
									</svg>
								</div>
							</>
						) : (
							<>
								<p className="text-secondary text-xs font-bold uppercase">
									Add PFP
								</p>

								{/* Upload Icon */}
								<div
									className="relative z-[100] cursor-pointer"
									onClick={() => {
										inputFileRef.current?.click();
									}}
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width={16}
										height={16}
										viewBox="0 0 16 16"
										fill="none"
									>
										<path
											d="M2.66665 12.6667H13.3333V8H14.6666V13.3333C14.6666 13.5101 14.5964 13.6797 14.4714 13.8047C14.3464 13.9298 14.1768 14 14 14H1.99998C1.82317 14 1.6536 13.9298 1.52858 13.8047C1.40355 13.6797 1.33331 13.5101 1.33331 13.3333V8H2.66665V12.6667ZM8.66665 6V10.6667H7.33331V6H3.99998L7.99998 2L12 6H8.66665Z"
											fill="white"
										/>
									</svg>
								</div>

								<input
									type="file"
									className="hidden"
									ref={inputFileRef}
									onChange={(e) => {
										if (
											e.target.files
											&& e.target.files.length > 0
										) {
											setProfile_picture(e.target.files[0]);
										}
									}}
								/>

								{/* Gradient Background */}
								<div className="absolute right-0">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width={155}
										height={80}
										viewBox="0 0 155 80"
										fill="none"
									>
										<g filter="url(#filter0_f_244_10264)">
											<circle
												cx={127}
												cy={23}
												r={40}
												fill="#FE01BE"
											/>
										</g>
										<defs>
											<filter
												id="filter0_f_244_10264"
												x="0.400002"
												y="-103.6"
												width="253.2"
												height="253.2"
												filterUnits="userSpaceOnUse"
												colorInterpolationFilters="sRGB"
											>
												<feFlood
													floodOpacity={0}
													result="BackgroundImageFix"
												/>
												<feBlend
													mode="normal"
													in="SourceGraphic"
													in2="BackgroundImageFix"
													result="shape"
												/>
												<feGaussianBlur
													stdDeviation="43.3"
													result="effect1_foregroundBlur_244_10264"
												/>
											</filter>
										</defs>
									</svg>
								</div>
							</>
						)}
					</>
				</div>

				<div className="flex flex-col gap-2">
					<label htmlFor="name" className="text-secondary text-xs font-normal uppercase">
						name
					</label>

					<input type="text" id="name" className="rounded-lg bg-card-1 p-3 text-white text-sm" value={name} onChange={(e) => { setName(e.target.value); }} />
				</div>

				<div className="flex flex-col gap-2">
					<label className="text-secondary text-xs font-normal uppercase">
						categories
					</label>

					<ul className="flex gap-4 items-center overflow-auto">
						<SelectChip
							value="Gaming"
							isSelected={selectedCategories.includes(Categories.GAMING)}
							onClick={() => {
								onSelect(Categories.GAMING);
							}}
						/>

						<SelectChip
							value="Defi"
							isSelected={selectedCategories.includes(Categories.DEFI)}
							onClick={() => {
								onSelect(Categories.DEFI);
							}}
						/>

						<SelectChip
							value="SocialFi"
							isSelected={selectedCategories.includes(Categories.SOCIALFI)}
							onClick={() => {
								onSelect(Categories.SOCIALFI);
							}}
						/>

						<SelectChip
							value="NFT/PFP"
							isSelected={selectedCategories.includes(Categories.NFT_PFP)}
							onClick={() => {
								onSelect(Categories.NFT_PFP);
							}}
						/>
					</ul>
				</div>

				<div className="flex flex-col gap-2">
					<label className="text-secondary text-xs font-normal uppercase">
						network
					</label>

					<ul className="flex gap-4 items-center overflow-auto">
						<SelectChip
							value="Sepolia"
							isSelected={selectedNetwork.includes(Network.SEPOLIA)}
							onClick={() => {
								onSelect(Network.SEPOLIA);
							}}
						/>

						<SelectChip
							value="Merlin"
							isSelected={selectedNetwork.includes(Network.MERLIN)}
							onClick={() => {
								onSelect(Network.MERLIN);
							}}
						/>
					</ul>
				</div>

				<div className="flex flex-col gap-2 border-b border-stroke-1 pb-4">
					<label
						htmlFor="bio"
						className="text-secondary text-xs font-normal uppercase"
					>
						bio
					</label>

					<textarea
						name="bio"
						id="bio"
						className="rounded-lg bg-card-1 p-3 text-white text-sm resize-none"
						rows={5}
						onChange={(e) => {
							setUserBio(e.target.value);
						}}
					>
					</textarea>
				</div>

				<button
					type="button"
					disabled={isSubmitDisabled()}
					className={cn(
						"text-black font-semibold text-sm uppercase p-3 rounded-lg",
						isSubmitDisabled()
							? "bg-white/50 cursor-not-allowed"
							: "bg-white cursor-pointer",
					)}
					onClick={handleSubmit}
				>
					Next
				</button>
			</div>
		</OnBoardLayout>
	);
}

export default UserDetailsGatherScreen;

interface SelectChipProp {
	value: string;
	isSelected: boolean;
	onClick: () => void;
}

const SelectChip: FC<SelectChipProp> = ({
	value,
	isSelected,
	onClick,
}) => {
	return (
		<button
			type="button"
			className={cn(
				"flex items-center gap-[10px] border rounded-lg p-3",
				isSelected ? "border-white" : "border-stroke-1",
			)}
			onClick={onClick}
		>
			<span
				className={cn(
					"text-base",
					isSelected
						? "text-white font-bold"
						: "text-secondary font-normal",
				)}
			>
				{value}
			</span>
		</button>
	);
};
