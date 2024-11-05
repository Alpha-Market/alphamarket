"use client";

import LoadingOverlay from "@/components/UI/common/LoadingOverlay";
import HostProfileScreen from "@/features/host/components/HostProfileScreen";
import useGetUserById from "@/hooks/useGetUserById";
import { useUserStore } from "@/store/user.store";
import { useEffect } from "react";

export default function HostPage({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined };
}) {
    const hostId = searchParams.id;

    const { data, loading } = useGetUserById(hostId as string);

    useEffect(() => {
        if (data) {
            document.title = `AlphaMarket | ${
                data?.displayName || data?.email
            }`;
            useUserStore.setState({ hostInfo: data });
        }
    }, [data]);

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

    if (loading) {
        return <LoadingOverlay size={35} />;
    }

    if (!data) {
        return (
            <div className="flex flex-col items-center justify-center h-full w-full">
                <h1 className="text-white font-bold text-3xl">404</h1>
                <p className="text-white text-lg font-medium mb-32">
                    No host found
                </p>
            </div>
        );
    }

    return <HostProfileScreen onHostPage />;
}
