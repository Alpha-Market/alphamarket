"use client";

import { createContext, type ReactNode, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useUserStore } from "@/store/user.store";
import { getUserById } from "@/actions/User.action";

export const AuthContext = createContext<{ user: any }>({ user: null });

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const user: any = useUserStore((state) => state.user);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(
            auth,
            (user) => {
                const getUserData = async (user: any) => {
                    useUserStore.setState({ loadingUser: true });
                    if (!user) useUserStore.setState({ user: null });
                    else {
                        const userData = await getUserById(user.uid);
                        useUserStore.setState({
                            user: userData,
                        });
                    }
                    useUserStore.setState({ loadingUser: false });
                };

                getUserData(user);
            },
            (err) => {
                console.log("[AuthContext/useEffect] Error -> ", err);
            }
        );
        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
    );
};
