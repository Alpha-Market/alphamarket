"use client";

import { db } from "@/lib/firebase";
import { useUserStore } from "@/store/user.store";
import { User, UserRole } from "@/types";
import { cn } from "@/lib/utils";
import { doc, setDoc } from "firebase/firestore";
import { FC, useState } from "react";
import OnBoardLayout from "@/components/Layout/OnBoardLayout";

const RoleSelectionScreen = ({ onComplete }: { onComplete: () => void; }) => {
    const [role, setRole] = useState<UserRole | ''>('');

    const user = useUserStore(state => state.user);

    const handleSubmit = async () => {
        const docRef = doc(db, "users", user?.id as string);

        setDoc(docRef, {
            role: role
        }, {
            merge: true
        });

        useUserStore.setState({ user: { ...user, role: role } as User });
        onComplete();
    };

    return (
        <OnBoardLayout>
            <div className="sm:fixed sm:bottom-0 sm:inset-x-0 absolute sm:top-auto top-[10%] z-[100] bg-card-1 w-full sm:max-w-full max-w-[422px] border border-stroke-1 sm:rounded-b-none rounded-xl p-4 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <p className="text-white text-sm font-medium uppercase">Your Role</p>

                    {/* Close Icon */}
                    <div className="">
                        <svg xmlns="http://www.w3.org/2000/svg" width={16} height={17} viewBox="0 0 16 17" fill="none">
                            <path d="M7.99999 7.36445L11.3 4.06445L12.2427 5.00712L8.94266 8.30712L12.2427 11.6071L11.3 12.5498L7.99999 9.24979L4.69999 12.5498L3.75732 11.6071L7.05732 8.30712L3.75732 5.00712L4.69999 4.06445L7.99999 7.36445Z" fill="white" />
                        </svg>
                    </div>
                </div>

                <hr className="w-full h-[1px] border border-stroke-1" />

                <ul className="flex flex-col gap-4">
                    <li>
                        <RoleButton currentRole={role as UserRole} requiredRole={UserRole.Host} setRole={setRole} text="Host" />
                    </li>
                    <li>
                        <RoleButton currentRole={role as UserRole} requiredRole={UserRole.Fan} setRole={setRole} text="Fan" />
                    </li>
                    {/* <li>
                        <RoleButton currentRole={role as UserRole} requiredRole={UserRole.Brand} setRole={setRole} text="Brand" />
                    </li> */}
                </ul>

                <hr className="w-full h-[1px] border border-stroke-1" />

                <button disabled={!role} className="text-black font-semibold text-sm uppercase bg-white p-3 rounded-lg" onClick={handleSubmit}>Next</button>
            </div>
        </OnBoardLayout>
    );
};

export default RoleSelectionScreen;

type RoleButtonProps = {
    currentRole: UserRole;
    requiredRole: UserRole;
    setRole: (v: UserRole) => void;
    text: string;
};

const RoleButton: FC<RoleButtonProps> = ({ currentRole, requiredRole, setRole, text }) => {
    return (
        <button className={cn(
            "flex items-center justify-between w-full rounded-lg p-3 border border-stroke-1",
            currentRole === requiredRole && "border-white"
        )} onClick={() => {
            setRole(requiredRole);
        }}>
            <p className={cn(
                "text-base",
                currentRole === requiredRole ? "text-white font-bold" : "text-secondary font-normal"
            )}>{text}</p>

            <svg xmlns="http://www.w3.org/2000/svg" width={16} height={17} viewBox="0 0 16 17" fill="none">
                <path d="M8.11464 8.80621L6.22864 6.92087L7.1713 5.97754L9.99997 8.80621L7.1713 11.6349L6.22864 10.6915L8.11464 8.80621Z" fill="white" fillOpacity="0.6" />
            </svg>
        </button>
    );
};