import { getUserById } from "@/actions/User.action";
import HostProfileScreen from "@/features/host/components/HostProfileScreen";

export default async function HostPage({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined };
}) {
    const hostId = searchParams.hostId;

    if (!hostId) {
        return (
            <div className="flex flex-col items-center justify-center h-full w-full">
                <h1 className="text-white font-bold text-3xl">404</h1>
                <p className="text-white text-lg font-medium mb-32">
                    Please specify a hostId parameter in the url
                </p>
            </div>
        );
    }

    const hostDetails = await getUserById(hostId as string);

    if (!hostDetails) {
        return (
            <div className="flex flex-col items-center justify-center h-full w-full">
                <h1 className="text-white font-bold text-3xl">404</h1>
                <p className="text-white text-lg font-medium mb-32">
                    No host found
                </p>
            </div>
        );
    }

    return <HostProfileScreen hostInfo={hostDetails} />;
}
