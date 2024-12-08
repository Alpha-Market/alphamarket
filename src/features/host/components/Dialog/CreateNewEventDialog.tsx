"use client";

import type { FC } from "react";
import LoadingOverlay from "@/components/UI/common/LoadingOverlay";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogTitle,
	DialogTrigger,
} from "@/components/UI/dialog";
import useUser from "@/hooks/useUser";
import useUserAction from "@/hooks/useUserAction";
import { cn } from "@/lib/utils";

import { wagmiConfig } from "@/lib/wagmiConfig";
import { SEPOLIA_GROUP_CAMPAIGNS_ABI } from "@/util/abi";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { sepolia } from "viem/chains";
import { useAccount } from "wagmi";
import { waitForTransactionReceipt, writeContract } from "wagmi/actions";

enum DIALOG_STATE {
	CREATE = "create",
	SUCCESS = "success",
}

export default function CreateNewEventDialog() {
	const [user] = useUser();

	const { createCampaign, uploadFile, refetchUser } = useUserAction();

	const { address: walletAddress } = useAccount();

	const [loading, setLoading] = useState(false);
	const [state, setState] = useState<DIALOG_STATE>(DIALOG_STATE.CREATE);

	const [event_photo, setEventPhoto] = useState<File | null>(null);
	const [title, setTitle] = useState("");
	const [space_link, setSpaceLink] = useState("");
	const [agenda, setAgenda] = useState("");
	const [event_date, setEventDate] = useState("");
	const [event_time, setEventTime] = useState("");
	const [event_duration, setEventDuration] = useState<number>();
	const [total_slots, setTotalSlots] = useState<number>();
	const [price_per_slot, setPricePerSlot] = useState<number>();

	const inputFileRef = useRef<HTMLInputElement>(null);

	const reset = () => {
		setEventPhoto(null);
		setTitle("");
		setSpaceLink("");
		setAgenda("");
		setEventDate("");
		setEventTime("");
		setEventDuration(undefined);
		setTotalSlots(undefined);
		setPricePerSlot(undefined);
		setLoading(false);
		setState(DIALOG_STATE.CREATE);
	};

	const handleSubmit = async () => {
		setLoading(true);

		try {
			const deadlineDate = new Date(`${event_date}T${event_time}:00Z`);
			const deadline = Math.floor(deadlineDate.getTime() / 1000);

			const txHash = await writeContract(wagmiConfig, {
				abi: SEPOLIA_GROUP_CAMPAIGNS_ABI,
				address: process.env.NEXT_PUBLIC_SEPOLIA_GROUP_CAMPAIGNS as `0x${string}`,
				functionName: "createCampaign",
				args: [
					user?.group?.contract_address,
					walletAddress,
					title,
					deadline,
					total_slots,
					price_per_slot,
				],
				chainId: sepolia.id,
			});

			console.log({ txHash });

			const txRes = await waitForTransactionReceipt(wagmiConfig, {
				hash: txHash,
				chainId: sepolia.id,
			});

			console.log({ txRes });

			const public_url = await uploadFile(event_photo as File, "campaign");
			await createCampaign({
				profile_picture_url: public_url,
				title,
				space_link,
				agenda,
				event_date,
				event_time,
				event_duration: event_duration as number,
				total_slots: total_slots as number,
				price_per_slot: price_per_slot as number,
				user_id: user?.id as string,
			});
			await refetchUser();
			setLoading(false);
			setState(DIALOG_STATE.SUCCESS);
		}
		catch (err) {
			console.log("[HostCreateNewEventDialog/handleSubmit] ", err);
			toast.error("Something went wrong");
			setLoading(false);
		}
	};

	const isDisabled = () => {
		return !event_photo || !title || !space_link || !agenda || !event_date || !event_time || !event_duration || !total_slots || !price_per_slot;
	};

	return (
		<Dialog
			onOpenChange={() => {
				reset();
			}}
		>
			<DialogTrigger>
				<div className="p-3 bg-black rounded-lg">
					<p className="text-white text-sm font-semibold -tracking-[.98px] uppercase">
						Create event
					</p>
				</div>
			</DialogTrigger>

			<DialogContent
				className="dialog-base p-4 max-h-[600px] flex flex-col"
				disableOutsideClick={loading}
			>
				{/* Loading Screen */}
				{loading && (
					<LoadingOverlay size={50} className="rounded-[12px]" />
				)}

				<DialogTitle>
					<div className="flex flex-col gap-4">
						<div className="flex items-center justify-between">
							<h4 className="text-white text-sm font-medium uppercase">
								{state === DIALOG_STATE.CREATE
									? "Create a new campaign"
									: "Your campaign is ready"}
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

				{state === DIALOG_STATE.CREATE && (
					<div className="flex-1 flex flex-col gap-4 overflow-y-auto">
						<div
							className={cn(
								"relative flex items-center justify-between border border-stroke-1 rounded-xl",
								event_photo ? "p-0" : "py-8 px-6",
							)}
						>
							{event_photo
								? (
										<>
											<Image
												src={URL.createObjectURL(
													event_photo,
												)}
												alt="group photo"
												layout="responsive"
												width={100}
												height={100}
												className="object-cover rounded-xl"
											/>
											<div
												className="cursor-pointer absolute right-[20px] bg-black/80 p-2 rounded-full"
												onClick={() => {
													setEventPhoto(null);
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
									)
								: (
										<>
											<p className="text-secondary-1 text-xs font-bold uppercase">
												Add Photo
											</p>

											{/* Upload Icon */}
											<div
												className="cursor-pointer relative z-20"
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
														setEventPhoto(
															e.target.files[0],
														);
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
													className="rounded-xl"
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
						</div>

						<FieldsWithLabel
							label="title"
							type="text"
							value={title}
							onChange={v => setTitle(v)}
						/>
						<FieldsWithLabel
							label="space link"
							type="text"
							value={space_link}
							onChange={v => setSpaceLink(v)}
						/>
						<FieldsWithLabel
							label="agenda"
							type="text"
							value={agenda}
							onChange={v => setAgenda(v)}
						/>
						<FieldsWithLabel
							label="date"
							type="date"
							value={event_date}
							onChange={v => setEventDate(v)}
						/>
						<FieldsWithLabel
							label="time (utc)"
							type="time"
							value={event_time}
							onChange={v => setEventTime(v)}
						/>
						<FieldsWithLabel
							label="duration (in minutes)"
							type="number"
							value={event_duration as number}
							onChange={v => setEventDuration(Number.parseInt(v))}
						/>
						<FieldsWithLabel
							label="amount of slots"
							type="number"
							value={total_slots as number}
							onChange={v => setTotalSlots(Number.parseInt(v))}
						/>
						<FieldsWithLabel
							label="price/slot"
							type="number"
							value={price_per_slot as number}
							onChange={v => setPricePerSlot(Number.parseInt(v))}
						/>
					</div>

				)}

				{state === DIALOG_STATE.SUCCESS && (
					<div className="flex-1 flex">
						<div className="flex flex-col rounded-[12px] w-full overflow-hidden border-[1px] border-[#313131]">
							<div className="w-full relative flex flex-col">
								<img
									src={
										event_photo
											? URL.createObjectURL(
												event_photo as File,
											)
											: ""
									}
									alt="campaign banner image"
									width={100}
									height={232}
									className="w-full max-h-[232px] object-cover"
								/>

								<div className="relative py-8 px-6 bg-black">
									<h2 className="text-white font-bold capitalize text-base">
										{title}
									</h2>
									<div className="flex items-center gap-1">
										<span className="text-tertiary font-medium text-xs uppercase">
											AGENDA
										</span>
										<span className="text-white font-medium text-xs capitalize">
											{agenda}
										</span>
									</div>
									<div
										className="absolute z-20 bottom-full inset-x-0 h-[50px]"
										style={{
											background:
                                                    "linear-gradient(0deg, #000 4.08%, rgba(0, 0, 0, 0.00) 100%)",
										}}
									/>
								</div>
							</div>

							<div className="flex gap-[10px] p-3 bg-[#1A1A1A]">
								<p className="text-[#A3A3A3] text-[10px] font-medium lowercase">
									{space_link}
								</p>
								<div className="bg-stroke-1 h-[18px] w-[1px]" />
								<p className="text-[#A3A3A3] text-[10px] font-medium">
									{event_date}
								</p>
								<div className="bg-stroke-1 h-[18px] w-[1px]" />
								<p className="text-[#A3A3A3] text-[10px] font-medium">
									{event_time}
								</p>
								<div className="bg-stroke-1 h-[18px] w-[1px]" />
								<p className="text-[#A3A3A3] text-[10px] font-medium">
									{event_duration}
									{" "}
									mins
								</p>
							</div>
						</div>
					</div>
				)}

				<div className="w-full h-[1.4px] bg-[#3A3A3A]" />

				<DialogFooter>
					<button
						type="button"
						disabled={isDisabled()}
						className="button-primary-base button-primary-disabled"
						onClick={handleSubmit}
					>
						{state === DIALOG_STATE.CREATE ? "Next" : "Return"}
					</button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

interface FieldsWithLabelProps {
	label: string;
	type: "date" | "time" | "text" | "number";
	value: string | number;
	onChange: (v: string) => void;
}

const FieldsWithLabel: FC<FieldsWithLabelProps> = ({
	label,
	type,
	value,
	onChange,
}) => {
	const ref = useRef<HTMLInputElement>(null);

	useEffect(() => {
		const inputElement = ref.current;

		const handleWheel = (event: WheelEvent) => {
			if (document.activeElement === inputElement) {
				event.preventDefault();
				event.stopPropagation();
			}
		};

		if (inputElement) {
			inputElement.addEventListener("wheel", handleWheel, { passive: false });
		}

		// Cleanup the event listener
		return () => {
			if (inputElement) {
				inputElement.removeEventListener("wheel", handleWheel);
			}
		};
	}, []);

	return (
		<div className="flex flex-col gap-2">
			<label
				htmlFor={label}
				className="text-secondary-1 text-xs font-normal uppercase"
			>
				{label}
			</label>

			<input
				id={label}
				type={type}
				value={value}
				ref={ref}
				className="rounded-lg bg-card-1 p-3 text-white text-sm"
				onChange={(e) => {
					onChange(e.target.value);
				}}
			/>
		</div>
	);
};
