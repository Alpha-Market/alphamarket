import HostDetailsBlock from "./HostDetailsBlock";
import HostProfileTabs from "./HostProfileTabs";
import HostActions from "./HostActions";
import NonHostActions from "./NonHostActions";

const HostProfileScreen = ({ onHostPage }: { onHostPage: boolean }) => {
    return (
        <div className="flex flex-col w-full h-full px-4 max-h-[calc(100vh-80px)] overflow-y-auto">
            <HostDetailsBlock />
            {onHostPage ? <NonHostActions /> : <HostActions />}
            <HostProfileTabs onHostPage={onHostPage} />
        </div>
    );
};

export default HostProfileScreen;
