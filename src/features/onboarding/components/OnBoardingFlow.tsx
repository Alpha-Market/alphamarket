"use client";

import RoleSelectionScreen from "./RoleSelectionScreen";
import HostCreateGroup from "./HostCreateGroup";
import HostFirstMessage from "../../../components/Screens/GroupChatScreen";
import HostProfileScreen from "../../host/components/HostProfileScreen";
import { useState } from "react";
import UserDetailsGatherScreen from "./UserDetailsGatherScreen";
import { useUserStore } from "@/store/user.store";
import { UserRole } from "@/types";
import { useRouter } from "next/navigation";

enum FLOW_STAGE {
    // COMMON
    ROLE_SELECTION = "role_selection",
    USER_DETAILS = "user_details",

    // HOST FLOW
    HOST_GROUP_CREATION = "host_group_creation",
    HOST_FIRST_MESSAGE = "host_first_message",
    HOST_PROFILE = "host_profile",

    // FAN FLOW
    HOST_DISCOVER = "host_discover",
}

const OnBoardingFlow = () => {
    const router = useRouter();
    const [stage, setStage] = useState<FLOW_STAGE>(FLOW_STAGE.ROLE_SELECTION);
    const user = useUserStore((state) => state.user);

    if (!user?.isNewUser) {
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
                            user &&
                            Object.hasOwn(user, "role") &&
                            user.role === UserRole.Host
                        ) {
                            setStage(FLOW_STAGE.HOST_GROUP_CREATION);
                        } else {
                            router.push("/home?tab=hosts");
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
                        router.push("/home?tab=chats");
                    }}
                />
            )}

            {stage === FLOW_STAGE.HOST_FIRST_MESSAGE && <HostFirstMessage />}
        </>
    );
};

export default OnBoardingFlow;
