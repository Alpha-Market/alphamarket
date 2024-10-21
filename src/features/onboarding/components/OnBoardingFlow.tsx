'use client';

import RoleSelectionScreen from "./RoleSelectionScreen";
import HostFanDetailsScreen from "./HostFanDetailsScreen";
import HostCreateGroup from "./HostCreateGroup";
import HostFirstMessage from "../../../components/Screens/GroupChatScreen";
import HostProfileScreen from "../../host/components/HostProfileScreen";
import { useState } from "react";

enum FLOW_STAGE {
    // COMMON
    ROLE_SELECTION = "role_selection",
    HOST_FAN_DETAILS = "host_fan_details",

    // HOST FLOW
    HOST_GROUP_CREATION = "host_group_creation",
    HOST_FIRST_MESSAGE = "host_first_message",
    HOST_PROFILE = "host_profile",

    // FAN FLOW
    HOST_DISCOVER = "host_discover"
}

const OnBoardingFlow = () => {
    const [stage, setStage] = useState<FLOW_STAGE>(FLOW_STAGE.HOST_GROUP_CREATION);

    return (
        <>
            {
                stage === FLOW_STAGE.ROLE_SELECTION &&
                <RoleSelectionScreen onComplete={() => {
                    setStage(FLOW_STAGE.HOST_FAN_DETAILS);
                }} />
            }

            {
                stage === FLOW_STAGE.HOST_FAN_DETAILS &&
                <HostFanDetailsScreen
                    onBack={() => {
                        setStage(FLOW_STAGE.ROLE_SELECTION);
                    }}
                    onComplete={() => {
                        setStage(FLOW_STAGE.HOST_GROUP_CREATION);
                    }}
                />
            }

            {
                stage === FLOW_STAGE.HOST_GROUP_CREATION &&
                <HostCreateGroup
                    onBack={() => {
                        setStage(FLOW_STAGE.HOST_FAN_DETAILS);
                    }}
                    onComplete={() => {
                        setStage(FLOW_STAGE.HOST_FIRST_MESSAGE);
                    }}
                />
            }

            {
                stage === FLOW_STAGE.HOST_FIRST_MESSAGE &&
                <HostFirstMessage />
            }

            {
                stage === FLOW_STAGE.HOST_PROFILE &&
                <HostProfileScreen />
            }
        </>
    );
};

export default OnBoardingFlow;