"use client";

import OnBoardLayout from "@/components/UI/common/OnBoardLayout";
import useAuth from "@/hooks/useAuth";
import { cn } from "@/util/util";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AuthPage() {
    const router = useRouter();

    const [isNewUser, setIsNewUser] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { signUp, signIn } = useAuth();

    const handleLogin = () => {
        if (isNewUser) {
            signUp(email, password)
                .then(() => {
                    router.push("/");
                });
        } else {
            signIn(email, password)
                .then(() => {
                    router.push("/");
                });
        }
    };

    return (
        <OnBoardLayout>
            <div className="sm:fixed sm:bottom-0 sm:inset-x-0 absolute sm:top-auto top-[10%] z-[100] bg-card-1 w-full sm:max-w-full max-w-[422px] border border-stroke-1 sm:rounded-b-none rounded-xl p-4 flex flex-col gap-4">
                <div className="p-3 border border-stroke-1 rounded-lg flex items-center w-max gap-[10px]">
                    <button className={cn(
                        "text-base",
                        isNewUser ? "text-white font-bold" : "text-secondary font-normal"
                    )} onClick={() => {
                        setIsNewUser(true);
                    }}>New Account</button>
                    <span className="w-[1px] h-[20px] bg-stroke-1" />
                    <button className={cn(
                        "text-base",
                        !isNewUser ? "text-white font-bold" : "text-secondary font-normal"
                    )} onClick={() => {
                        setIsNewUser(false);
                    }}>Existing Account</button>
                </div>

                <form className="flex flex-col gap-4" onSubmit={e => {
                    e.preventDefault();
                }}>
                    <div className="flex flex-col gap-2">
                        <label className="text-secondary text-xs font-normal uppercase" htmlFor="emailField">Email</label>
                        <input
                            type="text"
                            id="emailField"
                            value={email}
                            onChange={e => {
                                setEmail(e.target.value);
                            }}
                            className="p-3 bg-card-1 rounded-lg text-white"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-secondary text-xs font-normal uppercase" htmlFor="passwordField">Password</label>
                        <input
                            type="password"
                            id="passwordField"
                            value={password}
                            onChange={e => {
                                setPassword(e.target.value);
                            }}
                            className="p-3 bg-card-1 rounded-lg text-white"
                        />
                    </div>

                    <div className="w-full h-[1px] bg-stroke-1" />

                    {isNewUser && <p className="text-secondary text-[10px] font-normal uppercase">By clicking Agree & Join, you agree to the ___ User Agreement, Privacy Policy, and Cookie Policy.</p>}

                    <button className="w-full p-3 bg-white text-black text-sm uppercase font-semibold -tracking-[.98px] rounded-lg" onClick={handleLogin}>{isNewUser ? "Agree & Join" : "Continue"}</button>
                    <button className="w-full p-3 bg-white text-black text-sm uppercase font-semibold -tracking-[.98px] rounded-lg">{"Continue with X"}</button>
                </form>
            </div>
        </OnBoardLayout>
    );
}