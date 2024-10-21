'use client';

import { useUserStore } from "@/store/user.store";
import { User } from "@/types";
import { useEffect } from "react";

export default function UserHydration({ userInfo }: { userInfo: User | null }) {
    useEffect(() => {
        if (userInfo) {
            useUserStore.setState({ user: userInfo });
        }
    }, [userInfo]);

    return null;
}
