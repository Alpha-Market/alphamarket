import { useUserStore } from "@/store/user.store";
import OnBoardingFlow from "./OnBoardingFlow";
import { UserRole } from "@/types";
import HostProfileScreen from "./HostProfileScreen";

const Flow = () => {
    const user = useUserStore(state => state.user);

    if (user?.isNewUser) {
        return (
            <OnBoardingFlow />
        );
    } else {
        if (user?.role === UserRole.Host) {
            return (
                <HostProfileScreen />
            );
        } else if (user?.role === UserRole.Fan) {
            return (
                <div>Fan Profile Page</div>
            );
        } else {
            return (
                <div className="">Something went wrong</div>
            );
        }
    }
};

export default Flow;