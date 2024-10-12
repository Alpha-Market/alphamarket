import { useState } from "react";
import RoleSelectionScreen from "./RoleSelectionScreen";
import HostFanDetailsScreen from "./HostFanDetailsScreen";
import { useUserStore } from "@/store/user.store";
import HostCreateGroup from "./HostCreateGroup";
import HostBuyFirstMembershipKey from "./HostBuyFirstMembershipKey";
import HostFirstMessage from "./HostFirstMessage";
import HostProfileScreen from "./HostProfileScreen";

enum FLOW_STAGE {
    // COMMON
    ROLE_SELECTION = "role_selection",
    HOST_FAN_DETAILS = "host_fan_details",

    // HOST FLOW
    HOST_GROUP_CREATION = "host_group_creation",
    HOST_BUY_FIRST_KEY = "host_buy_first_key",
    HOST_FIRST_MESSAGE = "host_first_message",
    HOST_PROFILE = "host_profile",

    // FAN FLOW
    HOST_DISCOVER = "host_discover"
}

const OnBoardingFlow = () => {
    const user = useUserStore(state => state.user);
    const [stage, setStage] = useState<FLOW_STAGE>(FLOW_STAGE.ROLE_SELECTION);

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
                        setStage(FLOW_STAGE.HOST_BUY_FIRST_KEY);
                    }}
                />
            }

            {
                stage === FLOW_STAGE.HOST_BUY_FIRST_KEY &&
                <HostBuyFirstMembershipKey
                    onBack={() => {
                        setStage(FLOW_STAGE.HOST_GROUP_CREATION);
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