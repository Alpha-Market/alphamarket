import HostDetailsBlock from "./HostDetailsBlock";
import HostProfileTabs from "./HostProfileTabs";
import { User } from "@/types";
import HostActions from "./HostActions";
import NonHostActions from "./NonHostActions";

const HostProfileScreen = ({ hostInfo }: { hostInfo?: User }) => {
    return (
        <div className="flex flex-col w-full h-full px-4 max-h-[calc(100vh-80px)] overflow-y-auto">
            <HostDetailsBlock hostInfo={hostInfo} />
            {hostInfo ? <NonHostActions /> : <HostActions />}
            <HostProfileTabs />
        </div>
    );
};

export default HostProfileScreen;
