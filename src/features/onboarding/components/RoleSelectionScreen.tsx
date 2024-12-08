"use client";

import type { FC } from "react";
import OnBoardLayout from "@/components/Layout/OnBoardLayout";

import LoadingOverlay from "@/components/UI/common/LoadingOverlay";
import { apiClient } from "@/lib/apiClient";
import { cn } from "@/lib/utils";
import { UserRole } from "@/types";
import { useState } from "react";
import toast from "react-hot-toast";

function RoleSelectionScreen({ onComplete }: { onComplete: () => void }) {
	const [role, setRole] = useState<UserRole | "">("");
	const [loading, setLoading] = useState(false);

	const handleSubmit = async () => {
		setLoading(true);
		try {
			await apiClient.patch("/user/update", {
				role,
			});
			onComplete();
		}
		catch (err: any) {
			console.log(err);
			toast.error("Something went wrong");
		}
		setLoading(false);
	};

	return (
		<OnBoardLayout>
			<div className="dialog-base sm:fixed sm:bottom-0 sm:inset-x-0 absolute sm:top-auto top-[10%] z-[100] w-full sm:max-w-full max-w-[422px] sm:rounded-b-none p-4 flex flex-col gap-4">
				{loading && (
					<LoadingOverlay size={50} className="rounded-[12px]" />
				)}

				<div className="flex items-center justify-between">
					<p className="text-white text-sm font-medium uppercase">
						Your Role
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

				<hr className="w-full h-[1px] border border-stroke-1" />

				<ul className="flex flex-col gap-4">
					<li>
						<RoleButton
							currentRole={role as UserRole}
							requiredRole={UserRole.Host}
							setRole={setRole}
							text="Host"
						/>
					</li>
					<li>
						<RoleButton
							currentRole={role as UserRole}
							requiredRole={UserRole.Fan}
							setRole={setRole}
							text="Fan"
						/>
					</li>
					{/* <li>
                        <RoleButton currentRole={role as UserRole} requiredRole={UserRole.Brand} setRole={setRole} text="Brand" />
                    </li> */}
				</ul>

				<hr className="w-full h-[1px] border border-stroke-1" />

				<button
					type="button"
					disabled={!role}
					className="text-black font-semibold text-sm uppercase bg-white p-3 rounded-lg"
					onClick={handleSubmit}
				>
					Next
				</button>
			</div>
		</OnBoardLayout>
	);
}

export default RoleSelectionScreen;

interface RoleButtonProps {
	currentRole: UserRole;
	requiredRole: UserRole;
	setRole: (v: UserRole) => void;
	text: string;
}

const RoleButton: FC<RoleButtonProps> = ({
	currentRole,
	requiredRole,
	setRole,
	text,
}) => {
	return (
		<button
			className={cn(
				"flex items-center justify-between w-full rounded-lg p-3 border border-stroke-1",
				currentRole === requiredRole && "border-white",
			)}
			onClick={() => {
				setRole(requiredRole);
			}}
		>
			<p
				className={cn(
					"text-base",
					currentRole === requiredRole
						? "text-white font-bold"
						: "text-secondary-1 font-normal",
				)}
			>
				{text}
			</p>

			<svg
				xmlns="http://www.w3.org/2000/svg"
				width={16}
				height={17}
				viewBox="0 0 16 17"
				fill="none"
			>
				<path
					d="M8.11464 8.80621L6.22864 6.92087L7.1713 5.97754L9.99997 8.80621L7.1713 11.6349L6.22864 10.6915L8.11464 8.80621Z"
					fill="white"
					fillOpacity="0.6"
				/>
			</svg>
		</button>
	);
};
