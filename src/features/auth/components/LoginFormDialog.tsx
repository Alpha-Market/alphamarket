"use client";

import { Checkbox } from "@/components/UI/checkbox";
import LoadingOverlay from "@/components/UI/common/LoadingOverlay";
import useAuth from "@/features/auth/hooks/useAuth";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";

const LoginFormDialog = () => {
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [isNewUser, setIsNewUser] = useState(true);
    const [hasAcceptedTerms, setHasAcceptedTerms] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { signUp, signIn, signInWithTwitter } = useAuth();

    const handleLogin = async () => {
        setLoading(true);

        try {
            if (isNewUser) {
                await signUp(email, password);
                router.push("/onboarding");
            } else {
                await signIn(email, password);
                router.push("/home?tab=home");
            }
        } catch (err) {
            console.log("[LoginFormDialog/handleLogin]", err);
        }

        setLoading(false);
    };

    const handleXLogin = async () => {
        setLoading(true);
        await signInWithTwitter();
        router.push("/onboarding");
        setLoading(false);
    };

    const checkLoginDisable = () => {
        if (!email || !password) return true;

        if (!isNewUser) return false;

        if (hasAcceptedTerms) {
            return false;
        } else {
            return true;
        }
    };

    return (
        <div className="dialog-base sm:fixed sm:bottom-0 sm:inset-x-0 absolute sm:top-auto top-[10%] z-[100] w-full sm:max-w-full max-w-[422px] sm:rounded-b-none p-4 flex flex-col gap-4">
            {loading && <LoadingOverlay size={50} className="rounded-[12px]"/>}
            <div className="p-3 border border-stroke-1 rounded-lg flex items-center w-max gap-[10px]">
                <button
                    className={cn(
                        "text-base",
                        isNewUser
                            ? "text-white font-bold"
                            : "text-secondary-1 font-normal"
                    )}
                    onClick={() => {
                        setIsNewUser(true);
                    }}
                >
                    New Account
                </button>
                <span className="w-[1px] h-[20px] bg-stroke-1" />
                <button
                    className={cn(
                        "text-base",
                        !isNewUser
                            ? "text-white font-bold"
                            : "text-secondary-1 font-normal"
                    )}
                    onClick={() => {
                        setIsNewUser(false);
                    }}
                >
                    Existing Account
                </button>
            </div>

            <form
                className="flex flex-col gap-4"
                onSubmit={(e) => {
                    e.preventDefault();
                }}
            >
                <div className="flex flex-col gap-2">
                    <label
                        className="text-secondary-1 text-xs font-normal uppercase"
                        htmlFor="emailField"
                    >
                        Email
                    </label>
                    <input
                        type="text"
                        id="emailField"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                        className="p-3 bg-card-1 rounded-lg text-white"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label
                        className="text-secondary-1 text-xs font-normal uppercase"
                        htmlFor="passwordField"
                    >
                        Password
                    </label>
                    <input
                        type="password"
                        id="passwordField"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                        className="p-3 bg-card-1 rounded-lg text-white"
                    />
                </div>

                <div className="w-full h-[1px] bg-stroke-1" />

                {isNewUser && (
                    <div className="flex items-center gap-1">
                        <Checkbox
                            className="border-card-2"
                            checked={hasAcceptedTerms}
                            onCheckedChange={(checkBoxState: boolean) => {
                                setHasAcceptedTerms(checkBoxState);
                            }}
                        />
                        <p className="text-secondary-1 text-[10px] font-normal uppercase">
                            Accept Terms and Conditions.
                        </p>
                    </div>
                )}

                <button
                    disabled={checkLoginDisable()}
                    className={cn(
                        "w-full p-3 bg-white text-black text-sm uppercase font-semibold -tracking-[.98px] rounded-lg",
                        checkLoginDisable() && "button-primary-disabled"
                    )}
                    onClick={handleLogin}
                >
                    {isNewUser ? "Agree & Join" : "Continue"}
                </button>
                <button
                    disabled={
                        isNewUser ? (hasAcceptedTerms ? false : true) : false
                    }
                    className={cn(
                        "w-full p-3 bg-white text-black text-sm uppercase font-semibold -tracking-[.98px] rounded-lg",
                        (isNewUser
                            ? hasAcceptedTerms
                                ? false
                                : true
                            : false) && "button-primary-disabled"
                    )}
                    onClick={handleXLogin}
                >
                    {"Continue with X"}
                </button>
            </form>
        </div>
    );
};

export default LoginFormDialog;
