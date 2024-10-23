"use client";

import { useAppStore } from "@/store/app.store";
import { useUserStore } from "@/store/user.store";
import { User } from "@/types";
import { useEffect } from "react";

export default function UserHydration({ userInfo }: { userInfo: User | null }) {
    useEffect(() => {
        if (userInfo) {
            useUserStore.setState({ user: userInfo });
            useAppStore.setState({ isLogin: true });
        }
    }, [userInfo]);

    return null;
}
