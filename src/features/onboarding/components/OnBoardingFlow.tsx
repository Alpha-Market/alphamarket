"use client";

import useUser from "@/hooks/useUser";

import useUserAction from "@/hooks/useUserAction";
import { UserRole } from "@/types";
import { useRouter } from "next/navigation";
import { useState } from "react";

import HostCreateGroup from "./HostCreateGroup";
import RoleSelectionScreen from "./RoleSelectionScreen";
import UserDetailsGatherScreen from "./UserDetailsGatherScreen";

enum FLOW_STAGE {
	ROLE_SELECTION = "role_selection",
	USER_DETAILS = "user_details",
	HOST_GROUP_CREATION = "host_group_creation",
}

function OnBoardingFlow() {
	const router = useRouter();
	const [stage, setStage] = useState<FLOW_STAGE>(FLOW_STAGE.ROLE_SELECTION);

	const [user] = useUser();
	const { refetchUser } = useUserAction();

	if (user && !user.isNewUser) {
		router.push("/home?tab=home");
		return;
	}

	return (
		<>
			{stage === FLOW_STAGE.ROLE_SELECTION && (
				<RoleSelectionScreen
					onComplete={() => {
						setStage(FLOW_STAGE.USER_DETAILS);
					}}
				/>
			)}

			{stage === FLOW_STAGE.USER_DETAILS && (
				<UserDetailsGatherScreen
					onBack={() => {
						setStage(FLOW_STAGE.ROLE_SELECTION);
					}}
					onComplete={() => {
						if (
							user
							&& Object.hasOwn(user, "role")
							&& user.role === UserRole.Host
						) {
							setStage(FLOW_STAGE.HOST_GROUP_CREATION);
						}
						else {
							refetchUser()
								.then(() => {
									router.push("/home?tab=hosts");
								});
						}
					}}
				/>
			)}

			{stage === FLOW_STAGE.HOST_GROUP_CREATION && (
				<HostCreateGroup
					onBack={() => {
						setStage(FLOW_STAGE.USER_DETAILS);
					}}
					onComplete={() => {
						refetchUser()
							.then(() => {
								router.push("/home?tab=chats");
							});
					}}
				/>
			)}
		</>
	);
}

export default OnBoardingFlow;
